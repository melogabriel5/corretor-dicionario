(() => {
  const DEFAULT_UI_SETTINGS = {
    enabled: true,
    autoCorrect: true,
    morphologicalEngine: true,
    expandAbbreviations: true,
    showSuggestions: true,
    undoOnBackspace: true,
    autocompletePrefix: true,
    doubleSpacePeriod: false
  };

  const state = {
    settings: { ...DEFAULT_UI_SETTINGS },
    importedWordsCount: 0,
    customAutoCorrect: {},
    ignoredWords: [],
    disabledAutoCorrect: [],
    disabledSites: [],
    stats: { correctionsCount: 0 },
    currentHost: null,
    activeFilter: "all",
    searchQuery: ""
  };

  // Elementos do DOM
  const statsBadge = document.getElementById("statsBadge");
  const toggleEnabled = document.getElementById("toggleEnabled");
  const siteDot = document.getElementById("siteDot");
  const siteHostLabel = document.getElementById("siteHostLabel");
  const siteToggleBtn = document.getElementById("siteToggleBtn");
  const globalPausedBanner = document.getElementById("globalPausedBanner");
  const togglesContainer = document.getElementById("togglesContainer");

  const toggleAuto = document.getElementById("toggleAuto");
  const toggleMorph = document.getElementById("toggleMorph");
  const toggleAbbr = document.getElementById("toggleAbbr");
  const toggleSug = document.getElementById("toggleSug");
  const toggleUndo = document.getElementById("toggleUndo");
  const togglePrefix = document.getElementById("togglePrefix");
  const toggleDoubleSpace = document.getElementById("toggleDoubleSpace");

  const wrongWordInput = document.getElementById("wrongWord");
  const rightWordInput = document.getElementById("rightWord");
  const addRuleBtn = document.getElementById("addRuleBtn");
  const ruleSearchInput = document.getElementById("ruleSearch");
  const ruleFilterChips = document.getElementById("ruleFilterChips");
  const rulesCountLabel = document.getElementById("rulesCountLabel");
  const restoreDefaultsBar = document.getElementById("restoreDefaultsBar");
  const disabledCountText = document.getElementById("disabledCountText");
  const restoreDefaultsBtn = document.getElementById("restoreDefaultsBtn");
  const rulesListEl = document.getElementById("rulesList");

  const personalWordInput = document.getElementById("personalWordInput");
  const addPersonalBtn = document.getElementById("addPersonalBtn");
  const personalWordsChips = document.getElementById("personalWordsChips");
  const dictFileInput = document.getElementById("dictFile");
  const dictTotalBadge = document.getElementById("dictTotalBadge");
  const dictBreakdownText = document.getElementById("dictBreakdownText");
  const clearImportedBtn = document.getElementById("clearImportedBtn");
  const exportBackupBtn = document.getElementById("exportBackupBtn");
  const importBackupBtn = document.getElementById("importBackupBtn");
  const backupFileInput = document.getElementById("backupFile");
  const toastEl = document.getElementById("toast");

  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = {
    geral: document.getElementById("tabGeral"),
    regras: document.getElementById("tabRegras"),
    dicionario: document.getElementById("tabDicionario")
  };

  let toastTimer = null;

  function showToast(message, isError = false) {
    if (toastTimer) clearTimeout(toastTimer);
    toastEl.textContent = message;
    toastEl.classList.toggle("error", isError);
    toastEl.classList.add("visible");
    toastTimer = setTimeout(() => {
      toastEl.classList.remove("visible");
    }, 2600);
  }

  function stripAccents(str) {
    return window.dictEngine
      ? window.dictEngine.stripAccents(str)
      : str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  // Navegação por abas
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetTab = btn.dataset.tab;
      tabButtons.forEach((b) => b.classList.toggle("active", b === btn));
      Object.entries(tabPanels).forEach(([key, panel]) => {
        panel.classList.toggle("active", key === targetTab);
      });

      const floatingPopup = document.getElementById("local-dict-popup");
      if (floatingPopup && targetTab !== "geral") {
        floatingPopup.style.display = "none";
      }
    });
  });

  // Renderização geral
  function renderHeaderAndSettings() {
    const count = Number(state.stats.correctionsCount) || 0;
    statsBadge.textContent = `${count.toLocaleString("pt-BR")} ${count === 1 ? "correção" : "correções"}`;

    toggleEnabled.checked = state.settings.enabled;
    toggleAuto.checked = state.settings.autoCorrect;
    if (toggleMorph) toggleMorph.checked = state.settings.morphologicalEngine !== false;
    toggleAbbr.checked = state.settings.expandAbbreviations;
    toggleSug.checked = state.settings.showSuggestions;
    toggleUndo.checked = state.settings.undoOnBackspace;
    togglePrefix.checked = state.settings.autocompletePrefix;
    toggleDoubleSpace.checked = state.settings.doubleSpacePeriod;

    const isPausedGlobally = !state.settings.enabled;
    globalPausedBanner.classList.toggle("visible", isPausedGlobally);
    togglesContainer.classList.toggle("toggles-disabled", isPausedGlobally);
  }

  function renderSiteBar() {
    if (!state.currentHost) {
      siteDot.className = "site-dot local";
      siteHostLabel.textContent = "Página local";
      siteToggleBtn.disabled = true;
      siteToggleBtn.className = "site-btn";
      siteToggleBtn.textContent = "Local";
      return;
    }

    const isPaused = state.disabledSites.includes(state.currentHost);
    siteHostLabel.textContent = state.currentHost;
    siteToggleBtn.disabled = false;
    siteDot.className = isPaused ? "site-dot paused" : "site-dot";
    siteToggleBtn.className = isPaused ? "site-btn paused" : "site-btn";
    siteToggleBtn.textContent = isPaused ? "Pausado neste site" : "Ativo neste site";
  }

  function getMergedRules() {
    const defaults = window.dictEngine
      ? window.dictEngine.getDefaultDictionaries()
      : { autocorrect: {}, abbreviations: {} };

    const disabledSet = new Set(state.disabledAutoCorrect.map((w) => w.toLowerCase()));
    const list = [];
    const seen = new Set();

    // 1. Regras personalizadas do usuário
    for (const [wrong, right] of Object.entries(state.customAutoCorrect)) {
      const key = wrong.toLowerCase();
      if (!key || seen.has(key)) continue;
      seen.add(key);
      list.push({ wrong: key, right, category: "custom" });
    }

    // 2. Abreviações padrão
    for (const [wrong, right] of Object.entries(defaults.abbreviations || {})) {
      const key = wrong.toLowerCase();
      if (!key || seen.has(key) || disabledSet.has(key)) continue;
      seen.add(key);
      list.push({ wrong: key, right, category: "abbr" });
    }

    // 3. Correções de acentuação e ortografia padrão
    for (const [wrong, right] of Object.entries(defaults.autocorrect || {})) {
      const key = wrong.toLowerCase();
      if (!key || seen.has(key) || disabledSet.has(key)) continue;
      seen.add(key);
      list.push({ wrong: key, right, category: "accent" });
    }

    const order = { custom: 0, abbr: 1, accent: 2 };
    list.sort((a, b) => order[a.category] - order[b.category] || a.wrong.localeCompare(b.wrong));
    return list;
  }

  function renderRulesList() {
    const allRules = getMergedRules();
    const query = stripAccents(state.searchQuery.trim().toLowerCase());

    const filtered = allRules.filter((rule) => {
      if (state.activeFilter !== "all" && rule.category !== state.activeFilter) {
        return false;
      }
      if (!query) return true;
      return (
        stripAccents(rule.wrong).includes(query) ||
        stripAccents(rule.right.toLowerCase()).includes(query)
      );
    });

    rulesCountLabel.textContent = `${filtered.length} ${filtered.length === 1 ? "regra" : "regras"}`;

    const disabledCount = state.disabledAutoCorrect.length;
    restoreDefaultsBar.classList.toggle("visible", disabledCount > 0);
    disabledCountText.textContent = `${disabledCount} regra(s) padrão desativada(s)`;

    rulesListEl.innerHTML = "";
    if (filtered.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = query
        ? "Nenhuma regra encontrada para essa busca."
        : "Nenhuma regra nesta categoria.";
      rulesListEl.appendChild(empty);
      return;
    }

    const fragment = document.createDocumentFragment();
    for (const item of filtered) {
      const row = document.createElement("div");
      row.className = "rule-item";
      row.title = "Clique para editar nos campos acima";

      row.addEventListener("click", () => {
        wrongWordInput.value = item.wrong;
        rightWordInput.value = item.right;
        rightWordInput.focus();
      });

      const pair = document.createElement("div");
      pair.className = "rule-pair";

      const wrongEl = document.createElement("span");
      wrongEl.className = "rule-wrong";
      wrongEl.textContent = item.wrong;

      const arrowEl = document.createElement("span");
      arrowEl.className = "rule-arrow";
      arrowEl.textContent = "→";

      const rightEl = document.createElement("span");
      rightEl.className = "rule-right";
      rightEl.textContent = item.right;

      pair.appendChild(wrongEl);
      pair.appendChild(arrowEl);
      pair.appendChild(rightEl);

      const meta = document.createElement("div");
      meta.className = "rule-meta";

      const badge = document.createElement("span");
      badge.className =
        "rule-badge " +
        (item.category === "custom"
          ? "badge-custom"
          : item.category === "abbr"
          ? "badge-abbr"
          : "badge-default");
      badge.textContent =
        item.category === "custom" ? "Sua" : item.category === "abbr" ? "Abrev" : "Padrão";

      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "icon-del";
      delBtn.textContent = "×";
      delBtn.title = item.category === "custom" ? "Excluir regra" : "Desativar regra padrão";
      delBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        removeOrDisableRule(item);
      });

      meta.appendChild(badge);
      meta.appendChild(delBtn);

      row.appendChild(pair);
      row.appendChild(meta);
      fragment.appendChild(row);
    }

    rulesListEl.appendChild(fragment);
  }

  function renderPersonalWords() {
    personalWordsChips.innerHTML = "";
    if (state.ignoredWords.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.style.padding = "8px 4px";
      empty.textContent = "Nenhuma palavra pessoal adicionada ainda.";
      personalWordsChips.appendChild(empty);
      return;
    }

    const sorted = [...state.ignoredWords].sort((a, b) => a.localeCompare(b));
    for (const word of sorted) {
      const chip = document.createElement("span");
      chip.className = "word-chip";

      const text = document.createElement("span");
      text.textContent = word;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = "×";
      btn.title = `Remover "${word}"`;
      btn.addEventListener("click", () => removePersonalWord(word));

      chip.appendChild(text);
      chip.appendChild(btn);
      personalWordsChips.appendChild(chip);
    }
  }

  function renderDictionaryStats() {
    const engineStats = window.dictEngine
      ? window.dictEngine.getStats()
      : {
          totalWords: 0,
          nativeWords: 0,
          personalWords: state.ignoredWords.length,
          importedWords: state.importedWordsCount
        };

    const importedCount = window.dictEngine ? engineStats.importedWords : state.importedWordsCount;

    dictTotalBadge.textContent = `${engineStats.totalWords.toLocaleString("pt-BR")} formas`;
    const morphInfo = engineStats.morphologicalWords
      ? ` (Morfologia: +${engineStats.morphologicalWords.toLocaleString("pt-BR")})`
      : "";
    dictBreakdownText.textContent =
      `Nativas: ${engineStats.nativeWords.toLocaleString("pt-BR")}${morphInfo} · ` +
      `Pessoais: ${engineStats.personalWords.toLocaleString("pt-BR")} · ` +
      `Importadas: ${importedCount.toLocaleString("pt-BR")}`;

    clearImportedBtn.style.display = importedCount > 0 ? "inline-flex" : "none";
  }

  function renderAll() {
    renderHeaderAndSettings();
    renderSiteBar();
    renderRulesList();
    renderPersonalWords();
    renderDictionaryStats();
  }

  // Carregamento inicial
  function loadInitialData() {
    chrome.storage.local.get(
      [
        "settings",
        "customAutoCorrect",
        "ignoredWords",
        "disabledAutoCorrect",
        "disabledSites",
        "stats"
      ],
      (data) => {
        const safeData = data || {};
        state.settings = { ...DEFAULT_UI_SETTINGS, ...(safeData.settings || {}) };
        state.customAutoCorrect = safeData.customAutoCorrect || {};
        state.ignoredWords = Array.isArray(safeData.ignoredWords) ? safeData.ignoredWords : [];
        state.disabledAutoCorrect = Array.isArray(safeData.disabledAutoCorrect) ? safeData.disabledAutoCorrect : [];
        state.disabledSites = Array.isArray(safeData.disabledSites) ? safeData.disabledSites : [];
        state.stats = safeData.stats || { correctionsCount: 0 };

        renderAll();

        setTimeout(() => {
          if (window.dictEngine) {
            window.dictEngine.ensureLoaded(() => {
              state.importedWordsCount = window.dictEngine.getStats().importedWords;
              renderAll();
            });
          }
        }, 15);
      }
    );

    if (chrome.tabs && chrome.tabs.query) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs && tabs[0];
        if (tab && tab.url) {
          try {
            const parsed = new URL(tab.url);
            if ((parsed.protocol === "http:" || parsed.protocol === "https:") && parsed.hostname) {
              state.currentHost = parsed.hostname;
            }
          } catch (_) {
            state.currentHost = null;
          }
        }
        renderSiteBar();
      });
    }
  }

  // Sincroniza quando o playground ou outra aba altera o storage
  chrome.storage.onChanged.addListener((changes) => {
    let needsEngineReload = false;

    if (changes.settings) {
      state.settings = { ...DEFAULT_UI_SETTINGS, ...(changes.settings.newValue || {}) };
      needsEngineReload = true;
    }
    if (changes.customWords) {
      state.importedWordsCount = Array.isArray(changes.customWords.newValue)
        ? changes.customWords.newValue.length
        : 0;
      needsEngineReload = true;
    }
    if (changes.customAutoCorrect) {
      state.customAutoCorrect = changes.customAutoCorrect.newValue || {};
      needsEngineReload = true;
    }
    if (changes.ignoredWords) {
      state.ignoredWords = Array.isArray(changes.ignoredWords.newValue) ? changes.ignoredWords.newValue : [];
      needsEngineReload = true;
    }
    if (changes.disabledAutoCorrect) {
      state.disabledAutoCorrect = Array.isArray(changes.disabledAutoCorrect.newValue)
        ? changes.disabledAutoCorrect.newValue
        : [];
      needsEngineReload = true;
    }
    if (changes.disabledSites) {
      state.disabledSites = Array.isArray(changes.disabledSites.newValue)
        ? changes.disabledSites.newValue
        : [];
    }
    if (changes.stats) {
      state.stats = changes.stats.newValue || { correctionsCount: 0 };
    }

    if (needsEngineReload && window.dictEngine) {
      window.dictEngine.loadFromStorage(() => renderAll());
    } else {
      renderAll();
    }
  });

  // Ações: Configurações
  function saveSettingsFromUI() {
    state.settings = {
      enabled: toggleEnabled.checked,
      autoCorrect: toggleAuto.checked,
      morphologicalEngine: toggleMorph ? toggleMorph.checked : true,
      expandAbbreviations: toggleAbbr.checked,
      showSuggestions: toggleSug.checked,
      undoOnBackspace: toggleUndo.checked,
      autocompletePrefix: togglePrefix.checked,
      doubleSpacePeriod: toggleDoubleSpace.checked
    };
    chrome.storage.local.set({ settings: state.settings });
    renderHeaderAndSettings();
  }

  [
    toggleEnabled,
    toggleAuto,
    toggleMorph,
    toggleAbbr,
    toggleSug,
    toggleUndo,
    togglePrefix,
    toggleDoubleSpace
  ].filter(Boolean).forEach((input) => {
    input.addEventListener("change", saveSettingsFromUI);
  });

  // Ações: Pausar / Retomar neste site
  siteToggleBtn.addEventListener("click", () => {
    if (!state.currentHost) return;
    const exists = state.disabledSites.includes(state.currentHost);
    const updated = exists
      ? state.disabledSites.filter((h) => h !== state.currentHost)
      : [...state.disabledSites, state.currentHost];

    state.disabledSites = updated;
    chrome.storage.local.set({ disabledSites: updated }, () => {
      renderSiteBar();
      showToast(exists ? `Ativado em ${state.currentHost}` : `Pausado em ${state.currentHost}`);
    });
  });

  // Ações: Regras e Atalhos
  function handleAddRule() {
    const wrong = wrongWordInput.value.trim().toLowerCase();
    const right = rightWordInput.value.trim();

    if (!wrong || !right) {
      showToast("Preencha o termo errado/atalho e a correção.", true);
      return;
    }
    if (/\s/.test(wrong)) {
      showToast("O gatilho (errado/atalho) não pode conter espaços.", true);
      return;
    }

    const updatedRules = { ...state.customAutoCorrect, [wrong]: right };
    const updatedDisabled = state.disabledAutoCorrect.filter((w) => w.toLowerCase() !== wrong);
    const updatedIgnored = state.ignoredWords.filter((w) => w.toLowerCase() !== wrong);

    chrome.storage.local.set(
      {
        customAutoCorrect: updatedRules,
        disabledAutoCorrect: updatedDisabled,
        ignoredWords: updatedIgnored
      },
      () => {
        wrongWordInput.value = "";
        rightWordInput.value = "";
        wrongWordInput.focus();
        showToast(`Regra "${wrong} → ${right}" salva.`);
      }
    );
  }

  addRuleBtn.addEventListener("click", handleAddRule);
  [wrongWordInput, rightWordInput].forEach((el) => {
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleAddRule();
      }
    });
  });

  function removeOrDisableRule(item) {
    if (item.category === "custom") {
      const updated = { ...state.customAutoCorrect };
      delete updated[item.wrong];
      chrome.storage.local.set({ customAutoCorrect: updated }, () => {
        showToast(`Regra "${item.wrong}" removida.`);
      });
    } else {
      if (!state.disabledAutoCorrect.includes(item.wrong)) {
        const updated = [...state.disabledAutoCorrect, item.wrong];
        chrome.storage.local.set({ disabledAutoCorrect: updated }, () => {
          showToast(`Regra padrão "${item.wrong}" desativada.`);
        });
      }
    }
  }

  restoreDefaultsBtn.addEventListener("click", () => {
    chrome.storage.local.set({ disabledAutoCorrect: [] }, () => {
      showToast("Regras padrão restauradas.");
    });
  });

  ruleSearchInput.addEventListener("input", () => {
    state.searchQuery = ruleSearchInput.value;
    renderRulesList();
  });

  ruleFilterChips.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-pill");
    if (!btn) return;
    state.activeFilter = btn.dataset.filter || "all";
    ruleFilterChips.querySelectorAll(".filter-pill").forEach((pill) => {
      pill.classList.toggle("active", pill === btn);
    });
    renderRulesList();
  });

  // Ações: Dicionário Pessoal
  function handleAddPersonalWord() {
    const word = personalWordInput.value.trim().toLowerCase();
    if (!word) {
      showToast("Digite uma palavra para adicionar.", true);
      return;
    }
    if (/\s/.test(word) || word.length < 2) {
      showToast("Digite uma palavra única (mínimo 2 letras).", true);
      return;
    }
    if (state.ignoredWords.includes(word)) {
      showToast(`"${word}" já está no seu dicionário.`, true);
      return;
    }

    const updated = [...state.ignoredWords, word];
    chrome.storage.local.set({ ignoredWords: updated }, () => {
      personalWordInput.value = "";
      showToast(`"${word}" adicionada ao dicionário pessoal.`);
    });
  }

  addPersonalBtn.addEventListener("click", handleAddPersonalWord);
  personalWordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddPersonalWord();
    }
  });

  function removePersonalWord(word) {
    const updated = state.ignoredWords.filter((w) => w !== word);
    chrome.storage.local.set({ ignoredWords: updated }, () => {
      showToast(`"${word}" removida do dicionário pessoal.`);
    });
  }

  // Ações: Importação .txt / .dic
  dictFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const buffer = event.target.result;
      // Tenta decodificar como UTF-8; se houver caractere inválido (\uFFFD), usa ISO-8859-1 (Latin-1)
      let rawText = new TextDecoder("utf-8").decode(buffer);
      if (rawText.includes("\uFFFD")) {
        rawText = new TextDecoder("iso-8859-1").decode(buffer);
      }

      const words = rawText
        .split(/\r?\n/)
        .map((line) => line.split("/")[0].trim().toLowerCase())
        .filter((w) => w.length >= 2 && /^[a-zà-ÿ-]+$/i.test(w));

      const uniqueWords = Array.from(new Set(words));
      chrome.storage.local.set({ customWords: uniqueWords }, () => {
        dictFileInput.value = "";
        showToast(`${uniqueWords.length.toLocaleString("pt-BR")} palavras importadas.`);
      });
    };
    reader.readAsArrayBuffer(file);
  });

  clearImportedBtn.addEventListener("click", () => {
    chrome.storage.local.set({ customWords: [] }, () => {
      showToast("Palavras importadas removidas (nativas mantidas).");
    });
  });

  // Ações: Backup JSON
  exportBackupBtn.addEventListener("click", () => {
    chrome.storage.local.get(
      ["settings", "customAutoCorrect", "ignoredWords", "disabledAutoCorrect", "disabledSites"],
      (data) => {
        const payload = {
          version: 2,
          exportedAt: new Date().toISOString(),
          settings: { ...DEFAULT_UI_SETTINGS, ...(data.settings || {}) },
          customAutoCorrect: data.customAutoCorrect || {},
          ignoredWords: Array.isArray(data.ignoredWords) ? data.ignoredWords : [],
          disabledAutoCorrect: Array.isArray(data.disabledAutoCorrect) ? data.disabledAutoCorrect : [],
          disabledSites: Array.isArray(data.disabledSites) ? data.disabledSites : []
        };

        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "corretor-local-backup.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        showToast("Backup exportado com sucesso.");
      }
    );
  });

  importBackupBtn.addEventListener("click", () => {
    backupFileInput.click();
  });

  backupFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(String(event.target.result || ""));
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
          throw new Error("Formato inválido");
        }

        const hasKnownField =
          "settings" in parsed ||
          "customAutoCorrect" in parsed ||
          "ignoredWords" in parsed ||
          "disabledAutoCorrect" in parsed ||
          "disabledSites" in parsed;

        if (!hasKnownField) {
          throw new Error("Nenhum dado de backup reconhecido");
        }

        const toSave = {};
        if (parsed.settings && typeof parsed.settings === "object" && !Array.isArray(parsed.settings)) {
          toSave.settings = { ...DEFAULT_UI_SETTINGS, ...parsed.settings };
        }
        if (
          parsed.customAutoCorrect &&
          typeof parsed.customAutoCorrect === "object" &&
          !Array.isArray(parsed.customAutoCorrect)
        ) {
          const cleanRules = {};
          for (const [k, v] of Object.entries(parsed.customAutoCorrect)) {
            if (typeof k === "string" && typeof v === "string" && k.trim() && v.trim()) {
              cleanRules[k.trim().toLowerCase()] = v.trim();
            }
          }
          toSave.customAutoCorrect = cleanRules;
        }
        if (Array.isArray(parsed.ignoredWords)) {
          toSave.ignoredWords = Array.from(
            new Set(parsed.ignoredWords.filter((w) => typeof w === "string" && w.trim()).map((w) => w.trim().toLowerCase()))
          );
        }
        if (Array.isArray(parsed.disabledAutoCorrect)) {
          toSave.disabledAutoCorrect = Array.from(
            new Set(parsed.disabledAutoCorrect.filter((w) => typeof w === "string" && w.trim()).map((w) => w.trim().toLowerCase()))
          );
        }
        if (Array.isArray(parsed.disabledSites)) {
          toSave.disabledSites = Array.from(
            new Set(parsed.disabledSites.filter((s) => typeof s === "string" && s.trim()).map((s) => s.trim()))
          );
        }

        chrome.storage.local.set(toSave, () => {
          backupFileInput.value = "";
          showToast("Backup restaurado com sucesso.");
        });
      } catch (_) {
        backupFileInput.value = "";
        showToast("Arquivo de backup JSON inválido.", true);
      }
    };
    reader.readAsText(file, "utf-8");
  });

  loadInitialData();
})();
