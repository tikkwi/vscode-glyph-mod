import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { THEME, THEME_COLORS } from "./constant.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Convert icon names to match SVG file naming convention
 */
function getIconFileName(iconKey) {
    // Special cases for icon names that don't match the standard conversion
    const specialCases = {
        OpenSource: "open-source",
    };

    return specialCases[iconKey] || iconKey.toLowerCase();
}

/**
 * Create theme-specific icon definition with color support
 */
function createThemedIconDefinition(iconName, iconPath, theme = "dark") {
    const color = THEME_COLORS[theme];
    return {
        iconPath: iconPath,
        // Use fontColor for theme-specific coloring
        fontColor: color,
    };
}

/**
 * Generate VS Code icon theme JSON from constants
 */
function generateIconTheme() {
    const iconTheme = {
        hidesExplorerArrows: true,
        iconDefinitions: {},
        fileExtensions: {},
        fileNames: {},
        languageIds: {},
        file: "file",
        folder: "folder",
        folderExpanded: "folder-expanded",
        rootFolder: "root-folder",
        rootFolderExpanded: "root-folder-expanded",
        // Theme-specific properties
        light: {
            file: "file_light",
            folder: "folder_light",
            folderExpanded: "folder-expanded_light",
            rootFolder: "root-folder_light",
            rootFolderExpanded: "root-folder-expanded_light",
            fileExtensions: {},
            fileNames: {},
            languageIds: {},
        },
    };

    // Add default icon definitions
    iconTheme.iconDefinitions = {
        file: {
            iconPath: "../icons_dark/file.svg",
        },
        folder: {
            iconPath: "../icons_dark/folder.svg",
        },
        "folder-expanded": {
            iconPath: "../icons_dark/folder-expanded.svg",
        },
        "root-folder": {
            iconPath: "../icons_dark/root-folder.svg",
        },
        "root-folder-expanded": {
            iconPath: "../icons_dark/root-folder-expanded.svg",
        },
        // Light theme variants
        file_light: {
            iconPath: "../icons_light/file.svg",
        },
        folder_light: {
            iconPath: "../icons_light/folder.svg",
        },
        "folder-expanded_light": {
            iconPath: "../icons_light/folder-expanded.svg",
        },
        "root-folder_light": {
            iconPath: "../icons_light/root-folder.svg",
        },
        "root-folder-expanded_light": {
            iconPath: "../icons_light/root-folder-expanded.svg",
        },
    };

    // Process each icon type from constants
    Object.entries(THEME).forEach(([iconKey, config]) => {
        const iconName = getIconFileName(iconKey);
        const darkIconPath = `../icons_dark/${iconName}.svg`;
        const lightIconPath = `../icons_light/${iconName}.svg`;

        // Add dark theme icon definition
        iconTheme.iconDefinitions[iconName] = {
            iconPath: darkIconPath,
        };

        // Add light theme variant icon definition
        iconTheme.iconDefinitions[`${iconName}_light`] = {
            iconPath: lightIconPath,
        };

        // Process file extensions
        if (config.fileExtensions) {
            const extensions = config.fileExtensions.split(",");
            extensions.forEach((ext) => {
                const trimmedExt = ext.trim();
                iconTheme.fileExtensions[trimmedExt] = iconName;
                // Add light theme mapping
                iconTheme.light.fileExtensions[
                    trimmedExt
                ] = `${iconName}_light`;
            });
        }

        // Process file names (with glob patterns)
        if (config.fileNames) {
            const fileNames = parseFileNames(config.fileNames);
            fileNames.forEach((fileName) => {
                iconTheme.fileNames[fileName] = iconName;
                // Add light theme mapping
                iconTheme.light.fileNames[fileName] = `${iconName}_light`;
            });
        }

        // Process language IDs
        if (config.languageIds) {
            const languageIds = config.languageIds.split(",");
            languageIds.forEach((langId) => {
                const trimmedLangId = langId.trim();
                iconTheme.languageIds[trimmedLangId] = iconName;
                // Add light theme mapping
                iconTheme.light.languageIds[
                    trimmedLangId
                ] = `${iconName}_light`;
            });
        }
    });

    return iconTheme;
}

