# RPG Maker MV Internationalization - plugin

## Description

This plugin introduces internationalization (i18n) capabilities to RPG Maker MV, allowing game text to be translated into multiple languages. Translations are managed through JSON files, providing flexibility and ease of use.

## Features

- Load translations dynamically based on the selected language.
- Use script calls to display translated text in events.
- Change the language during gameplay with a simple script call.

## Installation

1. Download the `Internationalization.js` file.
2. Place it in the `js/plugins` folder of your RPG Maker MV project.
3. Create a folder named `locales` in your project directory and add translation files (`en.json`, `pt.json`, etc.) inside it.
4. Open RPG Maker MV and go to the Plugin Manager.
5. Add the `Internationalization` plugin to your project.

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

locales/pt.json:
```json
{
  "greeting": "Olá, aventureiro!",
  "farewell": "Adeus, bravo herói."
}
```

## Usage

## Script Calls

- Display Translated Text:
Use i18n.translate("key") in events to display the translated text.
Example:

```javascript
$gameMessage.add(i18n.translate("greeting"));
```

- Change Language:
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

# Error Handling

- If a key is missing in the translation file, the key name will be displayed as a fallback.
- Ensure that the JSON files are properly formatted and located in the locales folder.

## Future Integration
This plugin can be enhanced further with features such as:

- Integration with in-game menus for language selection.
- Support for text placeholders and pluralization.

## License
This plugin is released under the Apache License 2.0. You are free to use, modify, and distribute this plugin, provided that you comply with the terms of the license. This includes maintaining the copyright notice and the license text in all copies or substantial portions of the software.

**Credit:** hckoalla

For example, include the following in your project credits:  
`Internationalization.js by hckoalla`
