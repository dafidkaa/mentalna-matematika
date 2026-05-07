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
                const hr = this.translations['hr'];
                let fallback = hr;
                for (const fk of keys) {
                    if (fallback && fallback[fk] !== undefined) {
                        fallback = fallback[fk];
                    } else {
                        return key;
                    }
                }
                return fallback;
            }
        }
        return obj;
    },

    async setLang(lang) {
        if (this.supportedLangs[lang]) {
            this.currentLang = lang;
            localStorage.setItem('mentalMathLang', lang);
            await this.loadTranslations(lang);
            this.applyToDOM();
            if (typeof App !== 'undefined') {
                App.renderPhases();
                App.updateHeaderStats();
            }
        }
    },

    applyToDOM() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const val = this.t(key);
            if (val && val !== key) el.textContent = val;
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const val = this.t(key);
            if (val && val !== key) el.placeholder = val;
        });
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.getAttribute('data-i18n-html');
            const val = this.t(key);
            if (val && val !== key) el.innerHTML = val;
        });
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            const val = this.t(key);
            if (val && val !== key) el.title = val;
        });
        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            const key = el.getAttribute('data-i18n-aria');
            const val = this.t(key);
            if (val && val !== key) el.setAttribute('aria-label', val);
        });
        document.documentElement.lang = this.currentLang;
    },

    getCurrentLang() {
        return this.currentLang;
    },

    getLangName(code) {
        return this.supportedLangs[code] || code;
    }
};
