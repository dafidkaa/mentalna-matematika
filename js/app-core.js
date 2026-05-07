const App = {
    currentPhase: null,
    currentMode: null,
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    streak: 0,
    bestStreak: 0,
    timer: null,
    timeLeft: 0,
    answers: {},
    matchedPairs: [],
    selectedMatch: null,
    dailyCompleted: false,
    lastDailyDate: null,
    learnSteps: [],
    currentLearnStep: 0,
    screens: {},

    init() {
        this.screens = {
            splash: document.getElementById('splash-screen'),
            home: document.getElementById('home-screen'),
            phase: document.getElementById('phase-screen'),
            quiz: document.getElementById('quiz-screen'),
            results: document.getElementById('results-screen'),
            learn: document.getElementById('learn-screen'),
            settings: document.getElementById('settings-screen'),
            dashboard: document.getElementById('dashboard-screen')
        };

        this.loadProgress();
        if (typeof I18n !== 'undefined') I18n.applyToDOM();
        this.startSplash();
        this.setupEventListeners();
        this.renderPhases();
        this.updateHeaderStats();
        this.initDarkMode();

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').catch(() => {});
        }
    },

    startSplash() {
        setTimeout(() => {
            this.showScreen('home');
        }, 2500);
    },

    showScreen(name) {
        Object.values(this.screens).forEach(s => s.classList.remove('active'));
        this.screens[name].classList.add('active');
    },

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (!this.screens.quiz.classList.contains('active')) return;

            if (e.key === 'Enter') {
                const btnSubmit = document.getElementById('btn-submit');
                const btnNext = document.getElementById('btn-next');
                const submitVisible = btnSubmit && btnSubmit.style.display !== 'none';
                const nextVisible = btnNext && btnNext.style.display !== 'none';
                if (submitVisible) {
                    this.submitAnswer();
                } else if (nextVisible) {
                    this.nextQuestion();
                }
            }
        });
    },

    renderPhases() {
        const grid = document.getElementById('phases-grid');
        grid.innerHTML = '';
        const t = (key) => typeof I18n !== 'undefined' ? I18n.t(key) : key;

        PHASES.forEach((phase, index) => {
            const card = document.createElement('div');
            card.className = `phase-card ${phase.unlocked ? '' : 'locked'}`;

            const progress = Math.min(100, (phase.completed / phase.total) * 100);
            const phaseTitle = t(`phaseData.${index + 1}.title`) || phase.title;
            const phaseSubtitle = t(`phaseData.${index + 1}.subtitle`) || phase.subtitle;

            card.innerHTML = `
                <div class="phase-card-header">
                    <div class="phase-number" style="background: ${phase.color}">${phase.id}</div>
                    <div class="phase-card-title">${phaseTitle}</div>
                </div>
                <div class="phase-card-desc">${phaseSubtitle}</div>
                <div class="phase-card-footer">
                    <div class="phase-stars">
                        ${[1,2,3].map(i => `<span class="star ${i <= phase.stars ? 'earned' : ''}">★</span>`).join('')}
                    </div>
                    <span class="phase-progress">${phase.completed}/${phase.total}</span>
                </div>
                ${!phase.unlocked ? '<div class="phase-lock">🔒</div>' : ''}
            `;

            if (phase.unlocked) {
                card.addEventListener('click', () => this.openPhase(index));
            }

            grid.appendChild(card);
        });

        this.updateDailyChallenge();
    },

    updateDailyChallenge() {
        const today = new Date().toDateString();
        const card = document.getElementById('daily-challenge');
        const t = (key) => typeof I18n !== 'undefined' ? I18n.t(key) : key;

        if (this.lastDailyDate === today && this.dailyCompleted) {
            card.querySelector('h3').textContent = t('home.dailyDone');
            card.querySelector('p').textContent = t('home.dailyDoneDesc');
            card.querySelector('button').disabled = true;
            card.querySelector('button span').textContent = t('home.done');
            card.style.opacity = '0.7';
        }
    },

    updateHeaderStats() {
        const totalStars = PHASES.reduce((sum, p) => sum + p.stars, 0);
        document.getElementById('total-stars').textContent = totalStars;
        document.getElementById('streak-count').textContent = this.streak;
    },

    openPhase(index) {
        this.currentPhase = index;
        const phase = PHASES[index];

        if (!phase.learned) {
            this.startLearn();
            return;
        }

        const t = (key) => typeof I18n !== 'undefined' ? I18n.t(key) : key;
        const pd = (key) => t(`phaseData.${index + 1}.${key}`);

        document.getElementById('phase-header-title').textContent = pd('title') || phase.title;
        document.getElementById('phase-icon').textContent = phase.icon;
        document.getElementById('phase-title').textContent = pd('title') || phase.title;
        document.getElementById('phase-subtitle').textContent = pd('subtitle') || phase.subtitle;
        document.getElementById('phase-idea').textContent = pd('idea') || phase.idea;
        document.getElementById('phase-mantra').textContent = pd('mantra') || phase.mantra;
        document.getElementById('phase-parent-tip').textContent = pd('parentTip') || phase.parentTip;

        const progress = Math.min(100, (phase.completed / phase.total) * 100);
        document.getElementById('phase-progress-bar').style.width = `${progress}%`;
        document.getElementById('phase-progress-text').textContent =
            `${phase.completed} / ${phase.total} ${t('phase.progress')}`;

        this.showScreen('phase');
    },

    goHome() {
        this.renderPhases();
        this.updateHeaderStats();
        this.showScreen('home');
    }
};
