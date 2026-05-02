Object.assign(App, {
    loadProgress() {
        try {
            const saved = localStorage.getItem('mentalMathProgress');
            if (saved) {
                const data = JSON.parse(saved);
                PHASES.forEach((phase, i) => {
                    if (data[i]) {
                        phase.completed = data[i].completed || 0;
                        phase.stars = data[i].stars || 0;
                        phase.unlocked = data[i].unlocked !== undefined ? data[i].unlocked : (i === 0);
                        phase.learned = data[i].learned || false;
                    }
                });
                this.dailyCompleted = data.dailyCompleted || false;
                this.lastDailyDate = data.lastDailyDate || null;
            }
        } catch (e) {
            // localStorage unavailable (private browsing, quota exceeded)
        }
    },

    saveProgress() {
        try {
            const data = PHASES.map(p => ({
                completed: p.completed,
                stars: p.stars,
                unlocked: p.unlocked,
                learned: p.learned || false
            }));
            data.dailyCompleted = this.dailyCompleted;
            data.lastDailyDate = this.lastDailyDate;
            localStorage.setItem('mentalMathProgress', JSON.stringify(data));
        } catch (e) {
            // localStorage unavailable
        }
    }
});
