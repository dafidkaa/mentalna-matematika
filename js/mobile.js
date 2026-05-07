// ==============================
// MOBILE & TOUCH ENHANCEMENTS
// Swipe gestures, touch targets,
// orientation handling, tablet
// ==============================

const MobileEnhancements = {
    touchStartX: 0,
    touchStartY: 0,
    touchEndX: 0,
    touchEndY: 0,
    minSwipeDistance: 50,
    maxSwipeTime: 500,
    touchStartTime: 0,
    isSwiping: false,

    init() {
        this._debouncedOrientationChange = this.debounce(this.handleOrientationChange.bind(this), 250);
        this.addSwipeZones();
        this.setupSwipeListeners();
        this.setupOrientationListener();
        this.enhanceTouchTargets();
        this.setupScrollSnapping();
    },

    // ---------- SWIPE ZONES ----------
    addSwipeZones() {
        const screens = ['quiz-screen', 'learn-screen'];
        screens.forEach(id => {
            const screen = document.getElementById(id);
            if (!screen) return;

            // Avoid duplicates
            if (screen.querySelector('.swipe-zone')) return;

            const leftZone = document.createElement('div');
            leftZone.className = 'swipe-zone swipe-zone-left';
            leftZone.setAttribute('aria-hidden', 'true');
            leftZone.setAttribute('role', 'none');

            const rightZone = document.createElement('div');
            rightZone.className = 'swipe-zone swipe-zone-right';
            rightZone.setAttribute('aria-hidden', 'true');
            rightZone.setAttribute('role', 'none');

            // Prepend so they're behind content
            screen.insertBefore(leftZone, screen.firstChild);
            screen.insertBefore(rightZone, screen.firstChild);
        });
    },

    // ---------- SWIPE DETECTION ----------
    setupSwipeListeners() {
        const app = document.getElementById('app');
        if (!app) return;

        app.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        app.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
        app.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: true });
    },

    handleTouchStart(e) {
        this.touchStartX = e.changedTouches[0].screenX;
        this.touchStartY = e.changedTouches[0].screenY;
        this.touchStartTime = Date.now();
        this.isSwiping = true;
    },

    handleTouchMove(e) {
        if (!this.isSwiping) return;
        // Could add visual swipe indicator here
    },

    handleTouchEnd(e) {
        if (!this.isSwiping) return;
        this.isSwiping = false;

        const elapsed = Date.now() - this.touchStartTime;
        if (elapsed > this.maxSwipeTime) return;

        this.touchEndX = e.changedTouches[0].screenX;
        this.touchEndY = e.changedTouches[0].screenY;

        const deltaX = this.touchEndX - this.touchStartX;
        const deltaY = this.touchEndY - this.touchStartY;
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);

        // Only horizontal swipes
        if (absX < this.minSwipeDistance || absY > absX * 0.8) return;

        if (deltaX < 0) {
            this.onSwipeLeft();
        } else {
            this.onSwipeRight();
        }
    },

    isVisible(el) {
        if (!el) return false;
        if (el.classList.contains('hidden')) return false;
        if (el.style.display === 'none') return false;
        if (el.offsetParent === null) return false;
        return true;
    },

    onSwipeLeft() {
        // Swipe left = next (like turning a page)
        const activeScreen = document.querySelector('.screen.active');
        if (!activeScreen) return;

        if (activeScreen.id === 'quiz-screen') {
            const nextBtn = document.getElementById('btn-next');
            if (this.isVisible(nextBtn)) {
                nextBtn.click();
            } else {
                const submitBtn = document.getElementById('btn-submit');
                if (this.isVisible(submitBtn)) {
                    submitBtn.click();
                }
            }
        } else if (activeScreen.id === 'learn-screen') {
            const nextBtn = document.getElementById('learn-btn-next');
            if (this.isVisible(nextBtn)) {
                nextBtn.click();
            } else {
                const finishBtn = document.getElementById('learn-btn-finish');
                if (this.isVisible(finishBtn)) {
                    finishBtn.click();
                }
            }
        }
    },

    onSwipeRight() {
        // Swipe right = previous / back
        const activeScreen = document.querySelector('.screen.active');
        if (!activeScreen) return;

        if (activeScreen.id === 'quiz-screen') {
            // In quiz: show confirm modal or go back
            const backBtn = activeScreen.querySelector('.btn-back');
            if (backBtn) backBtn.click();
        } else if (activeScreen.id === 'learn-screen') {
            const prevBtn = document.getElementById('learn-btn-prev');
            if (this.isVisible(prevBtn)) {
                prevBtn.click();
            } else {
                const backBtn = activeScreen.querySelector('.btn-back');
                if (backBtn) backBtn.click();
            }
        }
    },

    // ---------- ORIENTATION ----------
    setupOrientationListener() {
        if (window.screen && window.screen.orientation) {
            window.screen.orientation.addEventListener('change', () => {
                this.handleOrientationChange();
            });
        }
        // Fallback
        window.addEventListener('resize', this._debouncedOrientationChange);
    },

    handleOrientationChange() {
        const isLandscape = window.innerWidth > window.innerHeight;
        const isPortrait = !isLandscape;
        const isTablet = window.innerWidth >= 600 && window.innerWidth <= 1024;

        document.body.classList.toggle('orientation-landscape', isLandscape);
        document.body.classList.toggle('orientation-portrait', isPortrait);
        document.body.classList.toggle('device-tablet', isTablet);

        // Adjust any dynamic layouts if needed
        if (isLandscape && window.innerHeight < 500) {
            // Compact mode already handled by CSS
        }
    },

    // ---------- TOUCH TARGET ENHANCEMENTS ----------
    enhanceTouchTargets() {
        // Ensure all interactive elements have adequate touch targets
        const interactiveSelectors = [
            '.btn', '.mode-card', '.phase-card', '.option-btn',
            '.match-item', '.apple', '.basket', '.info-card',
            '.daily-challenge-card', '.stat-badge'
        ];

        interactiveSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.width < 44 || rect.height < 44) {
                    el.style.minWidth = '44px';
                    el.style.minHeight = '44px';
                }
            });
        });
    },

    // ---------- SCROLL SNAPPING ----------
    setupScrollSnapping() {
        // Enable smooth scroll snap for horizontal phase lists in landscape
        const grids = document.querySelectorAll('.phases-grid');
        grids.forEach(grid => {
            grid.style.scrollSnapType = 'x mandatory';
            grid.style.webkitOverflowScrolling = 'touch';
        });
    },

    // ---------- UTILITY ----------
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    MobileEnhancements.init();
});
