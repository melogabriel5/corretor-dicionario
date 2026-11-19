# Corretor Local por Dicionário

Offline Brazilian Portuguese spell checker for Chromium browsers. It fixes accents and common typos as you type, expands chat abbreviations, and suggests words from a local dictionary. Nothing leaves the browser: there is no account, no cloud request, and no tracking.

**Corretor Local** · version 2.2 · Manifest V3

## Features

- **Automatic correction** on space and punctuation, including missing accents (`configuracao` → `configuração`).
- **Morphology engine** that builds verb forms, plurals, gender, superlatives (`-íssimo`), and adverbs (`-mente`) from a Brazilian Portuguese word list.
- **Abbreviation expansion** for everyday shortcuts such as `vc`, `tb`, `pq`, `obg`, `hj`, and `blz`.
- **Live suggestions** ranked with a Damerau–Levenshtein search, plus prefix autocomplete for longer words.
- **Undo** the last correction with Backspace.
- **Optional double-space period**: two spaces in a row insert `. `.
- **Per-site pause** and a global on/off switch.
- **Custom rules and snippets** (`/atalho` → any text), a personal dictionary, and the option to turn off built-in rules.
- **Import** a `.txt` word list or a Hunspell `.dic` file (UTF-8 or Latin-1).
- **JSON backup** of settings, rules, personal words, and paused sites.
- Works in text inputs, text areas, and `contenteditable` fields, including inside iframes. Original capitalization is kept.

## Install

1. Clone or download this repository.
2. Open `chrome://extensions` in Chrome, Edge, Brave, or another Chromium browser.
3. Turn on **Developer mode**.
4. Click **Load unpacked** and select this folder.

The toolbar icon opens the settings popup. A small playground on the **General** tab lets you try corrections without leaving the popup.

## Usage

| Action | What happens |
| --- | --- |
| Type a word and press Space | Applies the best automatic correction or abbreviation |
| Arrow keys | Cycle through the floating suggestions and replace the word immediately |
| Tab or Alt+1 … Alt+4 | Accept a suggestion and continue with a space |
| Escape | Dismiss the suggestion popup |
| Backspace | Restore the text from before the last correction |

Open the popup to:

- Pause the extension everywhere, or only on the current site.
- Toggle autocorrect, morphology, abbreviations, suggestions, undo, autocomplete, and the double-space period.
- Add, search, edit, or disable rules.
- Add personal words so names and product terms are never “corrected”.
- Import a dictionary or export a backup.

## Privacy

All dictionaries, rules, and statistics stay in `chrome.storage.local`. Corrections run entirely in the browser, and typed text stays on the device.

## Project layout

| File | Role |
| --- | --- |
| `manifest.json` | Manifest V3 extension definition |
| `content.js` | Typing hooks, corrections, and the suggestion popup |
| `dictionary.js` | Built-in words, abbreviations, rules, and suggestion search |
| `morphology.js` | Portuguese inflection engine |
| `popup.html` / `popup.js` | Settings, rules, dictionary, and backup UI |
| `styles.css` | Styles for the floating suggestion popup |

## License

No license file is included yet. All rights reserved by the author unless a license is added later.
