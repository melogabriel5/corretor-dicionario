(() => {
  if (window.__localDictLoaded) return;
  window.__localDictLoaded = true;

  let settings = {
    enabled: true,
    autoCorrect: true,
    morphologicalEngine: true,
    expandAbbreviations: true,
    showSuggestions: true,
    undoOnBackspace: true,
    doubleSpacePeriod: false,
    autocompletePrefix: true
  };

  let disabledSites = [];

  function loadConfig() {
    chrome.storage.local.get(["settings", "disabledSites"], (res) => {
      if (res.settings) settings = { ...settings, ...res.settings };
      disabledSites = Array.isArray(res.disabledSites) ? res.disabledSites : [];
      if (!isActive() || !settings.showSuggestions) {
        hidePopup();
      }
    });
  }

  loadConfig();

  chrome.storage.onChanged.addListener((changes) => {
    if (changes.settings) {
      settings = { ...settings, ...(changes.settings.newValue || {}) };
      window.dictEngine.loadFromStorage();
      if (!isActive() || !settings.showSuggestions) hidePopup();
    }
    if (changes.disabledSites) {
      disabledSites = Array.isArray(changes.disabledSites.newValue) ? changes.disabledSites.newValue : [];
      if (!isActive()) hidePopup();
    }
    if (changes.customWords || changes.customAutoCorrect || changes.ignoredWords || changes.disabledAutoCorrect) {
      window.dictEngine.loadFromStorage();
    }
  });

  function isActive() {
    if (!settings.enabled) return false;
    if (location.protocol !== "chrome-extension:" && location.hostname) {
      if (disabledSites.includes(location.hostname)) return false;
    }
    return true;
  }

  function incrementCorrectionStat() {
    try {
      if (!chrome?.runtime?.id) return;
      chrome.storage.local.get(["stats"], (data) => {
        const stats = data.stats || {};
        const next = (Number(stats.correctionsCount) || 0) + 1;
        chrome.storage.local.set({ stats: { ...stats, correctionsCount: next } });
      });
    } catch (_) {
      // Ignora caso o contexto da extensão tenha sido recarregado
    }
  }

  // Cria o balão flutuante de sugestões
  const popup = document.createElement("div");
  popup.id = "local-dict-popup";
  popup.style.display = "none";
  document.documentElement.appendChild(popup);

  let activeTarget = null;
  let currentItems = [];
  let selectedIndex = -1;
  let cycleState = null;
  let isApplyingCycle = false;
  let lastAutoCorrect = null;
  let sessionSkipWord = null;
  let feedbackTimer = null;

  const WORD_REGEX = /(?:[\/;])?[a-zA-ZÀ-ÿ0-9_-]+$/;
  const BOUNDARY_KEYS = new Set([" ", ".", ",", "!", "?", ";", ":", "Enter"]);

  function getEventTarget(e) {
    if (!e) return null;
    if (typeof e.composedPath === "function") {
      const path = e.composedPath();
      if (path && path.length > 0) {
        const first = path[0];
        if (first && first.nodeType === Node.TEXT_NODE) return first.parentElement;
        if (first && first.nodeType === Node.ELEMENT_NODE) return first;
      }
    }
    const t = e.target;
    if (!t) return null;
    return t.nodeType === Node.TEXT_NODE ? t.parentElement : t;
  }

  function getEditableTarget(rawEl) {
    let el = rawEl && rawEl.nodeType === Node.TEXT_NODE ? rawEl.parentElement : rawEl;
    if (!el) return null;
    if (el.isContentEditable) {
      while (el.parentElement && el.parentElement.isContentEditable) {
        el = el.parentElement;
      }
    }
    return el;
  }

  function getSelectionForElement(el) {
    const root = el && typeof el.getRootNode === "function" ? el.getRootNode() : null;
    if (root && typeof root.getSelection === "function") {
      const rootSel = root.getSelection();
      if (rootSel) return rootSel;
    }
    return window.getSelection();
  }

  function isEditable(el) {
    if (!el) return false;
    if (el.getAttribute && el.getAttribute("data-no-autocorrect") === "true") return false;
    if (location.protocol === "chrome-extension:" && el.id !== "playgroundInput") return false;
    if (el.isContentEditable) return true;
    if (el.tagName === "TEXTAREA") return !el.readOnly && !el.disabled;
    if (el.tagName === "INPUT") {
      const validTypes = ["text", "search", ""];
      return validTypes.includes((el.type || "").toLowerCase()) && !el.readOnly && !el.disabled;
    }
    return false;
  }

  function resolveCaretTextPosition(el) {
    const sel = getSelectionForElement(el);
    if (!sel || !sel.rangeCount) return null;
    const range = sel.getRangeAt(0);
    if (!range.collapsed) return null;

    let node = range.startContainer;
    let offset = range.startOffset;

    if (node.nodeType === Node.ELEMENT_NODE && offset > 0) {
      const prevChild = node.childNodes[offset - 1];
      if (prevChild && prevChild.nodeType === Node.TEXT_NODE) {
        node = prevChild;
        offset = prevChild.textContent.length;
      } else if (prevChild && prevChild.nodeType === Node.ELEMENT_NODE) {
        let walker = prevChild;
        while (walker && walker.lastChild) {
          walker = walker.lastChild;
        }
        if (walker && walker.nodeType === Node.TEXT_NODE) {
          node = walker;
          offset = walker.textContent.length;
        }
      }
    }

    if (!node || node.nodeType !== Node.TEXT_NODE) return null;
    return { node, offset, sel };
  }

  function resolveToken(rawWord, endOffset, node = null) {
    let word = rawWord;
    let start = endOffset - rawWord.length;
    let isSnippet = false;

    if (word.startsWith("/") || word.startsWith(";")) {
      if (window.dictEngine.hasSnippetMatch(word)) {
        isSnippet = true;
      } else {
        // Se começa com '/', em chats (Twitch/Discord/Slack) é um comando (ex: /timeout, /ban, /w, /swarm).
        // Não deve ser tratado como palavra comum em português para autocorreção.
        if (word.startsWith("/")) {
          return null;
        }
        word = word.slice(1);
        start += 1;
        if (!word) return null;
      }
    }

    return {
      word,
      start,
      end: endOffset,
      isSnippet,
      node
    };
  }

  function getWordBeforeCursor(el) {
    if (el.isContentEditable) {
      const pos = resolveCaretTextPosition(el);
      if (!pos) return null;

      const textBefore = pos.node.textContent.slice(0, pos.offset);
      const match = textBefore.match(WORD_REGEX);
      if (!match) return null;

      // Se a palavra for precedida por '@' ou '#', não corrige (evita quebrar menções e hashtags no X/Twitter/Twitch)
      const matchIndex = pos.offset - match[0].length;
      if (matchIndex > 0) {
        const charBefore = pos.node.textContent[matchIndex - 1];
        if (charBefore === "@" || charBefore === "#") {
          return null;
        }
      }

      return resolveToken(match[0], pos.offset, pos.node);
    }

    const pos = el.selectionStart;
    if (typeof pos !== "number" || el.selectionStart !== el.selectionEnd) return null;
    const textBefore = el.value.slice(0, pos);
    const match = textBefore.match(WORD_REGEX);
    if (!match) return null;

    const matchIndex = pos - match[0].length;
    if (matchIndex > 0) {
      const charBefore = el.value[matchIndex - 1];
      if (charBefore === "@" || charBefore === "#") {
        return null;
      }
    }

    return resolveToken(match[0], pos);
  }

  function dispatchInputEvent(target, data, inputType = "insertText") {
    if (typeof InputEvent === "function") {
      target.dispatchEvent(
        new InputEvent("input", {
          bubbles: true,
          composed: true,
          inputType,
          data
        })
      );
    } else {
      target.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    }
  }

  function hostPreservesSpaces(host) {
    try {
      const style = window.getComputedStyle(host);
      const whiteSpace = (style && style.whiteSpace) || "";
      return whiteSpace === "pre" || whiteSpace === "pre-wrap" || whiteSpace === "break-spaces";
    } catch (_) {
      return false;
    }
  }

  // Troca cirúrgica do texto dentro do próprio nó, preservando os <span> internos
  // que editores como o Draft.js (X/Twitter) usam para reconciliar o DOM.
  // O evento input avisa o editor que o texto mudou (mesmo caminho da
  // autocorreção nativa do navegador).
  function applyDirectTextNodeReplacement(host, sel, wordInfo, replacement, trailingChar, fullText) {
    if (!wordInfo.node || !wordInfo.node.isConnected) return false;
    if (wordInfo.end < wordInfo.start) return false;

    const node = wordInfo.node;
    const before = node.textContent;
    const atNodeEnd = wordInfo.end === before.length;
    // Em contenteditable comum (white-space normal) um espaço no fim da linha
    // é colapsado; usa NBSP nesse caso para o espaço não sumir ao digitar.
    const domText =
      trailingChar === " " && atNodeEnd && !hostPreservesSpaces(host)
        ? replacement + "\u00A0"
        : fullText;

    try {
      node.replaceData(wordInfo.start, wordInfo.end - wordInfo.start, domText);
    } catch (_) {
      return false;
    }

    const caretPos = wordInfo.start + domText.length;
    try {
      if (typeof sel.collapse === "function") {
        sel.collapse(node, caretPos);
      } else if (typeof sel.setBaseAndExtent === "function") {
        sel.setBaseAndExtent(node, caretPos, node, caretPos);
      }
    } catch (_) {}

    dispatchInputEvent(host, fullText, "insertText");

    return node.textContent !== before;
  }

  function replaceWordInInput(el, wordInfo, fullText) {
    if (document.activeElement !== el && typeof el.focus === "function") {
      el.focus();
    }

    const expectedValue = el.value.slice(0, wordInfo.start) + fullText + el.value.slice(wordInfo.end);

    let execOk = false;
    let inputFired = false;
    const onInput = (ev) => {
      if (ev.target === el) inputFired = true;
    };

    if (typeof window.addEventListener === "function") {
      window.addEventListener("input", onInput, true);
    }

    try {
      el.setSelectionRange(wordInfo.start, wordInfo.end);
      if (typeof document.execCommand === "function") {
        execOk = document.execCommand("insertText", false, fullText);
      }
    } catch (_) {
      execOk = false;
    } finally {
      if (typeof window.removeEventListener === "function") {
        window.removeEventListener("input", onInput, true);
      }
    }

    // Se o valor mudou OU o execCommand disparou o input nativo com sucesso
    // (ex: React restoreControlledState reseta el.value temporariamente antes do render), não repete!
    if (el.value === expectedValue || (execOk && inputFired)) {
      return true;
    }

    // Fallback para inputs onde execCommand falhou completamente
    try {
      const proto = el.tagName === "TEXTAREA" ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
      const nativeSetter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
      if (nativeSetter) {
        nativeSetter.call(el, expectedValue);
      } else {
        el.value = expectedValue;
      }

      const newCursor = wordInfo.start + fullText.length;
      el.setSelectionRange(newCursor, newCursor);
      dispatchInputEvent(el, fullText, "insertText");
    } catch (_) {
      return false;
    }

    return el.value === expectedValue;
  }

  function setDomSelectionRange(sel, node, start, end) {
    try {
      if (typeof sel.setBaseAndExtent === "function") {
        sel.setBaseAndExtent(node, start, node, end);
        return true;
      }
      const range = document.createRange();
      range.setStart(node, start);
      range.setEnd(node, end);
      sel.removeAllRanges();
      sel.addRange(range);
      return true;
    } catch (_) {
      return false;
    }
  }

  // Entrega a substituição ao próprio editor rico (Draft.js no X, Slate na Twitch,
  // Lexical, ProseMirror) pelo mesmo caminho que o navegador usa na correção
  // ortográfica nativa: um beforeinput de "insertReplacementText" sobre a seleção.
  // O ponto crucial é informar o trecho alvo em getTargetRanges(): Slate (e outros)
  // só substituem a seleção certa quando esse dado existe; sem ele o framework usa
  // a seleção interna defasada e acaba duplicando a palavra.
  // Retorna true quando algum editor assumiu a operação (preventDefault).
  function dispatchEditorReplacementInput(host, wordInfo, fullText) {
    if (!host || typeof InputEvent !== "function") return false;

    let ev;
    try {
      ev = new InputEvent("beforeinput", {
        bubbles: true,
        cancelable: true,
        composed: true,
        inputType: "insertReplacementText",
        data: fullText
      });
    } catch (_) {
      return false;
    }

    // Range estático com exatamente a palavra que está sendo trocada.
    let targetRange = null;
    try {
      if (typeof StaticRange === "function" && wordInfo.node && wordInfo.node.isConnected) {
        targetRange = new StaticRange({
          startContainer: wordInfo.node,
          startOffset: wordInfo.start,
          endContainer: wordInfo.node,
          endOffset: wordInfo.end
        });
      }
    } catch (_) {
      targetRange = null;
    }

    if (!targetRange) {
      try {
        const range = document.createRange();
        range.setStart(wordInfo.node, wordInfo.start);
        range.setEnd(wordInfo.node, wordInfo.end);
        targetRange = range;
      } catch (_) {
        targetRange = null;
      }
    }

    if (targetRange) {
      try {
        Object.defineProperty(ev, "getTargetRanges", {
          configurable: true,
          value: () => [targetRange]
        });
      } catch (_) {}
    }

    try {
      host.dispatchEvent(ev);
    } catch (_) {
      return false;
    }

    return ev.defaultPrevented === true;
  }

  function replaceWordInContentEditable(el, wordInfo, replacement, trailingChar, fullText) {
    const host = getEditableTarget(el);
    const sel = getSelectionForElement(host);
    if (!host || !sel || !wordInfo.node || !wordInfo.node.isConnected) return false;

    if (!host.contains(document.activeElement) && typeof host.focus === "function") {
      try {
        host.focus();
      } catch (_) {}
    }

    // Seleciona exatamente a palavra que será trocada.
    if (!setDomSelectionRange(sel, wordInfo.node, wordInfo.start, wordInfo.end)) return false;

    const prevHostText = host.textContent;

    // 1) Caminho nativo dos editores ricos. O próprio framework aplica a troca
    //    no estado virtual dele — sem duplicar texto e sem travar o Backspace.
    const handledByEditor = dispatchEditorReplacementInput(host, wordInfo, fullText);
    if (handledByEditor) {
      return true;
    }

    // 2) Troca cirúrgica no nó de texto: preserva o markup interno do editor e
    //    avisa via evento input que o conteúdo mudou.
    if (applyDirectTextNodeReplacement(host, sel, wordInfo, replacement, trailingChar, fullText)) {
      return true;
    }

    // 3) Reserva: comando nativo sobre a seleção (contenteditable simples).
    const targetStyleEl = wordInfo.node.parentElement || host;
    const computed = typeof window.getComputedStyle === "function" ? window.getComputedStyle(targetStyleEl) : null;
    const needsUserSelectRestore = Boolean(
      computed && (computed.userSelect === "none" || computed.webkitUserSelect === "none")
    );

    const styleTargets = [];
    const saveAndOverrideUserSelect = (targetEl) => {
      if (!targetEl || !targetEl.style) return;
      styleTargets.push({
        el: targetEl,
        userSelect: targetEl.style.getPropertyValue("user-select"),
        userSelectPriority: targetEl.style.getPropertyPriority("user-select"),
        webkitUserSelect: targetEl.style.getPropertyValue("-webkit-user-select"),
        webkitPriority: targetEl.style.getPropertyPriority("-webkit-user-select")
      });
      targetEl.style.setProperty("user-select", "text", "important");
      targetEl.style.setProperty("-webkit-user-select", "text", "important");
    };

    if (needsUserSelectRestore) {
      saveAndOverrideUserSelect(host);
      if (targetStyleEl !== host) saveAndOverrideUserSelect(targetStyleEl);
    }

    try {
      if (typeof document.execCommand === "function") {
        document.execCommand("insertText", false, fullText);
      }
    } catch (_) {
      // validado pelo conteúdo do host abaixo
    } finally {
      for (const saved of styleTargets) {
        if (saved.userSelect) {
          saved.el.style.setProperty("user-select", saved.userSelect, saved.userSelectPriority);
        } else {
          saved.el.style.removeProperty("user-select");
        }
        if (saved.webkitUserSelect) {
          saved.el.style.setProperty("-webkit-user-select", saved.webkitUserSelect, saved.webkitPriority);
        } else {
          saved.el.style.removeProperty("-webkit-user-select");
        }
      }
    }

    return host.textContent !== prevHostText;
  }

  function replaceWord(el, wordInfo, replacement, trailingChar = "") {
    if (!el || !wordInfo) return false;
    const fullText = replacement + trailingChar;
    if (el.isContentEditable) {
      return replaceWordInContentEditable(el, wordInfo, replacement, trailingChar, fullText);
    }
    return replaceWordInInput(el, wordInfo, fullText);
  }

  function canUndoAutoCorrect(el) {
    if (!settings.undoOnBackspace || !lastAutoCorrect) return false;
    if (lastAutoCorrect.el !== el) return false;
    if (Date.now() - lastAutoCorrect.time > 10000) {
      lastAutoCorrect = null;
      return false;
    }

    const expected = lastAutoCorrect.replacement + lastAutoCorrect.trailingChar;
    if (el.isContentEditable) {
      const pos = resolveCaretTextPosition(el);
      if (!pos || pos.offset < expected.length) return false;
      const slice = pos.node.textContent.slice(pos.offset - expected.length, pos.offset);
      return slice.replace(/\u00A0/g, " ") === expected;
    }

    return (
      el.selectionStart === el.selectionEnd &&
      el.selectionStart === lastAutoCorrect.endAfter &&
      el.value.slice(lastAutoCorrect.start, lastAutoCorrect.endAfter) === expected
    );
  }

  function undoLastAutoCorrect(el) {
    const info = lastAutoCorrect;
    const expected = info.replacement + info.trailingChar;

    let restored = false;
    if (el.isContentEditable) {
      const pos = resolveCaretTextPosition(el);
      if (pos && pos.offset >= expected.length) {
        restored = replaceWord(
          el,
          { node: pos.node, start: pos.offset - expected.length, end: pos.offset },
          info.originalWord,
          info.trailingChar
        );
      }
    } else {
      restored = replaceWord(
        el,
        { start: info.start, end: info.endAfter },
        info.originalWord,
        info.trailingChar
      );
    }

    if (restored) {
      sessionSkipWord = info.originalWord.toLowerCase();
    }
    lastAutoCorrect = null;
    hidePopup();
    return restored;
  }

  function tryDoubleSpacePeriod(el) {
    if (!settings.doubleSpacePeriod) return false;

    if (el.isContentEditable) {
      const pos = resolveCaretTextPosition(el);
      if (!pos || pos.offset < 2) return false;
      const tail = pos.node.textContent.slice(pos.offset - 2, pos.offset);
      if (!/[a-zA-ZÀ-ÿ0-9][ \u00A0]$/.test(tail)) return false;

      return replaceWord(
        el,
        { node: pos.node, start: pos.offset - 1, end: pos.offset },
        ".",
        " "
      );
    }

    const pos = el.selectionStart;
    if (typeof pos !== "number" || el.selectionStart !== el.selectionEnd || pos < 2) return false;
    const tail = el.value.slice(pos - 2, pos);
    if (!/[a-zA-ZÀ-ÿ0-9][ \u00A0]$/.test(tail)) return false;

    return replaceWord(el, { start: pos - 1, end: pos }, ".", " ");
  }

  function getCaretCoordinates(el) {
    if (el.isContentEditable) {
      const sel = getSelectionForElement(el);
      if (!sel || !sel.rangeCount) return null;
      const rect = sel.getRangeAt(0).getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) {
        const elRect = el.getBoundingClientRect();
        return {
          top: elRect.bottom + window.scrollY + 4,
          left: elRect.left + window.scrollX,
          lineTop: elRect.top + window.scrollY
        };
      }
      return {
        top: rect.bottom + window.scrollY + 6,
        left: rect.left + window.scrollX,
        lineTop: rect.top + window.scrollY
      };
    }

    // Espelho invisível para calcular posição exata do cursor em input/textarea
    const div = document.createElement("div");
    const style = window.getComputedStyle(el);
    const props = [
      "boxSizing", "width", "height", "overflowX", "overflowY",
      "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth",
      "paddingTop", "paddingRight", "paddingBottom", "paddingLeft",
      "fontStyle", "fontVariant", "fontWeight", "fontStretch", "fontSize",
      "lineHeight", "fontFamily", "textAlign", "textTransform", "letterSpacing"
    ];

    div.style.position = "fixed";
    div.style.top = "0px";
    div.style.left = "-9999px";
    div.style.visibility = "hidden";
    div.style.pointerEvents = "none";
    div.style.whiteSpace = el.tagName === "INPUT" ? "pre" : "pre-wrap";
    div.style.wordWrap = "break-word";
    props.forEach((p) => (div.style[p] = style[p]));

    div.textContent = el.value.substring(0, el.selectionStart);
    const span = document.createElement("span");
    span.textContent = el.value.substring(el.selectionStart) || ".";
    div.appendChild(span);
    document.body.appendChild(div);

    const elRect = el.getBoundingClientRect();
    const fontSize = parseInt(style.fontSize, 10) || 14;
    const lineTop = elRect.top + window.scrollY + span.offsetTop - el.scrollTop;
    const top = lineTop + fontSize + 10;
    const left = elRect.left + window.scrollX + span.offsetLeft - el.scrollLeft;

    document.body.removeChild(div);
    return { top, left, lineTop };
  }

  function updateActiveClass() {
    const buttons = popup.querySelectorAll(".local-dict-item");
    buttons.forEach((btn, idx) => {
      btn.classList.toggle("active", idx === selectedIndex);
    });
  }

  function positionPopup(coords) {
    const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
    const viewportHeight = document.documentElement.clientHeight || window.innerHeight;
    const popupWidth = popup.offsetWidth || 180;
    const popupHeight = popup.offsetHeight || 34;

    const minLeft = window.scrollX + 8;
    const maxLeft = Math.max(minLeft, window.scrollX + viewportWidth - popupWidth - 8);
    const clampedLeft = Math.min(Math.max(coords.left, minLeft), maxLeft);

    let top = coords.top;
    const maxBottom = window.scrollY + viewportHeight - 8;
    if (top + popupHeight > maxBottom && typeof coords.lineTop === "number") {
      const aboveTop = coords.lineTop - popupHeight - 6;
      if (aboveTop >= window.scrollY + 4) {
        top = aboveTop;
      }
    }

    popup.style.top = `${top}px`;
    popup.style.left = `${clampedLeft}px`;
  }

  function renderPopup(coords, wordInfo, canAddWord) {
    if ((!currentItems.length && !canAddWord) || !coords) {
      hidePopup();
      return;
    }

    if (feedbackTimer) {
      clearTimeout(feedbackTimer);
      feedbackTimer = null;
    }

    popup.innerHTML = "";

    currentItems.forEach((item, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "local-dict-item" +
        (item.type === "autocorrect" ? " autocorrect-preview" : "") +
        (idx === selectedIndex ? " active" : "");

      if (item.type === "autocorrect") {
        const bolt = document.createElement("span");
        bolt.className = "local-dict-bolt";
        bolt.textContent = "⚡";
        btn.appendChild(bolt);
      }

      const wordSpan = document.createElement("span");
      wordSpan.className = "local-dict-word";
      wordSpan.textContent = item.label;
      btn.appendChild(wordSpan);

      const badge = document.createElement("span");
      badge.className = "local-dict-badge";
      badge.textContent = item.hint || String(idx + 1);
      btn.appendChild(badge);

      btn.addEventListener("mousedown", (e) => {
        e.preventDefault();
        if (!activeTarget) return;
        const alreadyCounted = Boolean(cycleState && cycleState.el === activeTarget && cycleState.counted);
        const latestInfo = getActiveReplaceRange(activeTarget);
        if (latestInfo && replaceWord(activeTarget, latestInfo, item.value, " ")) {
          if (!alreadyCounted) incrementCorrectionStat();
        }
        hidePopup();
      });

      popup.appendChild(btn);
    });

    if (canAddWord && wordInfo) {
      const addBtn = document.createElement("button");
      addBtn.type = "button";
      addBtn.className = "local-dict-add";
      addBtn.title = `Adicionar "${wordInfo.word}" ao meu dicionário`;
      addBtn.textContent = currentItems.length === 0 ? `+ Salvar "${wordInfo.word}"` : "+";

      addBtn.addEventListener("mousedown", (e) => {
        e.preventDefault();
        const wordToSave = wordInfo.word;
        window.dictEngine.addIgnoredWord(wordToSave, () => {
          // Índice atualizado em background
        });
        currentItems = [];
        popup.innerHTML = "";
        const feedback = document.createElement("span");
        feedback.className = "local-dict-feedback";
        feedback.textContent = "✓ Salva no dicionário";
        popup.appendChild(feedback);
        positionPopup(coords);
        feedbackTimer = setTimeout(() => {
          hidePopup();
        }, 1100);
      });

      popup.appendChild(addBtn);
    }

    popup.style.visibility = "hidden";
    popup.style.display = "flex";
    positionPopup(coords);
    popup.style.visibility = "visible";
  }

  function hidePopup() {
    if (feedbackTimer) {
      clearTimeout(feedbackTimer);
      feedbackTimer = null;
    }
    popup.style.display = "none";
    currentItems = [];
    selectedIndex = -1;
    cycleState = null;
  }

  function getActiveReplaceRange(el) {
    if (cycleState && cycleState.el === el) {
      if (el.isContentEditable) {
        const pos = resolveCaretTextPosition(el);
        if (pos && pos.offset >= cycleState.lastValue.length) {
          return {
            node: pos.node,
            start: pos.offset - cycleState.lastValue.length,
            end: pos.offset,
            word: cycleState.originalWord
          };
        }
      } else {
        return {
          start: cycleState.start,
          end: cycleState.end,
          word: cycleState.originalWord
        };
      }
    }
    return getWordBeforeCursor(el);
  }

  function applyCycleSuggestion(el, targetIndex) {
    const item = currentItems[targetIndex];
    if (!item) return false;

    const targetRange = getActiveReplaceRange(el);
    if (!targetRange) return false;

    const originalWord = cycleState && cycleState.el === el ? cycleState.originalWord : targetRange.word;
    const alreadyCounted = Boolean(cycleState && cycleState.el === el && cycleState.counted);
    const replacement = item.value;

    if (cycleState && cycleState.el === el && cycleState.lastValue === replacement) {
      selectedIndex = targetIndex;
      updateActiveClass();
      return true;
    }

    isApplyingCycle = true;
    let replaced = false;
    try {
      replaced = replaceWord(el, targetRange, replacement, "");
    } finally {
      isApplyingCycle = false;
    }

    if (!replaced) return false;

    cycleState = {
      el,
      start: targetRange.start,
      end: targetRange.start + replacement.length,
      originalWord,
      lastValue: replacement,
      counted: true
    };

    lastAutoCorrect = {
      el,
      originalWord,
      replacement,
      trailingChar: "",
      start: targetRange.start,
      endAfter: targetRange.start + replacement.length,
      time: Date.now()
    };

    if (!alreadyCounted) {
      incrementCorrectionStat();
    }

    selectedIndex = targetIndex;
    updateActiveClass();
    return true;
  }

  // Intercepta teclas antes de inserir (desfazer, navegação e autocorreção)
  document.addEventListener("keydown", (e) => {
    if (e.isComposing || e.keyCode === 229) return;
    const el = getEditableTarget(getEventTarget(e));
    if (!isActive() || !isEditable(el)) return;
    activeTarget = el;

    // 1. Desfazer última autocorreção com Backspace
    if (e.key === "Backspace" && canUndoAutoCorrect(el)) {
      if (undoLastAutoCorrect(el)) {
        e.preventDefault();
        e.stopPropagation();
      }
      return;
    }

    // 2. Navegação e atalhos no menu de sugestões aberto
    if (popup.style.display !== "none" && currentItems.length > 0) {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        e.stopPropagation();
        const nextIndex = selectedIndex < 0 ? 0 : (selectedIndex + 1) % currentItems.length;
        applyCycleSuggestion(el, nextIndex);
        return;
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        e.stopPropagation();
        const prevIndex =
          selectedIndex < 0
            ? currentItems.length - 1
            : (selectedIndex - 1 + currentItems.length) % currentItems.length;
        applyCycleSuggestion(el, prevIndex);
        return;
      }
      if (e.key === "Tab") {
        e.preventDefault();
        e.stopPropagation();
        const idx = selectedIndex >= 0 ? selectedIndex : 0;
        const alreadyCounted = Boolean(cycleState && cycleState.el === el && cycleState.counted);
        const wordInfo = getActiveReplaceRange(el);
        if (wordInfo && replaceWord(el, wordInfo, currentItems[idx].value, " ")) {
          if (!alreadyCounted) incrementCorrectionStat();
        }
        hidePopup();
        return;
      }
      if (e.altKey && !e.ctrlKey && !e.metaKey && ["1", "2", "3", "4"].includes(e.key)) {
        const idx = Number(e.key) - 1;
        if (currentItems[idx]) {
          e.preventDefault();
          e.stopPropagation();
          const alreadyCounted = Boolean(cycleState && cycleState.el === el && cycleState.counted);
          const wordInfo = getActiveReplaceRange(el);
          if (wordInfo && replaceWord(el, wordInfo, currentItems[idx].value, " ")) {
            if (!alreadyCounted) incrementCorrectionStat();
          }
          hidePopup();
          return;
        }
      }
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        hidePopup();
        return;
      }
    }

    // 3. Correção automática ao finalizar palavra com espaço ou pontuação
    if (BOUNDARY_KEYS.has(e.key) && e.key !== "Enter") {
      if (cycleState && cycleState.el === el) {
        lastAutoCorrect = null;
        hidePopup();
        return;
      }

      if (settings.autoCorrect) {
        const wordInfo = getWordBeforeCursor(el);
        if (wordInfo && wordInfo.word.toLowerCase() !== sessionSkipWord) {
          const correction = window.dictEngine.getAutoCorrection(wordInfo.word);
          if (correction && correction !== wordInfo.word) {
            const replaced = replaceWord(el, wordInfo, correction, e.key);
            if (replaced) {
              e.preventDefault();
              e.stopPropagation();
              lastAutoCorrect = {
                el,
                originalWord: wordInfo.word,
                replacement: correction,
                trailingChar: e.key,
                start: wordInfo.start,
                endAfter: wordInfo.start + correction.length + e.key.length,
                time: Date.now()
              };
              incrementCorrectionStat();
              hidePopup();
              return;
            }
          }
        }
      }

      // 4. Ponto automático com espaço duplo
      if (e.key === " " && tryDoubleSpacePeriod(el)) {
        e.preventDefault();
        e.stopPropagation();
        lastAutoCorrect = null;
        hidePopup();
        return;
      }

      lastAutoCorrect = null;
      hidePopup();
    } else if (e.key === "Enter") {
      lastAutoCorrect = null;
      hidePopup();
    } else if (e.key !== "Shift" && e.key !== "Control" && e.key !== "Alt" && e.key !== "Meta") {
      // Qualquer outra tecla editável invalida a janela imediata de desfazer
      if (e.key !== "Backspace") {
        lastAutoCorrect = null;
      }
    }
  }, true);

  // Atualiza sugestões enquanto o usuário digita
  document.addEventListener("input", (e) => {
    if (e.isComposing || isApplyingCycle) return;
    const el = getEditableTarget(getEventTarget(e));
    if (!isActive() || !isEditable(el) || !settings.showSuggestions) {
      hidePopup();
      return;
    }

    if (cycleState && cycleState.el === el) {
      if (el.isContentEditable) {
        const pos = resolveCaretTextPosition(el);
        if (
          pos &&
          pos.offset === cycleState.end &&
          pos.node.textContent.slice(cycleState.start, cycleState.end) === cycleState.lastValue
        ) {
          return;
        }
      } else if (
        el.selectionStart === cycleState.end &&
        el.value.slice(cycleState.start, cycleState.end) === cycleState.lastValue
      ) {
        return;
      }
      cycleState = null;
    }

    activeTarget = el;
    const wordInfo = getWordBeforeCursor(el);

    if (!wordInfo) {
      hidePopup();
      return;
    }

    const lower = wordInfo.word.toLowerCase();
    if (sessionSkipWord && lower !== sessionSkipWord) {
      sessionSkipWord = null;
    }

    const autoCorrection =
      settings.autoCorrect && lower !== sessionSkipWord
        ? window.dictEngine.getAutoCorrection(wordInfo.word)
        : null;
    const hasAuto = Boolean(autoCorrection && autoCorrection !== wordInfo.word);

    const items = [];
    if (hasAuto) {
      items.push({
        type: "autocorrect",
        value: autoCorrection,
        label: autoCorrection,
        hint: "Espaço"
      });
    }

    if (wordInfo.isSnippet) {
      const snippets = window.dictEngine.getSnippetSuggestions(wordInfo.word, 4);
      for (const snip of snippets) {
        if (items.length >= 4) break;
        if (!items.some((it) => it.value === snip.value)) {
          items.push({
            type: "suggestion",
            value: snip.value,
            label: snip.value,
            hint: snip.trigger
          });
        }
      }
    } else if (wordInfo.word.length >= 3) {
      const suggestions = window.dictEngine.getSuggestions(wordInfo.word, 4);
      for (const sug of suggestions) {
        if (items.length >= 4) break;
        if (!items.some((it) => it.value === sug)) {
          items.push({
            type: "suggestion",
            value: sug,
            label: sug
          });
        }
      }
    }

    const isDictionaryCandidate = !wordInfo.isSnippet && /^[a-zA-ZÀ-ÿ-]{3,}$/.test(wordInfo.word);
    const isKnown = window.dictEngine.hasExactWord(wordInfo.word) || window.dictEngine.ignoredWords.has(lower);
    const canAddWord = isDictionaryCandidate && !isKnown && (items.length > 0 || wordInfo.word.length >= 4);

    if (items.length > 0 || canAddWord) {
      currentItems = items;
      selectedIndex = -1;
      renderPopup(getCaretCoordinates(el), wordInfo, canAddWord);
    } else {
      hidePopup();
    }
  }, true);

  document.addEventListener("mousedown", (e) => {
    const target = getEventTarget(e);
    if (!popup.contains(target) && getEditableTarget(target) !== activeTarget) {
      hidePopup();
    }
  });

  document.addEventListener("blur", (e) => {
    if (getEditableTarget(getEventTarget(e)) === activeTarget) {
      setTimeout(() => {
        if (getEditableTarget(document.activeElement) !== activeTarget) {
          hidePopup();
        }
      }, 120);
    }
  }, true);
})();
