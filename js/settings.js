Object.assign(App, {
    showInfoModal(title, text) {
        document.getElementById('info-modal-title').textContent = title;
        document.getElementById('info-modal-text').textContent = text;
        document.getElementById('info-modal').classList.remove('hidden');
    },

    hideInfoModal() {
        document.getElementById('info-modal').classList.add('hidden');
    },

    showDangerModal(title, text, confirmLabel, onConfirm) {
        document.getElementById('danger-modal-title').textContent = title;
        document.getElementById('danger-modal-text').textContent = text;
        const btn = document.getElementById('danger-modal-confirm');
        btn.textContent = confirmLabel;
        btn.onclick = () => {
            this.hideDangerModal();
            onConfirm();
        };
        document.getElementById('danger-modal').classList.remove('hidden');
    },

    hideDangerModal() {
        document.getElementById('danger-modal').classList.add('hidden');
    },

    openSettings() {
        const langSelect = document.getElementById('lang-select');
        if (langSelect && typeof I18n !== 'undefined') {
            langSelect.value = I18n.currentLang;
        }
        const soundToggle = document.getElementById('toggle-sound');
        if (soundToggle && typeof SoundManager !== 'undefined') {
            soundToggle.classList.toggle('active', SoundManager.soundEnabled);
            soundToggle.setAttribute('aria-checked', SoundManager.soundEnabled);
        }
        const speechToggle = document.getElementById('toggle-speech');
        if (speechToggle && typeof SoundManager !== 'undefined') {
            speechToggle.classList.toggle('active', SoundManager.speechEnabled);
            speechToggle.setAttribute('aria-checked', SoundManager.speechEnabled);
        }
        const darkToggle = document.getElementById('toggle-dark');
        if (darkToggle) {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            darkToggle.classList.toggle('active', isDark);
            darkToggle.setAttribute('aria-checked', isDark);
        }
        this.showScreen('settings');
        if (!this.screens.settings) {
            this.screens.settings = document.getElementById('settings-screen');
        }
    },

    toggleSound() {
        if (typeof SoundManager === 'undefined') return;
        SoundManager.setEnabled(!SoundManager.soundEnabled);
        const toggle = document.getElementById('toggle-sound');
        toggle.classList.toggle('active', SoundManager.soundEnabled);
        toggle.setAttribute('aria-checked', SoundManager.soundEnabled);
        if (SoundManager.soundEnabled) SoundManager.playClick();
    },

    toggleSpeech() {
        if (typeof SoundManager === 'undefined') return;
        SoundManager.setSpeechEnabled(!SoundManager.speechEnabled);
        const toggle = document.getElementById('toggle-speech');
        toggle.classList.toggle('active', SoundManager.speechEnabled);
        toggle.setAttribute('aria-checked', SoundManager.speechEnabled);
    },

    toggleDarkMode() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        try { localStorage.setItem('mentalMathTheme', newTheme); } catch(e) {}
        const toggle = document.getElementById('toggle-dark');
        toggle.classList.toggle('active', !isDark);
        toggle.setAttribute('aria-checked', !isDark);
    },

    changeLang(lang) {
        if (typeof I18n !== 'undefined') {
            I18n.setLang(lang);
        }
    },

    confirmResetProgress() {
        this.showDangerModal(
            'Resetiraj napredak',
            'Jesi li siguran/na? Sav napredak će biti izbrisan!',
            'Izbriši',
            () => {
                try { localStorage.removeItem('mentalMathProgress'); } catch(e) {}
                PHASES.forEach((phase, i) => {
                    phase.completed = 0;
                    phase.stars = 0;
                    phase.unlocked = i === 0;
                    phase.learned = false;
                });
                this.dailyCompleted = false;
                this.lastDailyDate = null;
                this.renderPhases();
                this.updateHeaderStats();
                if (typeof SoundManager !== 'undefined') SoundManager.playClick();
            }
        );
    },

    exportProgress() {
        try {
            const data = localStorage.getItem('mentalMathProgress');
            if (!data) { this.showInfoModal('Napredak', 'Nema spremljenog napretka.'); return; }
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'mental-math-progress.json';
            a.click();
            URL.revokeObjectURL(url);
        } catch(e) {}
    },

    initDarkMode() {
        try {
            const saved = localStorage.getItem('mentalMathTheme');
            if (saved === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else if (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.setAttribute('data-theme', 'dark');
            }
        } catch(e) {}
    }
});
