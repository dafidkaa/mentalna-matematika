const I18n = {
    currentLang: 'hr',
    supportedLangs: {
        hr: 'Hrvatski',
        en: 'English',
        de: 'Deutsch',
        it: 'Italiano',
        es: 'Español',
        hu: 'Magyar',
        sr: 'Srpski',
        bs: 'Bosanski'
    },
    translations: {},

    async init() {
        const saved = localStorage.getItem('mentalMathLang');
        if (saved && this.supportedLangs[saved]) {
            this.currentLang = saved;
        } else {
            const browserLang = navigator.language.split('-')[0];
            if (this.supportedLangs[browserLang]) {
                this.currentLang = browserLang;
            }
        }

        await this.loadTranslations(this.currentLang);
        if (this.currentLang !== 'hr') {
            await this.loadTranslations('hr');
        }
    },

    async loadTranslations(lang) {
        if (this.translations[lang]) return;
        try {
            const res = await fetch(`locales/${lang}.json`);
            if (res.ok) {
                this.translations[lang] = await res.json();
            }
        } catch (e) {
            console.warn(`Failed to load translations for ${lang}:`, e);
        }
    },

    t(key) {
        const keys = key.split('.');
        let obj = this.translations[this.currentLang];
        if (!obj) obj = this.translations['hr'];
        for (const k of keys) {
            if (obj && obj[k] !== undefined) {
                obj = obj[k];
            } else {
                return key;
            }
        }
        return obj;
    },

    async setLang(lang) {
        if (this.supportedLangs[lang]) {
            this.currentLang = lang;
            localStorage.setItem('mentalMathLang', lang);
            await this.loadTranslations(lang);
        }
    },

    getCurrentLang() {
        return this.currentLang;
    },

    getLangName(code) {
        return this.supportedLangs[code] || code;
    }
};
