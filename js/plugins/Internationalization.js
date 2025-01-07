//=============================================================================
// Internationalization.js
//=============================================================================

/*:
 * @plugindesc Provides internationalization (i18n) support for RPG Maker MV, enabling translations of in-game text and language management.
 * @author hckoalla
 *
 * @param DefaultLanguage
 * @text Default Language
 * @type text
 * @desc The language to use by default if no saved configuration is found.
 * @default enUS
 *
 * @help This plugin offers the following features:
 * 
 * - Load translations dynamically from JSON files stored in a "locales" folder.
 * - Automatically save and load the last selected language via a `languageConfig.json` file.
 * - Use script calls to translate text: `i18n.translate("key")`.
 * - Change the game language at runtime with `i18n.load("languageCode")`.
 * - Retrieve the current language with `i18n.currentLanguage()`.
 * - List available languages from the "locales" folder using `i18n.listLanguages()`.
 * 
 * ## File Structure:
 * Place your translation files in a "locales" folder at the root of your project.
 * Example:
 *   locales/enUS.json
 *   locales/ptBR.json
 * 
 * ## JSON File Format:
 * Each JSON file must contain key-value pairs for the translated text.
 * Example (`enUS.json`):
 * {
 *   "greeting": "Hello, adventurer!",
 *   "farewell": "Goodbye, brave one."
 * }
 * 
 * ## Language Configuration:
 * The selected language is saved in `languageConfig.json` under the save folder.
 * This allows the game to remember the player's language preference.
 * 
 * ## Usage:
 * - Translate text in events or scripts: `i18n.translate("key")`.
 * - Change the language dynamically: `i18n.load("ptBR")`.
 * - Retrieve the current language: `i18n.currentLanguage()`.
 * - List all available languages: `i18n.listLanguages()`.
 * 
 * ## Notes:
 * - If the specified language file cannot be found, an error will be logged.
 * - If no saved language is found, the default language will be used.
 * - Ensure the "locales" folder and JSON files are properly set up for the plugin to work.
 */

(function() {
    var parameters = PluginManager.parameters('Internationalization');
    var defaultLanguage = parameters['DefaultLanguage'] || 'enUS';
    var languageConfigFile = 'languageConfig.json';

    var currentLanguage = defaultLanguage;
    var translations = {};

    function loadSavedLanguage() {
        var xhr = new XMLHttpRequest();
		try{
			xhr.open("GET", languageConfigFile, false);
		} catch (e) {
			saveLanguage(defaultLanguage);
			xhr.open("GET", languageConfigFile, false);
        }
        try {
            xhr.send();
            if (xhr.status === 200) {
                var config = JSON.parse(xhr.responseText);
                if (config.language) {
                    currentLanguage = config.language;
                }
            }
        } catch (e) {
            console.warn("No saved language config found. Using default.");
        }
    }

    function saveLanguage(language) {
        var fs = require('fs');
        var path = require('path');
		var directoryPath = StorageManager.localFileDirectoryPath();
		var filePath = path.join(directoryPath, languageConfigFile);

		if (!fs.existsSync(directoryPath)) {
			fs.mkdirSync(directoryPath, { recursive: true });
		}

		fs.writeFileSync(filePath, JSON.stringify({ language: language }, null, 2));
    }

    function loadTranslations(language) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "locales/" + language + ".json", true);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    translations = JSON.parse(xhr.responseText);
                    currentLanguage = language;
                    saveLanguage(language);
                    resolve();
                } else {
                    console.error("Failed to load language: " + language);
                    reject(new Error("Failed to load language: " + language));
                }
            };
            xhr.onerror = function() {
                console.error("Error loading language file: " + language);
                reject(new Error("Error loading language file: " + language));
            };
            xhr.send();
        });
    }
	
	function getLanguageConfig() {
        try {
            var fs = require('fs');
            var path = require('path');
            var filePath = path.join(StorageManager.localFileDirectoryPath(), languageConfigFile);
            if (fs.existsSync(filePath)) {
                var data = fs.readFileSync(filePath, 'utf8');
                return JSON.parse(data);
            } else {
                console.warn("Language config file not found.");
                return null;
            }
        } catch (e) {
            console.error("Failed to read language config file:", e);
            return null;
        }
    }

    function listAvailableLanguages() {
        try {
            var fs = require('fs');
            var path = require('path');
            var localesDir = path.join('locales');
            if (fs.existsSync(localesDir)) {
                return fs.readdirSync(localesDir)
                    .filter(file => file.endsWith('.json'))
                    .map(file => file.replace('.json', ''));
            } else {
                console.warn("Locales directory not found.");
                return [];
            }
        } catch (e) {
            console.error("Failed to list available languages:", e);
            return [];
        }
    }

    function listAvailableLanguagesTranslated() {
        try{
            return listAvailableLanguages().map(language => t(language));
        } catch (e) {
            console.error("Failed to list available languages:", e);
            return [];
        }
    }

    function t(key) {
        return translations[key] || key;
    }
 
    window.i18n = {
        loadTranslations: loadTranslations,
        translate: t,
        currentLanguage: function() { return currentLanguage; },
        getConfig: getLanguageConfig,
        listAvailableLanguages: listAvailableLanguages,
        listAvailableLanguagesTranslated: listAvailableLanguagesTranslated,
        saveLanguage: saveLanguage
    };

    loadSavedLanguage();
    loadTranslations(currentLanguage);
})();
