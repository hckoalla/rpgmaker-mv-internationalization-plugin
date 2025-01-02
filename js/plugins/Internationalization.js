//=============================================================================
// Internationalization.js
//=============================================================================

/*:
 * @plugindesc Adds support for internationalization (i18n) to RPG Maker MV, allowing translations of in-game text into multiple languages.
 * @author hckoalla
 *
 * @help This plugin provides the following functionality:
 * - Load translations from JSON files based on the selected language.
 * - Use a script call to translate text dynamically: i18n.translate("key").
 * - Change the language during the game with i18n.load("languageCode").
 *
 * File Structure:
 * Place translation files in a "locales" folder within your project directory.
 * Example:
 *   locales/en.json
 *   locales/pt.json
 *
 * JSON File Format:
 * Each JSON file should contain key-value pairs for text translations.
 * Example (en.json):
 * {
 *   "greeting": "Hello, adventurer!",
 *   "farewell": "Goodbye, brave one."
 * }
 *
 * Usage:
 * Use script calls in events to translate text or dynamically change the language.
 * Example:
 * - To display a translated text: i18n.translate("greeting").
 * - To switch to Portuguese: i18n.load("pt").
 *
 * Note:
 * This plugin does not provide additional plugin commands in the editor.
 */
 
 (function() {
    var currentLanguage = "en"; // Idioma padrão

    var translations = {};

    function loadTranslations(language) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "locales/" + language + ".json", true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                translations = JSON.parse(xhr.responseText);
                currentLanguage = language;
            } else {
                console.error("Não foi possível carregar o idioma: " + language);
            }
        };
        xhr.send();
    }

    // Função para traduzir uma chave
    function t(key) {
        return translations[key] || key;
    }

    // Disponibilizando globalmente
    window.i18n = {
        load: loadTranslations,
        translate: t,
        currentLanguage: function() { return currentLanguage; }
    };

    // Carrega o idioma padrão
    loadTranslations(currentLanguage);
})();
