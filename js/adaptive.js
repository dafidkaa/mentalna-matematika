Object.assign(App, {
    getAdaptiveData(phaseIndex) {
        try {
            const data = JSON.parse(localStorage.getItem('mentalMathAdaptive') || '{}');
            return data[phaseIndex] || { correct: 0, total: 0, recentCorrect: 0, recentTotal: 0, streak: 0, difficulty: 'normal' };
        } catch(e) {
            return { correct: 0, total: 0, recentCorrect: 0, recentTotal: 0, streak: 0, difficulty: 'normal' };
        }
    },

    updateAdaptiveData(phaseIndex, isCorrect) {
        try {
            const data = JSON.parse(localStorage.getItem('mentalMathAdaptive') || '{}');
            if (!data[phaseIndex]) data[phaseIndex] = { correct: 0, total: 0, recentCorrect: 0, recentTotal: 0, streak: 0, difficulty: 'normal' };
            const d = data[phaseIndex];
            d.total++;
            d.recentTotal++;
            if (isCorrect) {
                d.correct++;
                d.recentCorrect++;
                d.streak++;
            } else {
                d.streak = 0;
            }

            // Adjust difficulty every 5 questions
            if (d.recentTotal >= 5) {
                const recentAccuracy = d.recentCorrect / d.recentTotal;
                if (recentAccuracy >= 0.9 && d.difficulty !== 'hard') {
                    d.difficulty = d.difficulty === 'easy' ? 'normal' : 'hard';
                } else if (recentAccuracy <= 0.4 && d.difficulty !== 'easy') {
                    d.difficulty = d.difficulty === 'hard' ? 'normal' : 'easy';
                }
                d.recentCorrect = 0;
                d.recentTotal = 0;
            }

            localStorage.setItem('mentalMathAdaptive', JSON.stringify(data));
        } catch(e) {}
    },

    getAdaptiveQuestionCount(phaseIndex, baseCount) {
        const adaptive = this.getAdaptiveData(phaseIndex);
        if (adaptive.difficulty === 'hard') return Math.max(5, baseCount + 3);
        if (adaptive.difficulty === 'easy') return Math.max(3, baseCount - 2);
        return baseCount;
    }
});