/**
 * Parse file names with glob patterns and expand them
 */
function parseFileNames(fileNamesString) {
    const fileNames = [];
    const patterns = fileNamesString.split(",");

    patterns.forEach((pattern) => {
        pattern = pattern.trim();

        // Handle patterns like {licence,license,unlicense}{,.md,.txt}
        if (pattern.includes("{") && pattern.includes("}")) {
            const expandedNames = expandGlobPattern(pattern);
            fileNames.push(...expandedNames);
        } else {
            fileNames.push(pattern);
        }
    });

    return fileNames;
}

/**
 * Expand glob patterns like {option1,option2}{.ext1,.ext2}
 */
function expandGlobPattern(pattern) {
    const result = [];

    // Find all brace groups
    const braceGroups = [];
    let temp = pattern;
    let match;

    while ((match = temp.match(/\{([^}]+)\}/)) !== null) {
        const options = match[1].split(",").map((s) => s.trim());
        braceGroups.push(options);
        temp = temp.replace(
            match[0],
            `__PLACEHOLDER_${braceGroups.length - 1}__`
        );
    }

    if (braceGroups.length === 0) {
        return [pattern];
    }

    // Generate all combinations
    function generateCombinations(
        template,
        groups,
        currentIndex = 0,
        currentCombination = []
    ) {
        if (currentIndex >= groups.length) {
            let result = template;
            for (let i = 0; i < currentCombination.length; i++) {
                result = result.replace(
                    `__PLACEHOLDER_${i}__`,
                    currentCombination[i]
                );
            }
            return [result];
        }

        const results = [];
        for (const option of groups[currentIndex]) {
            results.push(
                ...generateCombinations(template, groups, currentIndex + 1, [
                    ...currentCombination,
                    option,
                ])
            );
        }
        return results;
    }

    return generateCombinations(temp, braceGroups);
}

/**
 * Create themed SVG files by modifying colors for both dark and light themes
 */
function createThemedSVGs() {
    const iconsDir = join(__dirname, "..", "icons");
    const iconsDarkDir = join(__dirname, "..", "icons_dark");
    const iconsLightDir = join(__dirname, "..", "icons_light");

    // Ensure themed directories exist
    mkdirSync(iconsDarkDir, { recursive: true });
    mkdirSync(iconsLightDir, { recursive: true });

    // List of default icons to process
    const defaultIcons = [
        "file",
        "folder",
        "folder-expanded",
        "root-folder",
        "root-folder-expanded",
    ];

    // Process default icons
    defaultIcons.forEach((iconName) => {
        const originalPath = join(iconsDir, `${iconName}.svg`);
        const darkPath = join(iconsDarkDir, `${iconName}.svg`);
        const lightPath = join(iconsLightDir, `${iconName}.svg`);

        if (existsSync(originalPath)) {
            createThemedSVG(originalPath, darkPath, "dark");
            createThemedSVG(originalPath, lightPath, "light");
        }
    });

    // Process theme icons
    Object.keys(THEME).forEach((iconKey) => {
        const iconName = getIconFileName(iconKey);
        const originalPath = join(iconsDir, `${iconName}.svg`);
        const darkPath = join(iconsDarkDir, `${iconName}.svg`);
        const lightPath = join(iconsLightDir, `${iconName}.svg`);

        if (existsSync(originalPath)) {
            createThemedSVG(originalPath, darkPath, "dark");
            createThemedSVG(originalPath, lightPath, "light");
        }
    });
}

/**
 * Create a themed version of an SVG file with appropriate colors
 */
