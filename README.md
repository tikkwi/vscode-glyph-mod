# Glyph Mod Icon Theme

A modern and comprehensive icon theme for VS Code that provides beautiful icons for various file types, extensions, and programming languages.

## Features


---

**This is the simplest implementation for a VS Code icon theme, based on the icons from [lewxdev/vscode-glyph](https://github.com/lewxdev/vscode-glyph).**

## Supported File Types

### Archives
- 7z, br, brotli, bzip2, gz, gzip, rar, tar, tgz, xz, zip

### Audio
- aiff, flac, m4a, mp3, wav, wma

### Web Technologies
- HTML, XML, JavaScript, TypeScript, React (JSX/TSX), Vue, Svelte

### Documentation
- Markdown, PDF, DOC, TXT, README files

### Configuration
- JSON, YAML, TOML, INI, ENV files, package.json, tsconfig.json

### Development
- Git files, license files, test files, shell scripts

## Installation

1. Clone this repository
2. Install dependencies: `npm install`
3. Generate the icon theme: `npm run build`
4. Package the extension: `npm run package`
5. Install the generated .vsix file in VS Code

## Development

### Adding New Icons

1. Add your SVG icon to the `icons/` directory
2. Update the `EIcon` enum in `src/constant.js`
3. Add the file associations in the `THEME` object in `src/constant.js`
4. Run `npm run build` to regenerate the icon theme

### File Structure

```
vscode-glyph-mod/
├── icons/          # SVG icon files
├── src/
│   ├── constant.js # Icon definitions and file associations
│   └── generate.js # Script to generate icon theme JSON
├── theme/          # Generated icon theme JSON
└── package.json    # Extension manifest
```

### Icon Configuration

Icons are configured in `src/constant.js` with the following properties:

- `fileExtensions`: Comma-separated list of file extensions
- `fileNames`: File names with glob pattern support (e.g., `{option1,option2}{.ext1,.ext2}`)
- `languageIds`: VS Code language identifiers

Example:
```javascript
[EIcon.React]: {
    fileExtensions: "jsx,tsx",
},
[EIcon.Certificate]: {
    fileExtensions: "cer,cert,crt",
    fileNames: "{licence,license,unlicense}{,.md,.txt}",
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add your icons and update constants
4. Test the generation process
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
