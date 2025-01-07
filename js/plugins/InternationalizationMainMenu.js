//=============================================================================
// InternationalizationMainMenu.js
//=============================================================================

/*:
 * @plugindesc Adds language selection to the title screen, allowing players to switch languages before starting the game. Depends on Internationalization.js plugin.
 * @author hckoalla
 *
 * @help This plugin adds a language selection option to the title screen. It allows players to choose their preferred language before starting the game. It requires the Internationalization.js plugin to function properly.

 * Features:
 * - Adds a "Language" option to the title screen menu.
 * - Opens a language selection window when the "Language" option is chosen.
 * - Supports dynamic language switching at runtime, saving the language preference.
 * - Saves the selected language to `languageConfig.json` for persistence across sessions.
 * 
 * ## Requirements:
 * - The `Internationalization.js` plugin (created by hckoalla) is required for this plugin to function properly. This plugin manages translations and language data.
 * 
 * ## Usage:
 * - The language options are dynamically generated from the available languages using `window.i18n.listAvailableLanguages()`.
 * - The player can choose their preferred language from the list, and the game will immediately load the selected language.
 * - The selected language is saved and loaded automatically using `window.i18n.saveLanguage()` and `window.i18n.loadTranslations()`.
 * 
 * ## Notes:
 * - If no language is selected, the default language from `Internationalization.js` will be used.
 * - Ensure that the `languageConfig.json` and translation files are properly set up for the plugin to function correctly.
 */
(function() {
    const _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
    Window_TitleCommand.prototype.makeCommandList = function() {
        _Window_TitleCommand_makeCommandList.call(this);
        this.addCommand(window.i18n.translate('language'), 'language');
    };

    const _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        _Scene_Title_createCommandWindow.call(this);
        this._commandWindow.setHandler('language', this.commandLanguage.bind(this));
    };

    Scene_Title.prototype.commandLanguage = function() {
        SceneManager.push(Scene_Language);
    };

    function Scene_Language() {
        this.initialize.apply(this, arguments);
    }

    Scene_Language.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_Language.prototype.constructor = Scene_Language;

    Scene_Language.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_Language.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createLanguageWindow();
    };

    Scene_Language.prototype.createLanguageWindow = function() {
        const languages = window.i18n.listAvailableLanguages();
        this._languageWindow = new Window_LanguageSelect(0, 0, Graphics.boxWidth, Graphics.boxHeight, languages);
        this._languageWindow.setHandler('ok', this.onLanguageOk.bind(this));
        this._languageWindow.setHandler('cancel', this.popScene.bind(this));
        this.addWindow(this._languageWindow);
    };

    Scene_Language.prototype.onLanguageOk = function() {
        const selectedLanguage = this._languageWindow.currentSymbol();
        window.i18n.saveLanguage(selectedLanguage);
        window.i18n.loadTranslations(selectedLanguage);
        this.popScene();
    };

    function Window_LanguageSelect(x, y, width, height, languages) {
        this.initialize.apply(this, arguments);
    }

    Window_LanguageSelect.prototype = Object.create(Window_Command.prototype);
    Window_LanguageSelect.prototype.constructor = Window_LanguageSelect;

    Window_LanguageSelect.prototype.initialize = function(x, y, width, height, languages) {
        this._languages = languages;
        Window_Command.prototype.initialize.call(this, x, y, width, height);
    };

    Window_LanguageSelect.prototype.makeCommandList = function() {
        this._languages.forEach(language => {
            this.addCommand(window.i18n.translate(language), language);
        });
    };
})();