// GAMIFICATION - Stars, streaks, achievements, confetti, review

Object.assign(App, {
    fireConfetti() {
        if (typeof SoundManager !== 'undefined') SoundManager.playConfetti();

        let container = document.getElementById('confetti-container');
        let canvas = document.getElementById('confetti-canvas');

        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = 'confetti-canvas';
            canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
            container.appendChild(canvas);
        }

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF8C42', '#9B5DE5', '#52D681', '#5C9DF5'];
        const particles = [];

        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                vx: (Math.random() - 0.5) * 4,
                vy: Math.random() * 3 + 2,
                size: Math.random() * 6 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 10,
                opacity: 1,
                shape: Math.random() > 0.5 ? 'rect' : 'circle'
            });
        }

        let animationId;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let alive = false;

            particles.forEach(p => {
                p.x += p.vx;
                p.vy += 0.05;
                p.y += p.vy;
                p.rotation += p.rotationSpeed;
                p.opacity -= 0.003;

                if (p.opacity > 0 && p.y < canvas.height + 50) {
                    alive = true;
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rotation * Math.PI / 180);
                    ctx.globalAlpha = Math.max(0, p.opacity);
                    ctx.fillStyle = p.color;
                    if (p.shape === 'circle') {
                        ctx.beginPath();
                        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
                        ctx.fill();
                    } else {
                        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
                    }
                    ctx.restore();
                }
            });

            if (alive) {
                animationId = requestAnimationFrame(animate);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                cancelAnimationFrame(animationId);
            }
        };

        animate();
    },
    
    showAchievement(title, text) {
        if (typeof SoundManager !== 'undefined') SoundManager.playAchievement();
        const popup = document.getElementById('achievement-popup');
        document.getElementById('achievement-title').textContent = title;
        document.getElementById('achievement-text').textContent = text;
        popup.classList.remove('hidden');
    },
    
    closeAchievement() {
        document.getElementById('achievement-popup').classList.add('hidden');
    },

    showPhaseUnlock(phaseIndex) {
        const phase = PHASES[phaseIndex];
        if (!phase) return;

        if (typeof SoundManager !== 'undefined') SoundManager.playAchievement();

        let popup = document.getElementById('phase-unlock-popup');
        if (!popup) {
            popup = document.createElement('div');
            popup.id = 'phase-unlock-popup';
            popup.className = 'popup hidden';
            popup.setAttribute('role', 'dialog');
            popup.setAttribute('aria-modal', 'true');
            popup.innerHTML = `
                <div class="popup-content phase-unlock-content">
                    <div class="phase-unlock-sparkle" aria-hidden="true">✨🌟✨</div>
                    <div class="phase-unlock-icon" id="phase-unlock-icon"></div>
                    <h3 id="phase-unlock-title">Novi svijet otključan!</h3>
                    <p id="phase-unlock-text"></p>
                    <div class="phase-unlock-badge" id="phase-unlock-badge"></div>
                    <button class="btn btn-primary" onclick="app.closePhaseUnlock()">Istraži! 🚀</button>
                </div>
            `;
            document.getElementById('app').appendChild(popup);
        }

        document.getElementById('phase-unlock-icon').textContent = phase.icon;
        document.getElementById('phase-unlock-title').textContent = 'Novi svijet otključan! 🎉';
        document.getElementById('phase-unlock-text').textContent = `Otključao/la si svijet "${phase.title}"!`;
        document.getElementById('phase-unlock-badge').innerHTML = `
            <span style="background:${phase.color};color:white;padding:0.3rem 1rem;border-radius:var(--radius-sm);font-weight:800;font-size:1.1rem;">
                ${phase.icon} ${phase.title}
            </span>
        `;
        popup.classList.remove('hidden');
        this.fireConfetti();
    },

    closePhaseUnlock() {
        const popup = document.getElementById('phase-unlock-popup');
        if (popup) popup.classList.add('hidden');
    },

    showReviewMistakes() {
        const container = document.getElementById('review-mistakes-list');
        container.innerHTML = '';
        const mistakes = [];
        for (let i = 0; i < this.questions.length; i++) {
            const q = this.questions[i];
            const a = this.answers[i];
            if (!a || !a.correct) {
                mistakes.push({ index: i, question: q, answer: a });
            }
        }
        if (mistakes.length === 0) {
            container.innerHTML = '<p class="review-no-mistakes">Nema grešaka! Savršeno! 🎉</p>';
        } else {
            mistakes.forEach(m => {
                const card = document.createElement('div');
                card.className = 'mistake-card';
                const userAns = m.answer ? m.answer.answer : '/';
                const display = m.question.display
                    ? m.question.display.replace(/<span class="blank">\?<\/span>/g, '___')
                    : '';
                card.innerHTML = `
                    <div class="mistake-header">Pitanje ${m.index + 1}</div>
                    <div class="mistake-display">${display}</div>
                    <div class="mistake-row wrong"><span>Tvoj odgovor:</span> <strong>${userAns}</strong></div>
                    <div class="mistake-row correct"><span>Točan odgovor:</span> <strong>${m.question.answer}</strong></div>
                    <div class="mistake-explanation">${m.question.explanation}</div>
                `;
                container.appendChild(card);
            });
        }
        document.getElementById('review-mistakes').classList.remove('hidden');
        document.getElementById('btn-review-mistakes').style.display = 'none';
    },

    hideReviewMistakes() {
        document.getElementById('review-mistakes').classList.add('hidden');
        document.getElementById('btn-review-mistakes').style.display = '';
    }
});
