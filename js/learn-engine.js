// LEARN ENGINE - Learn mode navigation and interactivity

Object.assign(App, {

    startLearn() {
        const phase = PHASES[this.currentPhase];
        document.getElementById('learn-phase-title').textContent = phase.title;
        
        // Generate learn steps based on phase
        this.learnSteps = this.generateLearnSteps(this.currentPhase);
        this.currentLearnStep = 0;
        
        document.getElementById('learn-step-total').textContent = this.learnSteps.length;
        
        this.showScreen('learn');
        this.renderLearnStep();
    },

    renderLearnStep() {
        if (typeof this._basketCleanup === 'function') {
            this._basketCleanup();
            this._basketCleanup = null;
        }
        const step = this.learnSteps[this.currentLearnStep];
        const total = this.learnSteps.length;

        // Update progress bar
        const pct = ((this.currentLearnStep + 1) / total) * 100;
        document.getElementById('learn-progress-fill').style.width = `${pct}%`;
        document.getElementById('learn-step-num').textContent = this.currentLearnStep + 1;
        document.getElementById('learn-step-total').textContent = total;

        // Render progress dots
        const dotsContainer = document.getElementById('learn-progress-dots');
        dotsContainer.innerHTML = '';
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('div');
            dot.className = 'learn-progress-dot';
            if (i < this.currentLearnStep) dot.classList.add('completed');
            else if (i === this.currentLearnStep) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        }

        // Show/hide buttons
        document.getElementById('learn-btn-prev').style.display = this.currentLearnStep > 0 ? 'inline-flex' : 'none';
        document.getElementById('learn-btn-next').style.display = this.currentLearnStep < total - 1 ? 'inline-flex' : 'none';
        document.getElementById('learn-btn-finish').style.display = this.currentLearnStep === total - 1 ? 'inline-flex' : 'none';

        // Render content with animation reset
        const card = document.getElementById('learn-card');
        card.style.animation = 'none';
        void card.offsetHeight; // trigger reflow
        card.innerHTML = `
            <h3><span class="step-number-badge">${this.currentLearnStep + 1}</span>${step.title}</h3>
            ${step.html}
        `;
        card.style.animation = '';

        // Attach interactivity
        this.attachLearnInteractivity(step.interactiveType);
    },

    attachLearnInteractivity(type) {
        if (!type) return;

        // Number line interaction
        if (type === 'numberLine') {
            const tiles = document.querySelectorAll('.learn-num-tile[data-answer]');
            tiles.forEach(tile => {
                tile.addEventListener('click', () => {
                    const answer = parseInt(tile.dataset.answer);
                    const correct = parseInt(tile.dataset.correct);
                    tiles.forEach(t => t.classList.remove('selected'));
                    tile.classList.add('selected');
                    if (answer === correct) {
                        setTimeout(() => {
                            tile.classList.remove('selected');
                            tile.classList.add('correct');
                            this.showMiniFeedback(true, 'Točno! 🎉');
                        }, 300);
                    } else {
                        setTimeout(() => {
                            tile.classList.remove('selected');
                            tile.classList.add('wrong');
                            this.showMiniFeedback(false, 'Pokušaj ponovo! 💪');
                            setTimeout(() => tile.classList.remove('wrong'), 800);
                        }, 300);
                    }
                });
            });
        }

        // Mini quiz interaction
        if (type === 'miniQuiz') {
            const quizzes = document.querySelectorAll('.learn-mini-quiz');
            quizzes.forEach(quiz => {
                const btns = quiz.querySelectorAll('.learn-mini-btn');
                btns.forEach(btn => {
                    btn.addEventListener('click', () => {
                        const answer = parseInt(btn.dataset.answer);
                        const correct = parseInt(btn.dataset.correct);
                        btns.forEach(b => {
                            b.disabled = true;
                            if (parseInt(b.dataset.answer) === correct) {
                                b.classList.add('correct');
                            }
                        });
                        if (answer === correct) {
                            btn.classList.add('correct');
                            this.showMiniFeedback(true, 'Bravo! 🌟');
                        } else {
                            btn.classList.add('wrong');
                            this.showMiniFeedback(false, `Točan odgovor je ${correct}`);
                        }
                    });
                });
            });
        }

        // Block counting interaction
        if (type === 'countBlocks') {
            const blocks = document.querySelectorAll('.learn-block-interactive');
            let count = 0;
            blocks.forEach((block, idx) => {
                block.addEventListener('click', () => {
                    if (block.classList.contains('popped')) return;
                    block.classList.add('popped');
                    count++;
                    const target = parseInt(block.parentElement.dataset.target);
                    if (count === target) {
                        this.showMiniFeedback(true, `Bravo! ${count} kocaka! 🎉`);
                    }
                });
            });
        }

        // Finger counting
        if (type === 'fingers') {
            const fingerGroups = document.querySelectorAll('.learn-fingers');
            fingerGroups.forEach(group => {
                const fingers = group.querySelectorAll('.learn-finger');
                const target = parseInt(group.dataset.target);
                fingers.forEach((f, i) => {
                    f.addEventListener('click', () => {
                        fingers.forEach((finger, idx) => {
                            if (idx <= i) finger.classList.add('active');
                            else finger.classList.remove('active');
                        });
                        if (i + 1 === target) {
                            this.showMiniFeedback(true, `Točno! ${i + 1} prsta! 👏`);
                        }
                    });
                });
            });
        }

        // Basket drag-and-drop game (Phase 3)
        if (type === 'basketGame') {
            this.initBasketGame();
        }
    },

    showMiniFeedback(isCorrect, text) {
        let fb = document.getElementById('learn-mini-feedback');
        if (!fb) {
            fb = document.createElement('div');
            fb.id = 'learn-mini-feedback';
            fb.className = 'learn-mini-feedback';
            document.getElementById('learn-card').appendChild(fb);
        }
        fb.textContent = text;
        fb.style.color = isCorrect ? 'var(--color-success)' : 'var(--color-error)';
        fb.style.animation = 'fadeIn 0.3s ease';
        if (isCorrect) {
            setTimeout(() => {
                fb.style.animation = 'fadeOut 0.5s ease forwards';
            }, 1500);
        }
    },
    
    nextLearnStep() {
        if (this.currentLearnStep < this.learnSteps.length - 1) {
            this.currentLearnStep++;
            this.renderLearnStep();
        }
    },
    
    prevLearnStep() {
        if (this.currentLearnStep > 0) {
            this.currentLearnStep--;
            this.renderLearnStep();
        }
    },
    
    finishLearn() {
        // Mark phase as learned
        const phase = PHASES[this.currentPhase];
        phase.learned = true;
        this.saveProgress();
        
        this.fireConfetti();
        setTimeout(() => {
            // After learning, show the phase screen with all game modes
            this.openPhase(this.currentPhase);
        }, 800);
    },
    
    quitLearn() {
        if (typeof this._basketCleanup === 'function') {
            this._basketCleanup();
            this._basketCleanup = null;
        }
        this.showScreen('phase');
    },

});
