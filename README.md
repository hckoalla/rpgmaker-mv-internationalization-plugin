# RPG Maker MV Internationalization - Plugin

## Description

This plugin introduces internationalization (i18n) capabilities to RPG Maker MV, allowing game text to be translated into multiple languages. Translations are managed through JSON files, providing flexibility and ease of use.

## Features

- Load translations dynamically based on the selected language.
- Use script calls to display translated text in events.
- Change the language during gameplay with a simple script call.
- **New:** Adds a language selection option to the title screen.
- **New:** Adds a language selection option to the in-game menu.
- **New:** Support for switching languages at runtime.
- **New:** Players can select their preferred language at any time.
- **New:** Save language preferences across sessions by storing the selected language in `languageConfig.json`.

## Installation

1. Download the `Internationalization.js` file.
2. Place it in the `js/plugins` folder of your RPG Maker MV project.
3. Create a folder named `locales` in your project directory and add translation files (`en.json`, `pt.json`, etc.) inside it.
4. Open RPG Maker MV and go to the Plugin Manager.
5. Add the `Internationalization` plugin to your project.

## New Plugins

- **InternationalizationMainMenu.js**  
  Adds a language selection option to the title screen, allowing players to choose their language before starting the game.

- **InternationalizationMenu.js**  
  Adds a language selection option within the in-game menu, allowing players to change the language during gameplay.

- **Internationalization.js**  
  This is the core plugin responsible for internationalization, offering various methods for loading and saving translations.

## Demo

If you're looking for a demonstration of this project in action, [visit our repository on GitHub](https://github.com/hckoalla/rpgmaker-mv-internationalization-demo).

## JSON File Structure

Each JSON file should contain key-value pairs for the text you want to translate.

Example:

**`locales/en.json`**:
```json
{
  "greeting": "Hello, adventurer!",
  "farewell": "Goodbye, brave one."
}
```

**`locales/pt.json:`**:

```json
{
  "greeting": "Olá, aventureiro!",
  "farewell": "Adeus, bravo herói."
}
```

Usage
Script Calls
Display Translated Text
Use i18n.translate("key") in events to display the translated text.
Example:

javascript
Copiar código
$gameMessage.add(i18n.translate("greeting"));
Change Language
Use i18n.load("languageCode") to switch the language.
Example:

```javascript
i18n.load("pt");
```

## Dynamic Language Detection

Automatically set the language based on the player's system settings:

```javascript
var systemLanguage = navigator.language || navigator.userLanguage;
var language = systemLanguage.startsWith("pt") ? "pt" : "en";
i18n.load(language);
```

## Adding New Languages

To add a new language:

- Create a new JSON file in the locales directory (e.g., locales/es.json for Spanish).
- Add the translations for that language in the new file.
- The game will automatically detect and load the language based on the selected code.
- 
Example:

```json
{
  "greeting": "¡Hola, aventurero!",
  "farewell": "Adiós, valiente."
}
```

## Error Handling

If a key is missing in the translation file, the key name will be displayed as a fallback.
Ensure that the JSON files are properly formatted and located in the locales folder.

## License

This plugin is released under the Apache License 2.0. You are free to use, modify, and distribute this plugin, provided that you comply with the terms of the license. This includes maintaining the copyright notice and the license text in all copies or substantial portions of the software.

**Credit:** hckoalla

For example, include the following in your project credits:  
`Internationalization.js by hckoalla`
