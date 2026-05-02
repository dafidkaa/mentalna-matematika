// ==============================
// ACCESSIBILITY ENHANCEMENTS
// ARIA labels, keyboard navigation,
// live regions, focus management
// ==============================

const AccessibilityEnhancements = {
    liveRegion: null,
    isKeyboardUser: false,

    init() {
        this.createLiveRegion();
        this.setupKeyboardDetection();
        this.setupKeyboardNavigation();
        this.enhanceARIALabels();
        this.setupFocusManagement();
        this.announcePageChanges();
    },

    // ---------- LIVE REGION FOR SCREEN READERS ----------
    createLiveRegion() {
        const existing = document.getElementById('a11y-live-region');
        if (existing) return;

        const region = document.createElement('div');
        region.id = 'a11y-live-region';
        region.setAttribute('role', 'status');
        region.setAttribute('aria-live', 'polite');
        region.setAttribute('aria-atomic', 'true');
        region.className = 'sr-only';
        document.body.appendChild(region);
        this.liveRegion = region;

        // Also create assertive region for errors
        const assertive = document.createElement('div');
        assertive.id = 'a11y-live-assertive';
        assertive.setAttribute('role', 'alert');
        assertive.setAttribute('aria-live', 'assertive');
        assertive.setAttribute('aria-atomic', 'true');
        assertive.className = 'sr-only';
        document.body.appendChild(assertive);
    },

    announce(message, assertive = false) {
        const region = assertive
            ? document.getElementById('a11y-live-assertive')
            : document.getElementById('a11y-live-region');
        if (!region) return;

        // Clear then set to ensure announcement
        region.textContent = '';
        requestAnimationFrame(() => {
            region.textContent = message;
        });
    },

    // ---------- KEYBOARD DETECTION ----------
    setupKeyboardDetection() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.isKeyboardUser = true;
                document.body.classList.add('keyboard-user');
            }
        });

        document.addEventListener('mousedown', () => {
            this.isKeyboardUser = false;
            document.body.classList.remove('keyboard-user');
        });

        document.addEventListener('touchstart', () => {
            this.isKeyboardUser = false;
            document.body.classList.remove('keyboard-user');
        }, { passive: true });
    },

    // ---------- KEYBOARD NAVIGATION ----------
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            const activeScreen = document.querySelector('.screen.active');
            if (!activeScreen) return;

            switch (activeScreen.id) {
                case 'quiz-screen':
                    this.handleQuizKeyboard(e);
                    break;
                case 'learn-screen':
                    this.handleLearnKeyboard(e);
                    break;
                case 'home-screen':
                    this.handleHomeKeyboard(e);
                    break;
                case 'phase-screen':
                    this.handlePhaseKeyboard(e);
                    break;
                case 'results-screen':
                    this.handleResultsKeyboard(e);
                    break;
            }
        });
    },

    handleQuizKeyboard(e) {
        // Number keys 1-4 for option buttons
        if (e.key >= '1' && e.key <= '4') {
            const options = document.querySelectorAll('.option-btn');
            const idx = parseInt(e.key) - 1;
            if (options[idx]) {
                e.preventDefault();
                options[idx].click();
                options[idx].focus();
            }
        }

        // H for hint
        if (e.key === 'h' || e.key === 'H') {
            const hintBtn = document.getElementById('btn-hint');
            if (hintBtn && !hintBtn.classList.contains('hidden')) {
                e.preventDefault();
                hintBtn.click();
            }
        }

        // Escape to quit
        if (e.key === 'Escape') {
            const backBtn = document.querySelector('#quiz-screen .btn-back');
            if (backBtn) backBtn.click();
        }

        // Left/Right arrows for matching game
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const matchItems = document.querySelectorAll('.match-item:not(.matched)');
            if (matchItems.length > 0) {
                e.preventDefault();
                const currentFocus = document.activeElement;
                const currentIdx = Array.from(matchItems).indexOf(currentFocus);
                let nextIdx;
                if (e.key === 'ArrowRight') {
                    nextIdx = (currentIdx + 1) % matchItems.length;
                } else {
                    nextIdx = currentIdx <= 0 ? matchItems.length - 1 : currentIdx - 1;
                }
                matchItems[nextIdx].focus();
            }
        }
    },

    handleLearnKeyboard(e) {
        if (e.key === 'ArrowRight') {
            const nextBtn = document.getElementById('learn-btn-next');
            const finishBtn = document.getElementById('learn-btn-finish');
            if (nextBtn && !nextBtn.classList.contains('hidden')) {
                e.preventDefault();
                nextBtn.click();
            } else if (finishBtn && !finishBtn.classList.contains('hidden')) {
                e.preventDefault();
                finishBtn.click();
            }
        }
        if (e.key === 'ArrowLeft') {
            const prevBtn = document.getElementById('learn-btn-prev');
            if (prevBtn && !prevBtn.classList.contains('hidden')) {
                e.preventDefault();
                prevBtn.click();
            }
        }
        if (e.key === 'Escape') {
            const backBtn = document.querySelector('#learn-screen .btn-back');
            if (backBtn) backBtn.click();
        }
    },

    handleHomeKeyboard(e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            const cards = document.querySelectorAll('.phase-card, .daily-challenge-card');
            const currentFocus = document.activeElement;
            const currentIdx = Array.from(cards).indexOf(currentFocus);
            if (currentIdx >= 0) {
                e.preventDefault();
                let nextIdx;
                const cols = window.innerWidth >= 600 ? 2 : 1;
                if (e.key === 'ArrowRight') nextIdx = currentIdx + 1;
                else if (e.key === 'ArrowLeft') nextIdx = currentIdx - 1;
                else if (e.key === 'ArrowDown') nextIdx = currentIdx + cols;
                else if (e.key === 'ArrowUp') nextIdx = currentIdx - cols;

                if (nextIdx >= 0 && nextIdx < cards.length) {
                    cards[nextIdx].focus();
                }
            }
        }
    },

    handlePhaseKeyboard(e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            const cards = document.querySelectorAll('.mode-card');
            const currentFocus = document.activeElement;
            const currentIdx = Array.from(cards).indexOf(currentFocus);
            if (currentIdx >= 0) {
                e.preventDefault();
                let nextIdx;
                if (e.key === 'ArrowRight') nextIdx = currentIdx + 1;
                else if (e.key === 'ArrowLeft') nextIdx = currentIdx - 1;
                else if (e.key === 'ArrowDown') nextIdx = currentIdx + 2;
                else if (e.key === 'ArrowUp') nextIdx = currentIdx - 2;

                if (nextIdx >= 0 && nextIdx < cards.length) {
                    cards[nextIdx].focus();
                }
            }
        }
        if (e.key === 'Escape') {
            const backBtn = document.querySelector('#phase-screen .btn-back');
            if (backBtn) backBtn.click();
        }
    },

    handleResultsKeyboard(e) {
        if (e.key === 'Enter') {
            const primaryBtn = document.querySelector('#results-screen .btn-primary');
            if (primaryBtn) {
                e.preventDefault();
                primaryBtn.click();
            }
        }
        if (e.key === 'Escape') {
            const homeBtn = document.querySelector('#results-screen .btn-secondary');
            if (homeBtn) homeBtn.click();
        }
    },

    // ---------- ARIA LABELS ----------
    enhanceARIALabels() {
        // Screen landmarks
        const splash = document.getElementById('splash-screen');
        if (splash) {
            splash.setAttribute('role', 'banner');
            splash.setAttribute('aria-label', 'Učitavanje aplikacije Mentalna Matematika');
        }

        const home = document.getElementById('home-screen');
        if (home) {
            home.setAttribute('role', 'main');
            home.setAttribute('aria-label', 'Početni zaslon');
        }

        const quiz = document.getElementById('quiz-screen');
        if (quiz) {
            quiz.setAttribute('role', 'main');
            quiz.setAttribute('aria-label', 'Kviz zaslon');
        }

        const learn = document.getElementById('learn-screen');
        if (learn) {
            learn.setAttribute('role', 'main');
            learn.setAttribute('aria-label', 'Zaslon za učenje');
        }

        const results = document.getElementById('results-screen');
        if (results) {
            results.setAttribute('role', 'main');
            results.setAttribute('aria-label', 'Rezultati');
        }

        // Header stats
        document.querySelectorAll('.stat-badge').forEach((badge, i) => {
            const icon = badge.querySelector('i');
            const span = badge.querySelector('span');
            if (icon && icon.classList.contains('fa-star')) {
                badge.setAttribute('aria-label', `Ukupno zvjezdica: ${span ? span.textContent : '0'}`);
            } else if (icon && icon.classList.contains('fa-fire')) {
                badge.setAttribute('aria-label', `Niz točnih odgovora: ${span ? span.textContent : '0'}`);
            }
        });

        // Progress bars
        document.querySelectorAll('.progress-bar, .quiz-progress-fill, .learn-progress-fill').forEach(bar => {
            if (!bar.hasAttribute('role')) {
                bar.setAttribute('role', 'progressbar');
                bar.setAttribute('aria-valuemin', '0');
                bar.setAttribute('aria-valuemax', '100');
            }
        });

        // Buttons without text
        document.querySelectorAll('.btn-back').forEach(btn => {
            if (!btn.getAttribute('aria-label')) {
                btn.setAttribute('aria-label', 'Natrag');
            }
        });

        // Question card
        const questionCard = document.getElementById('question-card');
        if (questionCard) {
            questionCard.setAttribute('role', 'region');
            questionCard.setAttribute('aria-label', 'Pitanje');
        }

        // Options grid
        const optionsGrid = document.querySelector('.options-grid');
        if (optionsGrid) {
            optionsGrid.setAttribute('role', 'radiogroup');
            optionsGrid.setAttribute('aria-label', 'Odaberite odgovor');
        }

        document.querySelectorAll('.option-btn').forEach((btn, i) => {
            btn.setAttribute('role', 'radio');
            btn.setAttribute('aria-posinset', i + 1);
        });

        // Matching items
        document.querySelectorAll('.match-item').forEach(item => {
            item.setAttribute('role', 'button');
            item.setAttribute('tabindex', '0');
        });

        // Apples in basket game
        document.querySelectorAll('.apple').forEach((apple, i) => {
            apple.setAttribute('role', 'button');
            apple.setAttribute('tabindex', '0');
            apple.setAttribute('aria-grabbed', 'false');
            apple.setAttribute('aria-label', `Jabuka ${i + 1}, može se povući u košaru`);
        });

        // Basket
        document.querySelectorAll('.basket').forEach(basket => {
            basket.setAttribute('role', 'region');
            basket.setAttribute('aria-label', 'Košara za jabuke');
        });

        // Modal
        const confirmModal = document.getElementById('confirm-modal');
        if (confirmModal) {
            confirmModal.setAttribute('role', 'dialog');
            confirmModal.setAttribute('aria-modal', 'true');
            confirmModal.setAttribute('aria-labelledby', 'confirm-modal-title');
            const title = confirmModal.querySelector('h3');
            if (title) title.id = 'confirm-modal-title';
        }

        // Achievement popup
        const achievementPopup = document.getElementById('achievement-popup');
        if (achievementPopup) {
            achievementPopup.setAttribute('role', 'dialog');
            achievementPopup.setAttribute('aria-modal', 'true');
            achievementPopup.setAttribute('aria-labelledby', 'achievement-title');
        }

        // Timer
        const timer = document.getElementById('quiz-timer');
        if (timer) {
            timer.setAttribute('role', 'timer');
            timer.setAttribute('aria-live', 'off');
        }
    },

    // ---------- FOCUS MANAGEMENT ----------
    setupFocusManagement() {
        // When modal opens, trap focus inside
        const modals = document.querySelectorAll('.modal, .popup');
        modals.forEach(modal => {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'class') {
                        const isVisible = !modal.classList.contains('hidden');
                        if (isVisible) {
                            this.trapFocus(modal);
                        } else {
                            this.releaseFocus();
                        }
                    }
                });
            });
            observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
        });

        // Focus first interactive element when screen changes
        const screens = document.querySelectorAll('.screen');
        const screenObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const screen = mutation.target;
                    if (screen.classList.contains('active')) {
                        this.focusFirstInteractive(screen);
                    }
                }
            });
        });
        screens.forEach(screen => {
            screenObserver.observe(screen, { attributes: true, attributeFilter: ['class'] });
        });
    },

    trapFocus(modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        first.focus();

        modal.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        });
    },

    releaseFocus() {
        // Focus returns to trigger element (simplified)
    },

    focusFirstInteractive(screen) {
        const focusable = screen.querySelector(
            'button:not(.hidden), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable && this.isKeyboardUser) {
            setTimeout(() => focusable.focus(), 100);
        }
    },

    // ---------- PAGE CHANGE ANNOUNCEMENTS ----------
    announcePageChanges() {
        const screenNames = {
            'home-screen': 'Početni zaslon',
            'phase-screen': 'Detalji faze',
            'quiz-screen': 'Kviz',
            'learn-screen': 'Učenje',
            'results-screen': 'Rezultati',
            'splash-screen': 'Učitavanje'
        };

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const screen = mutation.target;
                    if (screen.classList.contains('active')) {
                        const name = screenNames[screen.id] || 'Novi zaslon';
                        this.announce(`${name} je otvoren`);
                    }
                }
            });
        });

        document.querySelectorAll('.screen').forEach(screen => {
            observer.observe(screen, { attributes: true, attributeFilter: ['class'] });
        });
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    AccessibilityEnhancements.init();
});
