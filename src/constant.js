export const EIcon = {
    Angular: "Angular",
    Archive: "Archive",
    Audio: "Audio",
    Braces: "Braces",
    Brackets: "Brackets",
    Camera: "Camera",
    Certificate: "Certificate",
    Commit: "Commit",
    Copyright: "Copyright",
    Database: "Database",
    Docs: "Docs",
    Document: "Document",
    Eslint: "Eslint",
    Expo: "Expo",
    File: "File",
    Fingerprint: "Fingerprint",
    FolderExpanded: "FolderExpanded",
    Folder: "Folder",
    Format: "Format",
    Gatsby: "Gatsby",
    Git: "Git",
    History: "History",
    I18n: "I18n",
    Image: "Image",
    Information: "Information",
    Javascript: "Javascript",
    Lock: "Lock",
    Merge: "Merge",
    Microsoft: "Microsoft",
    Next: "Next",
    OpenSource: "OpenSource",
    Parenthesis: "Parenthesis",
    Prisma: "Prisma",
    React: "React",
    RootFolderExpanded: "RootFolderExpanded",
    RootFolder: "RootFolder",
    Settings: "Settings",
    Shell: "Shell",
    Shield: "Shield",
    Svelte: "Svelte",
    Table: "Table",
    Tag: "Tag",
    Test: "Test",
    Triangle: "Triangle",
    Typescript: "Typescript",
    Video: "Video",
    Vue: "Vue",
};

