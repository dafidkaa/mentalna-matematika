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
            settings: document.getElementById('settings-screen')
        };

        this.loadProgress();
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

        PHASES.forEach((phase, index) => {
            const card = document.createElement('div');
            card.className = `phase-card ${phase.unlocked ? '' : 'locked'}`;

            const progress = Math.min(100, (phase.completed / phase.total) * 100);

            card.innerHTML = `
                <div class="phase-card-header">
                    <div class="phase-number" style="background: ${phase.color}">${phase.id}</div>
                    <div class="phase-card-title">${phase.title}</div>
                </div>
                <div class="phase-card-desc">${phase.subtitle}</div>
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

        if (this.lastDailyDate === today && this.dailyCompleted) {
            card.querySelector('h3').textContent = 'Dnevni Izazov - Dovršen!';
            card.querySelector('p').textContent = 'Vrati se sutra za novi izazov!';
            card.querySelector('button').disabled = true;
            card.querySelector('button').textContent = '✓ Gotovo';
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

        document.getElementById('phase-header-title').textContent = phase.title;
        document.getElementById('phase-icon').textContent = phase.icon;
        document.getElementById('phase-title').textContent = phase.title;
        document.getElementById('phase-subtitle').textContent = phase.subtitle;
        document.getElementById('phase-idea').textContent = phase.idea;
        document.getElementById('phase-mantra').textContent = phase.mantra;
        document.getElementById('phase-parent-tip').textContent = phase.parentTip;

        const progress = Math.min(100, (phase.completed / phase.total) * 100);
        document.getElementById('phase-progress-bar').style.width = `${progress}%`;
        document.getElementById('phase-progress-text').textContent =
            `${phase.completed} / ${phase.total} zadataka riješeno`;

        this.showScreen('phase');
    },

    goHome() {
        this.renderPhases();
        this.updateHeaderStats();
        this.showScreen('home');
    }
};