function createThemedSVG(originalPath, outputPath, theme) {
    try {
        const svgContent = readFileSync(originalPath, "utf8");
        const themeColor = THEME_COLORS[theme];

        // Replace various color formats with the theme color
        const themedSvgContent = svgContent
            // Replace currentColor with theme color
            .replace(/fill="currentColor"/g, `fill="${themeColor}"`)
            .replace(/stroke="currentColor"/g, `stroke="${themeColor}"`)
            // Replace explicit black colors
            .replace(/fill="black"/g, `fill="${themeColor}"`)
            .replace(/fill="#000000"/g, `fill="${themeColor}"`)
            .replace(/fill="#000"/g, `fill="${themeColor}"`)
            .replace(/stroke="black"/g, `stroke="${themeColor}"`)
            .replace(/stroke="#000000"/g, `stroke="${themeColor}"`)
            .replace(/stroke="#000"/g, `stroke="${themeColor}"`)
            // Replace any existing theme colors to ensure consistency
            .replace(/fill="#7b7d84"/g, `fill="${themeColor}"`)
            .replace(/fill="#62646a"/g, `fill="${themeColor}"`)
            .replace(/stroke="#7b7d84"/g, `stroke="${themeColor}"`)
            .replace(/stroke="#62646a"/g, `stroke="${themeColor}"`)
            // Handle other common dark colors based on brightness
            .replace(/fill="#[0-9a-fA-F]{6}"/g, (match) => {
                const color = match.match(/#([0-9a-fA-F]{6})/)[1];
                const r = parseInt(color.substr(0, 2), 16);
                const g = parseInt(color.substr(2, 2), 16);
                const b = parseInt(color.substr(4, 2), 16);
                const brightness = (r * 299 + g * 587 + b * 114) / 1000;

                // Replace dark colors (brightness < 128) with theme color
                if (brightness < 128) {
                    return `fill="${themeColor}"`;
                }
                return match;
            })
            // Handle stroke colors similarly
            .replace(/stroke="#[0-9a-fA-F]{6}"/g, (match) => {
                const color = match.match(/#([0-9a-fA-F]{6})/)[1];
                const r = parseInt(color.substr(0, 2), 16);
                const g = parseInt(color.substr(2, 2), 16);
                const b = parseInt(color.substr(4, 2), 16);
                const brightness = (r * 299 + g * 587 + b * 114) / 1000;

                if (brightness < 128) {
                    return `stroke="${themeColor}"`;
                }
                return match;
            });

        writeFileSync(outputPath, themedSvgContent, "utf8");
        console.log(`✅ Created ${theme} theme SVG: ${outputPath}`);
    } catch (error) {
        console.warn(
            `⚠️  Could not create ${theme} theme for ${originalPath}:`,
            error.message
        );
    }
}

/**
 * Main function to generate and save the icon theme
 */
function main() {
    try {
        console.log("🎨 Generating VS Code icon theme...");

        // First, create themed SVG files for both dark and light
        console.log("� Creating themed SVG files for dark and light modes...");
        createThemedSVGs();

        const iconTheme = generateIconTheme();
        const outputPath = join(
            __dirname,
            "..",
            "theme",
            "glyph-mod-icon-theme.json"
        );

        // Ensure output directory exists
        mkdirSync(dirname(outputPath), { recursive: true });

        // Write the icon theme JSON
        writeFileSync(outputPath, JSON.stringify(iconTheme, null, 2), "utf8");

        console.log("✅ Icon theme generated successfully!");
        console.log(`📁 Output: ${outputPath}`);
        console.log(
            `🎯 Icons processed: ${
                Object.keys(iconTheme.iconDefinitions).length
            }`
        );
        console.log(
            `📄 File extensions: ${
                Object.keys(iconTheme.fileExtensions).length
            }`
        );
        console.log(
            `📝 File names: ${Object.keys(iconTheme.fileNames).length}`
        );
        console.log(
            `🔤 Language IDs: ${Object.keys(iconTheme.languageIds).length}`
        );
    } catch (error) {
        console.error("❌ Error generating icon theme:", error);
        process.exit(1);
    }
}

// Run if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}