export const THEME = {
    [EIcon.Archive]: {
        fileExtensions: "7z,br,brotli,bzip2,gz,gzip,rar,tar,tgz,xz,zip",
    },
    [EIcon.Audio]: { fileExtensions: "aiff,flac,m4a,mp3,wav,wma" },
    [EIcon.Braces]: {
        fileExtensions: "json,jsonc,json5",
        languageIds: "json,jsonc",
    },
    [EIcon.Brackets]: { fileExtensions: "htm,html,xml" },
    [EIcon.Camera]: { fileExtensions: "snap" },
    [EIcon.Certificate]: {
        fileExtensions: "cer,cert,crt",
        fileNames: "{licence,license,unlicense}{,.md,.txt}",
    },
    [EIcon.Commit]: {
        fileNames: ".gitmessage,.gitmessage.txt,commit-msg,prepare-commit-msg",
    },
    [EIcon.Copyright]: { fileNames: "authors{,.md,.txt}" },
    [EIcon.Database]: {
        fileExtensions: "graphql,json,sqlite",
        languageIds: "json,sql",
    },
    [EIcon.Docs]: { fileExtensions: "md,mdx", languageIds: "markdown" },
    [EIcon.Document]: {
        fileExtensions: "doc,docx,pdf,ppt,pptx,rtf,txt",
        fileNames: "_headers,_redirects,.htaccess,robots.txt,sitemap.xml",
    },
    [EIcon.Eslint]: {
        fileNames:
            ".eslintrc{,.js,.json,.yaml,.yml},.eslintignore,eslint.config.js",
    },
    [EIcon.Expo]: {
        fileNames: "expo.json,app.json,app.config.js,app.config.ts",
    },
    [EIcon.File]: {},
    [EIcon.Fingerprint]: {
        fileExtensions: "asc,gpg,key,pem,pub",
        fileNames: ".htpasswd",
    },
    [EIcon.FolderExpanded]: {},
    [EIcon.Folder]: {},
    [EIcon.Format]: {
        fileNames:
            ".prettierignore,.prettierrc{,.js,.json,.yaml,.yml},prettier.config.js",
    },
    [EIcon.Gatsby]: { fileNames: "gatsby-{browser,config,node,ssr}.js" },
    [EIcon.Git]: {
        fileExtensions: "patch",
        fileNames:
            ".git-history,.gitattributes,.gitconfig,.gitignore,.gitkeep,.gitmodules",
    },
    [EIcon.History]: { fileNames: "{changelog,changes}{,.md,.txt}" },
    [EIcon.I18n]: { fileExtensions: "mo,po,pot" },
    [EIcon.Image]: {
        fileExtensions:
            "bmp,eps,gif,ico,img,jpeg,jpg,png,psd,raw,svg,tif,tiff,webp",
    },
    [EIcon.Information]: {
        fileExtensions: "log",
        fileNames: "readme{,.md,.txt}",
    },
    [EIcon.Test]: {
        fileExtensions:
            "e2e-spec.js,e2e-spec.ts,spec.js,spec.ts,test.js,test.ts,test.tsx,test.jsx,spec.jsx,spec.tsx",
        // "e2e-spec.{js,ts},{js,jsx,ts,tsx}.snap,{spec,test}.{js,jsx,ts,tsx}",
    },
    [EIcon.Javascript]: {
        fileExtensions: "js,mjs,cjs",
        languageIds: "javascript,javascriptreact",
    },
    [EIcon.Lock]: { fileExtensions: "lock", fileNames: "security{,.md,.txt}" },
    [EIcon.Merge]: { fileNames: ".gitmerge,.merge_file_*,*.orig" },
    [EIcon.Microsoft]: {
        fileExtensions:
            "code-workplace,csproj,ruleset,sln,suo,vb,vbs,{vcxitems,vcxproj}{,.filters},vscodeignore,vsix,vsixmanifest",
    },
    [EIcon.OpenSource]: { fileNames: "contributing.md,credits{,.md,.txt}" },
    [EIcon.Parenthesis]: {
        fileExtensions: "cl,el,elc,fasl,l,lisp,lsp,wat",
        languageIds: "clojure",
    },
    [EIcon.Prisma]: {
        fileExtensions: "prisma",
        fileNames: "schema.prisma,prisma.schema",
    },
    [EIcon.React]: { fileExtensions: "jsx,tsx" },
    [EIcon.RootFolderExpanded]: {},
    [EIcon.RootFolder]: {},
    [EIcon.Settings]: {
        fileExtensions:
            "cfg,conf,config,dlc,dll,env{,.example},ini,option,prefs,prop,properties,props,settings,sln.dotsettings{,.user},toml",
        fileNames:
            ".buildignore,.jshintignore,.clang-{format,tidy},.mrconfig,.yardopts,manifest.mf,package.json",
        languageIds: "makefile",
    },
    [EIcon.Shell]: {
        fileExtensions: "awk,fish,tcsh,zshrc",
        languageIds: "bat,powershell,shellscript",
    },
    [EIcon.Shield]: {
        fileNames:
            ".eslintcache,.eslintignore,.eslintrc{,.cjs,.js,.json,.yaml,.yml}",
    },
    [EIcon.Svelte]: {
        fileExtensions: "svelte",
        fileNames: "svelte.config.js,svelte.config.ts",
        languageIds: "svelte",
    },
    [EIcon.Table]: { fileExtensions: "csv,tsv,xls,xlsx" },
    [EIcon.Tag]: { fileExtensions: "css,less,sass,scss,styl" },
    [EIcon.Triangle]: { fileExtensions: "delta,diff,patch" },
    [EIcon.Typescript]: {
        fileExtensions: "ts,cts,mts",
        languageIds: "typescript,typescriptreact",
    },
    [EIcon.Angular]: {
        fileNames: "angular.json,.angular-cli.json,angular-cli.json",
    },
    [EIcon.Next]: {
        fileNames: "next.config.js,next.config.ts,next.config.mjs",
    },
    [EIcon.Video]: {
        fileExtensions: "avi,m2v,m4v,mkv,mov,mp4,mpeg,mpg,mpv,webm,wmv",
    },
    [EIcon.Vue]: {
        fileExtensions: "store.{js,ts},vue",
        fileNames: "store.{js,ts},{nuxt.config,vue.config}.{js,ts}",
    },
};

const COLOR_DEFAULT = "#7b7d84";
const COLOR_LIGHT = "#62646a";

export const DEFAULT_COLOR_MAP = [
    ["default", COLOR_DEFAULT],
    ["light", COLOR_LIGHT],
];

// Color mapping for different themes
export const THEME_COLORS = {
    dark: COLOR_DEFAULT,
    light: COLOR_LIGHT,
};
