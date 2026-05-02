Object.assign(App, {
    openParentDashboard() {
        if (!this.screens.dashboard) {
            this.screens.dashboard = document.getElementById('dashboard-screen');
        }
        this.renderDashboard();
        this.showScreen('dashboard');
    },

    renderDashboard() {
        let totalStars = 0;
        let totalCompleted = 0;
        let phasesUnlocked = 0;
        let bestStreak = 0;

        PHASES.forEach(phase => {
            totalStars += phase.stars;
            totalCompleted += phase.completed;
            if (phase.unlocked) phasesUnlocked++;
        });

        try {
            const data = JSON.parse(localStorage.getItem('mentalMathProgress') || '[]');
            bestStreak = data.bestStreak || 0;
        } catch(e) {}

        document.getElementById('dash-total-stars').textContent = totalStars;
        document.getElementById('dash-total-completed').textContent = totalCompleted;
        document.getElementById('dash-best-streak').textContent = bestStreak;
        document.getElementById('dash-phases-unlocked').textContent = phasesUnlocked;

        this.renderDashboardPhases();
        this.renderDashboardChart();
        this.renderWeakAreas();
    },

    renderDashboardPhases() {
        const container = document.getElementById('dashboard-phases');
        container.innerHTML = '';

        PHASES.forEach((phase, i) => {
            const pct = Math.min(100, (phase.completed / phase.total) * 100);
            const row = document.createElement('div');
            row.className = 'dashboard-phase-row';
            row.innerHTML = `
                <div class="dashboard-phase-icon">${phase.icon}</div>
                <div class="dashboard-phase-info">
                    <div class="dashboard-phase-name">${phase.title}</div>
                    <div class="dashboard-phase-bar">
                        <div class="dashboard-phase-fill" style="width:${pct}%;background:${phase.color};"></div>
                    </div>
                </div>
                <div class="dashboard-phase-stats">
                    ${phase.completed}/${phase.total}<br>
                    ${'★'.repeat(phase.stars)}${'☆'.repeat(3 - phase.stars)}
                </div>
            `;
            container.appendChild(row);
        });
    },

    renderDashboardChart() {
        const canvas = document.getElementById('dashboard-chart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const w = canvas.width = canvas.offsetWidth * 2;
        const h = canvas.height = 400;
        ctx.scale(1, 1);
        ctx.clearRect(0, 0, w, h);

        let history = [];
        try {
            history = JSON.parse(localStorage.getItem('mentalMathHistory') || '[]');
        } catch(e) {}

        if (history.length < 2) {
            ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-text-light').trim();
            ctx.font = '24px Nunito, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Dovoljno podataka će biti nakon nekoliko dana igranja.', w / 2, h / 2);
            return;
        }

        const last7 = history.slice(-7);
        const maxVal = Math.max(...last7.map(h => h.correct || 0), 1);
        const barWidth = (w - 80) / last7.length;
        const chartHeight = h - 60;

        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-border').trim();
        for (let i = 0; i <= 4; i++) {
            const y = 30 + (chartHeight / 4) * i;
            ctx.fillRect(40, y, w - 60, 1);
        }

        last7.forEach((entry, i) => {
            const val = entry.correct || 0;
            const barH = (val / maxVal) * chartHeight;
            const x = 50 + i * barWidth;
            const y = 30 + chartHeight - barH;

            ctx.fillStyle = entry.color || '#FF6B6B';
            ctx.fillRect(x, y, barWidth - 10, barH);

            ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-text-light').trim();
            ctx.font = '20px Nunito, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(entry.label || '', x + (barWidth - 10) / 2, h - 10);
            ctx.fillText(val.toString(), x + (barWidth - 10) / 2, y - 8);
        });
    },

    renderWeakAreas() {
        const container = document.getElementById('dashboard-weak-areas');
        container.innerHTML = '';

        const weak = PHASES
            .filter(p => p.unlocked && p.completed > 0)
            .filter(p => p.stars < 2)
            .sort((a, b) => (a.stars / a.total) - (b.stars / b.total))
            .slice(0, 3);

        if (weak.length === 0) {
            container.innerHTML = '<p style="color:var(--color-success);text-align:center;padding:1rem;">Svaka otvorena faza ima 2+ zvjezdice! 🎉</p>';
            return;
        }

        weak.forEach(phase => {
            const item = document.createElement('div');
            item.className = 'dashboard-weak-item';
            item.innerHTML = `
                <span>${phase.icon}</span>
                <div>
                    <div class="phase-name">${phase.title}</div>
                    <div class="suggestion">${phase.completed}/${phase.total} · ${'★'.repeat(phase.stars)}${'☆'.repeat(3 - phase.stars)} · Vježbaj više!</div>
                </div>
            `;
            container.appendChild(item);
        });
    },

    recordQuizHistory(correct, total) {
        try {
            let history = JSON.parse(localStorage.getItem('mentalMathHistory') || '[]');
            const today = new Date().toLocaleDateString('hr-HR', { day: '2-digit', month: '2-digit' });
            const existing = history.find(h => h.date === today);
            if (existing) {
                existing.correct += correct;
                existing.total += total;
            } else {
                history.push({
                    date: today,
                    label: today,
                    correct: correct,
                    total: total,
                    color: PHASES[this.currentPhase]?.color || '#FF6B6B'
                });
            }
            if (history.length > 30) history = history.slice(-30);
            localStorage.setItem('mentalMathHistory', JSON.stringify(history));

            let data = JSON.parse(localStorage.getItem('mentalMathProgress') || '{}');
            if (this.bestStreak > (data.bestStreak || 0)) {
                data.bestStreak = this.bestStreak;
            }
            localStorage.setItem('mentalMathProgress', JSON.stringify(data));
        } catch(e) {}
    }
});
