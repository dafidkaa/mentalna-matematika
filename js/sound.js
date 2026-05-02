const SoundManager = {
    audioCtx: null,
    soundEnabled: true,
    speechEnabled: false,

    init() {
        try {
            const saved = localStorage.getItem('mentalMathSound');
            if (saved !== null) this.soundEnabled = saved === 'true';
            const savedSpeech = localStorage.getItem('mentalMathSpeech');
            if (savedSpeech !== null) this.speechEnabled = savedSpeech === 'true';
        } catch (e) {}
    },

    getContext() {
        if (!this.audioCtx) {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        return this.audioCtx;
    },

    setEnabled(enabled) {
        this.soundEnabled = enabled;
        try { localStorage.setItem('mentalMathSound', enabled); } catch (e) {}
    },

    setSpeechEnabled(enabled) {
        this.speechEnabled = enabled;
        try { localStorage.setItem('mentalMathSpeech', enabled); } catch (e) {}
    },

    playTone(frequency, duration, type = 'sine', volume = 0.3) {
        if (!this.soundEnabled) return;
        try {
            const ctx = this.getContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(frequency, ctx.currentTime);
            gain.gain.setValueAtTime(volume, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + duration);
        } catch (e) {}
    },

    playCorrect() {
        if (!this.soundEnabled) return;
        this.playTone(523.25, 0.15, 'sine', 0.25);
        setTimeout(() => this.playTone(659.25, 0.2, 'sine', 0.25), 100);
        setTimeout(() => this.playTone(783.99, 0.3, 'sine', 0.2), 200);
    },

    playWrong() {
        if (!this.soundEnabled) return;
        this.playTone(311.13, 0.3, 'triangle', 0.15);
    },

    playClick() {
        if (!this.soundEnabled) return;
        this.playTone(800, 0.05, 'sine', 0.1);
    },

    playStar() {
        if (!this.soundEnabled) return;
        this.playTone(880, 0.1, 'sine', 0.2);
        setTimeout(() => this.playTone(1108.73, 0.1, 'sine', 0.2), 80);
        setTimeout(() => this.playTone(1318.51, 0.15, 'sine', 0.15), 160);
    },

    playAchievement() {
        if (!this.soundEnabled) return;
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 0.2, 'sine', 0.2), i * 120);
        });
    },

    playTimerWarning() {
        if (!this.soundEnabled) return;
        this.playTone(440, 0.15, 'square', 0.1);
    },

    playConfetti() {
        if (!this.soundEnabled) return;
        this.playTone(600, 0.1, 'sine', 0.15);
        setTimeout(() => this.playTone(900, 0.15, 'sine', 0.15), 100);
    },

    speak(text, lang = 'hr') {
        if (!this.speechEnabled) return;
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        utterance.volume = 0.8;
        window.speechSynthesis.speak(utterance);
    },

    speakQuestion(questionText) {
        const clean = questionText.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        const lang = (typeof I18n !== 'undefined') ? I18n.currentLang : 'hr';
        this.speak(clean, lang);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    SoundManager.init();
});
