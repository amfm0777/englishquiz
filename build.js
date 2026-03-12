const fs = require('fs');
const path = require('path');

// Arguments handling
const args = process.argv.slice(2);
const lang = args[0] || 'en'; // Default to English if no flag

console.log(`\n=========================================`);
console.log(`Building language version: ${lang.toUpperCase()}`);
console.log(`=========================================\n`);

const wwwDir = path.join(__dirname, 'www');

// Define language configurations
const configs = {
    en: {
        appName: 'English Quiz - Aprende Inglés',
        appTitle: 'English<span>Quiz</span>',
        flag: '🇬🇧',
        dictFile: 'dictionary_en.js',
        phonemesFile: 'phonemes_en.js',
        androidId: 'com.amfm0777.englishquiz',
        androidName: 'EnglishQuiz',
        iconFile: 'icon-512.png'
    },
    fr: {
        appName: 'French Quiz - Apprends le Français',
        appTitle: 'French<span>Quiz</span>',
        flag: '🇫🇷',
        dictFile: 'dictionary_fr.js',
        phonemesFile: 'phonemes_fr.js',
        androidId: 'com.amfm0777.englishquiz.fr',
        androidName: 'FrenchQuiz',
        iconFile: 'icon-frances-512.png'
    }
};

const config = configs[lang];

if (!config) {
    console.error(`❌ Error: Language '${lang}' is not supported. Use 'en' or 'fr'.`);
    process.exit(1);
}

// 1. Copy Dictionary
const sourceDict = path.join(wwwDir, config.dictFile);
const targetDict = path.join(wwwDir, 'dictionary.js');
try {
    fs.copyFileSync(sourceDict, targetDict);
    console.log(`[OK] Copied ${config.dictFile} to dictionary.js`);
} catch (e) {
    console.error(`❌ Error copying dictionary: ${e.message}`);
}

// 2. Copy Phonemes
const sourcePhonemes = path.join(wwwDir, config.phonemesFile);
const targetPhonemes = path.join(wwwDir, 'phonemes.js');
try {
    fs.copyFileSync(sourcePhonemes, targetPhonemes);
    console.log(`[OK] Copied ${config.phonemesFile} to phonemes.js`);
} catch (e) {
    console.error(`❌ Error copying phonemes: ${e.message}`);
}

// 3. Update index.html
const indexHtmlPath = path.join(wwwDir, 'index.html');
try {
    let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

    // We use Regex to reset/replace dynamically so we don't need a static template file
    // Replace Title Tag
    indexHtml = indexHtml.replace(/<title>.*?<\/title>/, `<title>${config.appName}</title>`);

    // Replace Header H1 (Flag + App Name text)
    indexHtml = indexHtml.replace(/<div class="header">\s*<h1>.*?<\/h1>/, `<div class="header">\n      <h1>${config.flag} ${config.appName.split(' - ')[0]}</h1>`);

    // Replace Logo String (Flag)
    indexHtml = indexHtml.replace(/<div class="logo">.*?<\/div>/, `<div class="logo">${config.flag}</div>`);

    // Replace App Title formatting H1 (Red/Blue text)
    indexHtml = indexHtml.replace(/<h1 class="app-title">.*?<\/h1>/, `<h1 class="app-title">${config.appTitle}</h1>`);

    fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
    console.log(`[OK] Updated index.html for ${lang.toUpperCase()}`);

} catch (e) {
    console.error(`❌ Error updating index.html: ${e.message}`);
}

// 4. Update Android Configuration (To avoid overwriting apps)
const buildGradlePath = path.join(__dirname, 'android', 'app', 'build.gradle');
const stringsXmlPath = path.join(__dirname, 'android', 'app', 'src', 'main', 'res', 'values', 'strings.xml');

try {
    if (fs.existsSync(buildGradlePath)) {
        let gradleContent = fs.readFileSync(buildGradlePath, 'utf8');
        gradleContent = gradleContent.replace(/applicationId\s+"com\.amfm0777\.englishquiz(\.fr)?"/g, `applicationId "${config.androidId}"`);
        gradleContent = gradleContent.replace(/namespace\s*=\s*"com\.amfm0777\.englishquiz(\.fr)?"/g, `namespace = "com.amfm0777.englishquiz"`); // Keep namespace clean to avoid R class errors
        fs.writeFileSync(buildGradlePath, gradleContent, 'utf8');
        console.log(`[OK] Updated build.gradle with ID: ${config.androidId}`);
    }

    if (fs.existsSync(stringsXmlPath)) {
        let stringsContent = fs.readFileSync(stringsXmlPath, 'utf8');
        stringsContent = stringsContent.replace(/<string name="app_name">.*?<\/string>/, `<string name="app_name">${config.androidName}</string>`);
        stringsContent = stringsContent.replace(/<string name="title_activity_main">.*?<\/string>/, `<string name="title_activity_main">${config.androidName}</string>`);
        // Note: Do not change package_name and custom_url_scheme in strings.xml as they are heavily tied to Capacitor's core plugins, changing App Id in gradle is enough for separate installs.
        fs.writeFileSync(stringsXmlPath, stringsContent, 'utf8');
        console.log(`[OK] Updated strings.xml with App Name: ${config.androidName}`);
    }
} catch (e) {
    console.error(`❌ Error updating Android config: ${e.message}`);
}

// 5. Update Android Icons
if (config.iconFile) {
    const sourceIcon = path.join(__dirname, 'docs', config.iconFile);
    if (fs.existsSync(sourceIcon)) {
        const mipmapFolders = ['mipmap-mdpi', 'mipmap-hdpi', 'mipmap-xhdpi', 'mipmap-xxhdpi', 'mipmap-xxxhdpi'];
        let iconsUpdated = false;

        mipmapFolders.forEach(folder => {
            const targetDir = path.join(__dirname, 'android', 'app', 'src', 'main', 'res', folder);
            if (fs.existsSync(targetDir)) {
                try {
                    fs.copyFileSync(sourceIcon, path.join(targetDir, 'ic_launcher.png'));
                    fs.copyFileSync(sourceIcon, path.join(targetDir, 'ic_launcher_round.png'));
                    fs.copyFileSync(sourceIcon, path.join(targetDir, 'ic_launcher_foreground.png'));
                    iconsUpdated = true;
                } catch (e) {
                    console.error(`❌ Error copying icon to ${folder}: ${e.message}`);
                }
            }
        });

        if (iconsUpdated) {
            console.log(`[OK] Updated Android icons using ${config.iconFile}`);
        }
    } else {
        console.error(`❌ Error: Icon file not found at ${sourceIcon}`);
    }
}

console.log(`\n✅ Build completed successfully for ${lang.toUpperCase()}!\n`);
