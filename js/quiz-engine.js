// QUIZ ENGINE - Quiz logic (start, submit, finish, timer)

Object.assign(App, {
    startQuiz(mode) {
        this.currentMode = mode;
        this.score = 0;
        this.streak = 0;
        this.bestStreak = 0;
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.matchedPairs = [];
        this.selectedMatch = null;
        
        const phase = PHASES[this.currentPhase];
        const baseCount = mode === 'speed' ? 10 : (mode === 'steps' ? 5 : 10);
        const count = this.getAdaptiveQuestionCount(this.currentPhase, baseCount);
        
        this.questions = phase.generateQuestions(count);
        
        const t = (key) => typeof I18n !== 'undefined' ? I18n.t(key) : key;
        const pd = (key) => t(`phaseData.${this.currentPhase + 1}.${key}`);
        
        document.getElementById('quiz-phase-name').textContent = pd('title') || phase.title;
        document.getElementById('quiz-mode-name').textContent = 
            mode === 'practice' ? t('quiz.practice') : 
            mode === 'quiz' ? t('modes.quiz') : 
            mode === 'speed' ? t('modes.speed') : 
            mode === 'steps' ? t('quiz.stepsMode') : t('quiz.daily');
        
        document.getElementById('total-q').textContent = count;
        document.getElementById('current-q').textContent = 1;
        document.getElementById('correct-count').textContent = 0;
        document.getElementById('streak-display').textContent = 0;
        
        // Timer for speed mode
        const timerEl = document.getElementById('quiz-timer');
        if (mode === 'speed') {
            timerEl.style.display = 'flex';
            this.timeLeft = 60;
            this.updateTimer();
            this.timer = setInterval(() => {
                this.timeLeft--;
                this.updateTimer();
                if (this.timeLeft <= 0) {
                    this.finishQuiz();
                }
            }, 1000);
        } else {
            timerEl.style.display = 'none';
        }
        
        this.showScreen('quiz');
        this.renderQuestion();
    },
    
    startDailyChallenge() {
        const today = new Date().toDateString();
        const t = (key) => typeof I18n !== 'undefined' ? I18n.t(key) : key;
        if (this.lastDailyDate === today && this.dailyCompleted) {
            this.showInfoModal(t('home.dailyChallenge'), t('home.dailyDoneDesc'));
            return;
        }
        
        this.lastDailyDate = today;
        this.dailyCompleted = true;
        
        // Pick random phase that is unlocked, seeded by date
        const unlocked = PHASES.map((p, i) => i).filter(i => PHASES[i].unlocked);
        const dateSeed = today.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
        this.currentPhase = unlocked[dateSeed % unlocked.length];
        this.startQuiz('daily');
    },
    
    updateTimer() {
        const val = document.getElementById('timer-value');
        val.textContent = this.timeLeft;
        if (this.timeLeft <= 10) {
            val.style.color = 'var(--color-error)';
            if (typeof SoundManager !== 'undefined') SoundManager.playTimerWarning();
        } else {
            val.style.color = 'var(--color-primary)';
        }
    },
    
    renderQuestion() {
        const q = this.questions[this.currentQuestionIndex];
        const total = this.questions.length;
        
        // Update progress
        const pct = ((this.currentQuestionIndex) / total) * 100;
        document.getElementById('quiz-progress-fill').style.width = `${pct}%`;
        document.getElementById('current-q').textContent = this.currentQuestionIndex + 1;
        
        // Reset UI
        document.getElementById('hint-content').classList.remove('show');
        document.getElementById('feedback-area').classList.remove('show');
        document.getElementById('btn-submit').style.display = 'inline-flex';
        document.getElementById('btn-next').style.display = 'none';
        
        // Type badge
        const typeLabels = {
            fill_blank: typeof I18n !== 'undefined' ? I18n.t('quiz.fillBlank') : 'Dopuni prazninu',
            mcq: typeof I18n !== 'undefined' ? I18n.t('quiz.mcq') : 'Odaberi odgovor',
            matching: typeof I18n !== 'undefined' ? I18n.t('quiz.matching') : 'Spoji parove',
            visual: typeof I18n !== 'undefined' ? I18n.t('quiz.visual') : 'Vizualno',
            steps: typeof I18n !== 'undefined' ? I18n.t('quiz.stepsMode') : 'Korak po korak'
        };
        document.getElementById('question-type-badge').textContent = typeLabels[q.type] || 'Pitanje';
        
        // Render question content
        const contentEl = document.getElementById('question-content');
        const answerEl = document.getElementById('question-answer-area');
        
        if (q.display && q.display.includes('<span')) {
            contentEl.innerHTML = `<div class="math-expression">${q.display}</div>`;
        } else if (q.display) {
            contentEl.innerHTML = `<p>${q.question}</p><div class="math-expression">${q.display}</div>`;
        } else {
            contentEl.innerHTML = `<p>${q.question}</p>`;
        }

        if (typeof SoundManager !== 'undefined') {
            SoundManager.speakQuestion(q.question + ' ' + (q.display || ''));
        }
        
        // Render answer area based on type
        answerEl.innerHTML = '';
        
        // Scroll to the top of the question card smoothly
        setTimeout(() => {
            const card = document.getElementById('question-card');
            if(card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
        
        switch(q.type) {
            case 'fill_blank':
                answerEl.innerHTML = `
                    <input type="number" class="answer-input" id="answer-input" 
                           placeholder="?" autocomplete="off">
                `;
                // Auto-focus input so user can start typing immediately
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        const inp = document.getElementById('answer-input');
                        if (inp) {
                            inp.focus({ preventScroll: true });
                            if ('ontouchstart' in window) {
                                inp.setSelectionRange(0, 0);
                            }
                        }
                    }, 100);
                });
                break;
                
            case 'mcq':
                const opts = document.createElement('div');
                opts.className = 'options-grid';
                q.options.forEach((opt, i) => {
                    const btn = document.createElement('button');
                    btn.className = 'option-btn';
                    btn.textContent = opt;
                    btn.dataset.value = opt;
                    btn.onclick = () => this.selectOption(btn, opt);
                    opts.appendChild(btn);
                });
                answerEl.appendChild(opts);
                break;
                
            case 'matching':
                const matchContainer = document.createElement('div');
                matchContainer.className = 'matching-container';
                matchContainer.id = 'matching-container';
                
                // Create pairs
                const leftItems = [];
                const rightItems = [];
                q.pairs.forEach((pair, i) => {
                    leftItems.push({ value: pair.left, pairIndex: i, side: 'left' });
                    rightItems.push({ value: pair.right, pairIndex: i, side: 'right' });
                });
                
                // Shuffle both independently
                const shuffledLeft = shuffle(leftItems.map((item, idx) => ({...item, id: `l${idx}`})));
                const shuffledRight = shuffle(rightItems.map((item, idx) => ({...item, id: `r${idx}`})));
                
                // Store for checking
                this.matchingData = { left: shuffledLeft, right: shuffledRight, pairs: q.pairs };
                this.matchedPairs = [];
                this.selectedMatch = null;
                
                // Create two distinct columns
                const leftCol = document.createElement('div');
                leftCol.className = 'matching-column';
                leftCol.dataset.column = 'left';
                
                const rightCol = document.createElement('div');
                rightCol.className = 'matching-column';
                rightCol.dataset.column = 'right';
                
                // Render left items in left column
                shuffledLeft.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'match-item';
                    div.textContent = item.value;
                    div.dataset.id = item.id;
                    div.dataset.pair = item.pairIndex;
                    div.dataset.side = item.side;
                    div.onclick = () => this.handleMatchClick(div);
                    leftCol.appendChild(div);
                });
                
                // Render right items in right column
                shuffledRight.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'match-item';
                    div.textContent = item.value;
                    div.dataset.id = item.id;
                    div.dataset.pair = item.pairIndex;
                    div.dataset.side = item.side;
                    div.onclick = () => this.handleMatchClick(div);
                    rightCol.appendChild(div);
                });
                
                matchContainer.appendChild(leftCol);
                matchContainer.appendChild(rightCol);
                
                answerEl.appendChild(matchContainer);
                
                // Add check button for matching
                const checkBtn = document.createElement('button');
                checkBtn.className = 'btn btn-primary btn-submit';
                checkBtn.textContent = typeof I18n !== 'undefined' ? I18n.t('quiz.check') : 'Provjeri spojeve';
                checkBtn.style.marginTop = '1rem';
                checkBtn.onclick = () => this.submitAnswer();
                answerEl.appendChild(checkBtn);
                break;
                
            case 'visual':
                const visualContainer = document.createElement('div');
                visualContainer.className = 'visual-container';
                
                if (q.display === 'visual_groups') {
                    for (let r = 0; r < q.rows; r++) {
                        const row = document.createElement('div');
                        row.className = 'circles-row';
                        for (let c = 0; c < q.perRow; c++) {
                            const circle = document.createElement('div');
                            circle.className = 'visual-circle';
                            circle.textContent = '';
                            circle.dataset.index = r * q.perRow + c;
                            circle.onclick = () => {
                                circle.classList.toggle('filled-blue');
                            };
                            row.appendChild(circle);
                        }
                        visualContainer.appendChild(row);
                    }
                }
                
                const visualInput = document.createElement('input');
                visualInput.type = 'number';
                visualInput.className = 'answer-input';
                visualInput.id = 'answer-input';
                visualInput.placeholder = 'Koliko ukupno?';
                visualContainer.appendChild(visualInput);
                
                answerEl.appendChild(visualContainer);
                // Auto-focus input so user can start typing immediately
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        const inp = document.getElementById('answer-input');
                        if (inp) {
                            inp.focus({ preventScroll: true });
                            if ('ontouchstart' in window) {
                                inp.setSelectionRange(0, 0);
                            }
                        }
                    }, 100);
                });
                break;
                
            case 'steps':
                const stepsContainer = document.createElement('div');
                stepsContainer.className = 'steps-container';
                
                q.steps.forEach((step, i) => {
                    const row = document.createElement('div');
                    row.className = 'step-row';
                    
                    const text = document.createElement('span');
                    text.textContent = step.text;
                    row.appendChild(text);
                    
                    const input = document.createElement('input');
                    input.type = 'number';
                    input.className = 'step-input';
                    input.dataset.index = i;
                    input.dataset.answer = step.answer;
                    row.appendChild(input);
                    
                    if (step.suffix) {
                        const suffix = document.createElement('span');
                        suffix.textContent = step.suffix;
                        row.appendChild(suffix);
                    }
                    
                    stepsContainer.appendChild(row);
                });
                
                answerEl.appendChild(stepsContainer);
                // Auto-focus first step input so user can start typing immediately
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        const firstInput = stepsContainer.querySelector('.step-input');
                        if (firstInput) {
                            firstInput.focus({ preventScroll: true });
                            if ('ontouchstart' in window) {
                                firstInput.setSelectionRange(0, 0);
                            }
                        }
                    }, 100);
                });
                break;
        }
    },
    
    selectOption(btn, value) {
        document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.selectedOption = value;
    },
    
    handleMatchClick(el) {
        if (el.classList.contains('matched')) return;
        
        if (!this.selectedMatch) {
            this.selectedMatch = el;
            el.classList.add('selected');
        } else {
            const prev = this.selectedMatch;
            const curr = el;
            
            // Must be different sides
            if (prev.dataset.side === curr.dataset.side) {
                prev.classList.remove('selected');
                this.selectedMatch = curr;
                curr.classList.add('selected');
                return;
            }
            
            // Check if pair matches
            if (prev.dataset.pair === curr.dataset.pair) {
                prev.classList.remove('selected');
                prev.classList.add('matched');
                curr.classList.add('matched');
                this.matchedPairs.push(parseInt(prev.dataset.pair));
                this.selectedMatch = null;
                
                // Check if all matched
                if (this.matchedPairs.length === this.matchingData.pairs.length) {
                    // Auto submit after a delay
                    setTimeout(() => this.submitAnswer(), 500);
                }
            } else {
                prev.classList.remove('selected');
                prev.classList.add('animate-shake');
                curr.classList.add('animate-shake');
                setTimeout(() => {
                    prev.classList.remove('animate-shake');
                    curr.classList.remove('animate-shake');
                }, 500);
                this.selectedMatch = null;
            }
        }
    },
    
    showHint() {
        const q = this.questions[this.currentQuestionIndex];
        const hintEl = document.getElementById('hint-content');
        hintEl.textContent = q.hint || 'Pomyli se i pokušaj razmišljati drugačije!';
        hintEl.classList.add('show');
    },
    
    submitAnswer() {
        const q = this.questions[this.currentQuestionIndex];
        let userAnswer = null;
        let isCorrect = false;
        
        switch(q.type) {
            case 'fill_blank':
            case 'story':
                const input = document.getElementById('answer-input');
                if (input) {
                    userAnswer = parseInt(input.value);
                    isCorrect = userAnswer === q.answer;
                }
                break;
                
            case 'mcq':
                if (this.selectedOption !== undefined) {
                    userAnswer = this.selectedOption;
                    isCorrect = userAnswer === q.answer;
                }
                break;
                
            case 'matching':
                const totalPairs = q.pairs.length;
                isCorrect = this.matchedPairs.length === totalPairs;
                if (isCorrect) userAnswer = 'matched';
                break;
                
            case 'visual':
                const vinput = document.getElementById('answer-input');
                if (vinput) {
                    userAnswer = parseInt(vinput.value);
                    isCorrect = userAnswer === q.answer;
                }
                break;
                
            case 'steps':
                const stepInputs = document.querySelectorAll('.step-input');
                let allCorrect = true;
                stepInputs.forEach(inp => {
                    const expected = parseInt(inp.dataset.answer);
                    const val = parseInt(inp.value);
                    if (val === expected) {
                        inp.style.borderColor = 'var(--color-success)';
                    } else {
                        inp.style.borderColor = 'var(--color-error)';
                        allCorrect = false;
                    }
                });
                isCorrect = allCorrect;
                userAnswer = allCorrect ? 'correct' : 'incorrect';
                break;
        }
        
        if (userAnswer === null || isNaN(userAnswer) && userAnswer !== 'matched' && userAnswer !== 'correct' && userAnswer !== 'incorrect') {
            // Shake the answer area
            document.getElementById('question-card').classList.add('animate-shake');
            setTimeout(() => {
                document.getElementById('question-card').classList.remove('animate-shake');
            }, 500);
            return;
        }
        
        // Record answer
        this.answers[this.currentQuestionIndex] = { correct: isCorrect, answer: userAnswer };
        this.updateAdaptiveData(this.currentPhase, isCorrect);
        
        if (isCorrect) {
            this.score++;
            this.streak++;
            if (this.streak > this.bestStreak) this.bestStreak = this.streak;
            document.getElementById('correct-count').textContent = this.score;
            document.getElementById('streak-display').textContent = this.streak;
            
            if (typeof SoundManager !== 'undefined') SoundManager.playCorrect();
            this.showFeedback(true, q.explanation);
            
            // Visual feedback on input
            if (q.type === 'fill_blank' || q.type === 'story' || q.type === 'visual') {
                const inp = document.getElementById('answer-input');
                if (inp) inp.classList.add('correct');
            } else if (q.type === 'mcq') {
                document.querySelectorAll('.option-btn').forEach(btn => {
                    if (parseInt(btn.dataset.value) === q.answer) {
                        btn.classList.add('correct');
                    }
                    btn.disabled = true;
                });
            }
        } else {
            this.streak = 0;
            document.getElementById('streak-display').textContent = 0;
            
            if (typeof SoundManager !== 'undefined') SoundManager.playWrong();
            this.showFeedback(false, q.explanation);
            
            if (q.type === 'fill_blank' || q.type === 'story' || q.type === 'visual') {
                const inp = document.getElementById('answer-input');
                if (inp) {
                    inp.classList.add('wrong');
                    inp.disabled = true;
                }
            } else if (q.type === 'mcq') {
                document.querySelectorAll('.option-btn').forEach(btn => {
                    const val = parseInt(btn.dataset.value);
                    if (val === q.answer) {
                        btn.classList.add('correct');
                    } else if (val === userAnswer) {
                        btn.classList.add('wrong');
                    }
                    btn.disabled = true;
                });
            }
        }
        
        // Hide submit, show next
        document.getElementById('btn-submit').style.display = 'none';
        document.getElementById('btn-next').style.display = 'inline-flex';
        
        // Scroll to feedback area to show result and explanation
        setTimeout(() => {
            const fb = document.getElementById('feedback-area');
            if(fb) fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    },
    
    showFeedback(isCorrect, explanation) {
        const area = document.getElementById('feedback-area');
        const content = document.getElementById('feedback-content');
        const t = (key) => typeof I18n !== 'undefined' ? I18n.t(key) : key;
        
        let messages;
        if (typeof I18n !== 'undefined' && I18n.translations[I18n.currentLang]) {
            const fb = I18n.t('feedback.correct');
            const fi = I18n.t('feedback.incorrect');
            messages = isCorrect ? (Array.isArray(fb) ? fb : [fb]) : (Array.isArray(fi) ? fi : [fi]);
        } else {
            messages = isCorrect ? [
                'Bravo! 🎉', 'Odlično! ⭐', 'Točno! 🌟', 'Super! 🚀', 'Sjajno! 💫'
            ] : [
                'Pogrešno, ali učimo se! 💪', 'Nije točno, evo objašnjenja. 📚', 'Još jednom pogledaj objašnjenje. 🤔'
            ];
        }
        
        const msg = pickRandom(messages);
        
        content.innerHTML = `
            <div class="${isCorrect ? 'feedback-correct' : 'feedback-wrong'}">${msg}</div>
            <div class="feedback-explanation">${explanation}</div>
        `;
        
        area.classList.add('show');
    },
    
    nextQuestion() {
        this.currentQuestionIndex++;
        this.selectedOption = undefined;
        
        if (this.currentQuestionIndex >= this.questions.length) {
            this.finishQuiz();
        } else {
            this.renderQuestion();
        }
    },
    
    finishQuiz() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        
        const total = this.questions.length;
        const correct = this.score;
        const pct = correct / total;
        
        // Calculate stars
        let stars = 0;
        if (pct >= 0.3) stars = 1;
        if (pct >= 0.6) stars = 2;
        if (pct >= 0.9) stars = 3;
        
        // Update phase progress
        const phase = PHASES[this.currentPhase];
        phase.completed = Math.min(phase.total, phase.completed + correct);
        if (stars > phase.stars) phase.stars = stars;
        
        let newlyUnlocked = false;
        if (this.currentPhase + 1 < PHASES.length && pct >= 0.5) {
            if (!PHASES[this.currentPhase + 1].unlocked) {
                newlyUnlocked = true;
            }
            PHASES[this.currentPhase + 1].unlocked = true;
        }
        
        this.recordQuizHistory(correct, total);
        this.saveProgress();
        
        // Show results
        const titleEl = document.getElementById('results-title');
        const msgEl = document.getElementById('results-message');
        const iconEl = document.getElementById('results-icon');
        
        const t = (key) => typeof I18n !== 'undefined' ? I18n.t(key) : key;

        if (pct >= 0.9) {
            titleEl.textContent = t('results.bravo');
            msgEl.textContent = t('results.bravoMsg');
            iconEl.textContent = '🏆';
            this.fireConfetti();
        } else if (pct >= 0.6) {
            titleEl.textContent = t('results.great');
            msgEl.textContent = t('results.greatMsg');
            iconEl.textContent = '⭐';
            this.fireConfetti();
        } else if (pct >= 0.3) {
            titleEl.textContent = t('results.good');
            msgEl.textContent = t('results.goodMsg');
            iconEl.textContent = '👍';
        } else {
            titleEl.textContent = t('results.tryAgain');
            msgEl.textContent = t('results.tryAgainMsg');
            iconEl.textContent = '💪';
        }
        
        document.getElementById('result-correct').textContent = correct;
        document.getElementById('result-total').textContent = total;
        document.getElementById('result-stars').textContent = stars;
        
        // Stars display
        const starsDiv = document.getElementById('stars-display');
        starsDiv.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            const star = document.createElement('span');
            star.className = `star ${i < stars ? 'earned' : ''}`;
            star.textContent = '★';
            starsDiv.appendChild(star);
        }
        
        // Show/hide next phase button
        const nextBtn = document.getElementById('btn-next-phase');
        if (pct >= 0.5 && this.currentPhase + 1 < PHASES.length) {
            nextBtn.style.display = 'inline-flex';
        } else {
            nextBtn.style.display = 'none';
        }
        
        this._popupQueue = [];

        if (this.bestStreak >= 5) {
            const t = (key) => typeof I18n !== 'undefined' ? I18n.t(key) : key;
            const streakTitle = t('achievement.streak');
            const streakMsg = t('achievement.streakMsg').replace('{n}', this.bestStreak);
            setTimeout(() => {
                this.showAchievement(streakTitle, streakMsg);
            }, 1000);
        }

        if (newlyUnlocked) {
            setTimeout(() => {
                this.showPhaseUnlock(this.currentPhase + 1);
            }, this.bestStreak >= 5 ? 1100 : 1000);
        }
        
        this.updateHeaderStats();
        this.showScreen('results');
    },
    
    nextPhase() {
        if (this.currentPhase + 1 < PHASES.length) {
            this.openPhase(this.currentPhase + 1);
        }
    },
    
    restartQuiz() {
        this.startQuiz(this.currentMode);
    },
    
    confirmQuit() {
        document.getElementById('confirm-modal').classList.remove('hidden');
    },
    
    hideConfirm() {
        document.getElementById('confirm-modal').classList.add('hidden');
    },
    
    quitQuiz() {
        this.hideConfirm();
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.goHome();
    },
});
