// ==============================
// MENTALNA MATEMATIKA - PHASE DATA
// ==============================

const PHASES = [
    {
        id: 1,
        title: "Prijatelji broja 10",
        subtitle: "Nauči koji brojevi čine 10",
        icon: "🤝",
        color: "#FF6B6B",
        idea: "Broj 10 je prvi veliki 'lijepi broj'. Ako znaš koje kombinacije daju 10, puno lakše ćeš zbrajati, oduzimati, množiti i dijeliti.",
        mantra: "Brojevi imaju prijatelje. Kada se dva prijatelja spoje, dobijemo lijepi broj 10.",
        parentTip: "Koristite Lego kockice, bombone, kamenčiće ili prste. Ako dijete pogađa, vratite se na predmete.",
        unlocked: true,
        completed: 0,
        total: 50,
        stars: 0,
        questionTypes: ["fill_blank", "mcq", "matching"],
        generateQuestions: generatePhase1
    },
    {
        id: 2,
        title: "Jednoznamenkasto zbrajanje",
        subtitle: "Zbrajaj bez brojanja od 1",
        icon: "➕",
        color: "#4ECDC4",
        idea: "Zadrži veći broj u glavi i dodaj manji. Ne moraš brojati svaki put od početka.",
        mantra: "Zadrži veći broj, dodaj manji.",
        parentTip: "Pitajte: 'Što je lakše: brojati sve od početka ili zadržati veći broj u glavi?'",
        unlocked: false,
        completed: 0,
        total: 50,
        stars: 0,
        questionTypes: ["fill_blank", "mcq", "story"],
        generateQuestions: generatePhase2
    },
    {
        id: 3,
        title: "Zbrajanje preko 10",
        subtitle: "Napravi 10, pa nastavi",
        icon: "🎯",
        color: "#FFE66D",
        idea: "Kad je broj blizu 10, pomogni mu da postane 10. Onda je račun lakši.",
        mantra: "Dođi do 10, pa nastavi.",
        parentTip: "Važno pitanje: 'Kako si to znao?' Dijete treba moći reći: 'Napravio sam 10.'",
        unlocked: false,
        completed: 0,
        total: 50,
        stars: 0,
        questionTypes: ["fill_blank", "steps", "mcq"],
        generateQuestions: generatePhase3
    },
    {
        id: 4,
        title: "Osnovno oduzimanje",
        subtitle: "Makni dio, vidi ostatak",
        icon: "➖",
        color: "#FF8C42",
        idea: "Oduzimanje znači: imam nešto, maknem dio, vidim koliko ostaje.",
        mantra: "Makni dio, vidi ostatak.",
        parentTip: "Stavite kockice na stol, maknite nekoliko, pitajte koliko je ostalo. Povežite sa zbrajanjem: ako je 6 + 4 = 10, onda je 10 - 6 = 4.",
        unlocked: false,
        completed: 0,
        total: 50,
        stars: 0,
        questionTypes: ["fill_blank", "mcq", "story"],
        generateQuestions: generatePhase4
    },
    {
        id: 5,
        title: "Oduzimanje kao udaljenost",
        subtitle: "Skoči do 10, pa do cilja",
        icon: "🚀",
        color: "#9B5DE5",
        idea: "Ponekad ne moramo ništa micati. Samo gledamo koliko je jedan broj daleko od drugog.",
        mantra: "Skoči do 10, pa do cilja.",
        parentTip: "Za 13 - 8: 'Koliko je daleko od 8 do 13?' 8 do 10 je 2, 10 do 13 je 3, ukupno 5.",
        unlocked: false,
        completed: 0,
        total: 50,
        stars: 0,
        questionTypes: ["fill_blank", "steps", "mcq"],
        generateQuestions: generatePhase5
    },
    {
        id: 6,
        title: "Dvoznamenkasto zbrajanje",
        subtitle: "Prvo desetice, onda jedinice",
        icon: "🔢",
        color: "#00BBF9",
        idea: "Dvoznamenkasti broj ima veliki dio (desetice) i mali dio (jedinice). Prvo spojimo velike dijelove, onda male.",
        mantra: "Prvo desetice, onda jedinice.",
        parentTip: "Za 42 + 35: prvo 40 + 30 = 70, onda 2 + 5 = 7, ukupno 77. Za mozak je prirodnije prvo znati otprilike gdje je odgovor.",
        unlocked: false,
        completed: 0,
        total: 50,
        stars: 0,
        questionTypes: ["fill_blank", "steps", "mcq"],
        generateQuestions: generatePhase6
    },
    {
        id: 7,
        title: "Zbrajanje zaokruživanjem",
        subtitle: "Daj malo jednom broju da postane lijep",
        icon: "✨",
        color: "#F15BB5",
        idea: "Jedan broj pretvori u lijepi broj (20, 30, 40, 50), a drugi prilagodi. To nije varanje, to je pametno računanje!",
        mantra: "Daj malo jednom broju da postane lijep.",
        parentTip: "Za 29 + 16: 29 treba 1 do 30. Uzmemo 1 od 16, ostane 15. 30 + 15 = 45. Ovo uči dijete da brojeve vidi kao fleksibilne.",
        unlocked: false,
        completed: 0,
        total: 50,
        stars: 0,
        questionTypes: ["fill_blank", "steps", "mcq"],
        generateQuestions: generatePhase7
    },
    {
        id: 8,
        title: "Množenje kao grupe",
        subtitle: "Jednake skupine",
        icon: "🍪",
        color: "#06D6A0",
        idea: "Množenje nije tablica koju treba bubati napamet. Množenje znači: više jednakih grupa.",
        mantra: "Množenje su jednake grupe.",
        parentTip: "Koristite tanjure i kekse. 'Ako imamo 3 tanjura i na svakom tanjuru su 4 keksa, koliko keksa imamo?'",
        unlocked: false,
        completed: 0,
        total: 50,
        stars: 0,
        questionTypes: ["fill_blank", "mcq", "story", "visual"],
        generateQuestions: generatePhase8
    },
    {
        id: 9,
        title: "Duplo, pola, ×5 i ×10",
        subtitle: "Pametno množenje",
        icon: "⚡",
        color: "#FFD166",
        idea: "Neke tablice ne treba bubati. Mogu se razumjeti kroz duplanje, polovicu i desetice.",
        mantra: "×2 je duplo. ×4 je duplo-duplo. ×5 je pola od ×10. ×10 je lako.",
        parentTip: "Za 7 × 5: prvo 7 × 10 = 70, pa pola od 70 je 35. Dijete vidi da množenje nije magija.",
        unlocked: false,
        completed: 0,
        total: 50,
        stars: 0,
        questionTypes: ["fill_blank", "mcq", "story"],
        generateQuestions: generatePhase9
    },
    {
        id: 10,
        title: "Dijeljenje stvari",
        subtitle: "Podijeli pravedno",
        icon: "🎁",
        color: "#EF476F",
        idea: "Dijeljenje znači: imamo nešto i pravedno dijelimo. Svi dobiju jednako.",
        mantra: "Podijeli pravedno.",
        parentTip: "Stavite 12 kockica i 3 tanjure. Dijete stavlja kockice jedan po jedan dok svi tanjuri ne dobiju jednako.",
        unlocked: false,
        completed: 0,
        total: 50,
        stars: 0,
        questionTypes: ["fill_blank", "mcq", "story"],
        generateQuestions: generatePhase10
    },
    {
        id: 11,
        title: "Dijeljenje kao obrnuto množenje",
        subtitle: "Ako znam množenje, znam i dijeljenje",
        icon: "🔄",
        color: "#118AB2",
        idea: "Dijeljenje i množenje su povezani. Jedna obitelj brojeva daje 4 računa.",
        mantra: "Ako znam množenje, znam i dijeljenje.",
        parentTip: "Obitelj brojeva: 3, 4, 12. Od njih: 3×4=12, 4×3=12, 12÷3=4, 12÷4=3. To razvija duboko razumijevanje.",
        unlocked: false,
        completed: 0,
        total: 50,
        stars: 0,
        questionTypes: ["fill_blank", "mcq", "steps"],
        generateQuestions: generatePhase11
    },
    {
        id: 12,
        title: "Speed math trikovi",
        subtitle: "Množenje blizu 10",
        icon: "🚀",
        color: "#073B4C",
        idea: "Kad množimo brojeve blizu 10, pitamo: 'Koliko fali do 10?' Oduzmemo ukriž, pomnožimo male brojeve.",
        mantra: "Koliko fali do 10? Oduzmi ukriž. Pomnoži male brojeve.",
        parentTip: "NE učiti ovo prerano! Dijete mora prvo razumjeti 'koliko fali do 10'. Za 8×9: 8 treba 2, 9 treba 1. 8-1=7, 2×1=2. Odgovor: 72.",
        unlocked: false,
        completed: 0,
        total: 50,
        stars: 0,
        questionTypes: ["fill_blank", "steps", "mcq"],
        generateQuestions: generatePhase12
    }
];

// ==============================
// QUESTION GENERATORS
// ==============================

function generatePhase1(count) {
    // FAZA 1: Prijatelji broja 10
    const questions = [];
    const used = new Set();
    
    while (questions.length < count) {
        const type = pickRandom(["fill_blank", "mcq", "matching"]);
        
        if (type === "fill_blank") {
            const a = randInt(1, 9);
            const b = 10 - a;
            const key = `${a}+?=10`;
            if (!used.has(key)) {
                used.add(key);
                questions.push({
                    type: "fill_blank",
                    question: `Koliko ${a} treba da postane 10?`,
                    display: `${a} + <span class="blank">?</span> = 10`,
                    answer: b,
                    hint: `Zamisli da imaš ${a} kockica. Koliko ti treba da imaš 10?`,
                    explanation: `${a} + ${b} = 10. ${a} i ${b} su prijatelji broja 10!`
                });
            }
        } else if (type === "mcq") {
            const a = randInt(1, 9);
            const b = 10 - a;
            const key = `mcq_${a}`;
            if (!used.has(key)) {
                used.add(key);
                const options = shuffle([b, ...generateWrongAnswers(b, 1, 9, 3)]);
                questions.push({
                    type: "mcq",
                    question: `Koji je prijatelj broja ${a} do 10?`,
                    display: `Pronađi prijatelja: ${a} + ? = 10`,
                    options: options,
                    answer: b,
                    hint: `Prijatelji broja 10 su parovi koji zajedno čine 10.`,
                    explanation: `${a} i ${b} su prijatelji jer ${a} + ${b} = 10.`
                });
            }
        } else {
            const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4);
            const key = `match_${nums.join('')}`;
            if (!used.has(key)) {
                used.add(key);
                const pairs = nums.map(n => ({ left: n, right: 10 - n }));
                questions.push({
                    type: "matching",
                    question: "Spoji brojeve s njihovim prijateljima do 10:",
                    display: "Spoji parove koji daju 10",
                    pairs: pairs,
                    hint: "Pogledaj koji brojevi zajedno čine 10. Npr. 7 treba 3.",
                    explanation: "Svi parovi zajedno čine 10 - to su prijatelji broja 10!"
                });
            }
        }
    }
    return questions;
}

function generatePhase2(count) {
    // FAZA 2: Jednoznamenkasto zbrajanje bez prijelaza preko 10
    const questions = [];
    const used = new Set();
    
    while (questions.length < count) {
        const a = randInt(1, 9);
        if (9 - a < 1) continue;
        const b = randInt(1, 9 - a);
        const key = `${a}+${b}`;
        if (used.has(key)) continue;
        used.add(key);
        
        const type = pickRandom(["fill_blank", "mcq", "story"]);
        const sum = a + b;
        
        if (type === "fill_blank") {
            questions.push({
                type: "fill_blank",
                question: "Zbroji ova dva broja:",
                display: `${a} + ${b} = <span class="blank">?</span>`,
                answer: sum,
                hint: `Zadrži ${Math.max(a,b)} u glavi i dodaj ${Math.min(a,b)} koraka: ${Array.from({length: Math.min(a,b)}, (_,i) => Math.max(a,b)+i+1).join(', ')}.`,
                explanation: `${a} + ${b} = ${sum}. Zadržimo veći broj (${Math.max(a,b)}) i dodamo ${Math.min(a,b)}.`
            });
        } else if (type === "mcq") {
            questions.push({
                type: "mcq",
                question: "Koliko je zbroj?",
                display: `${a} + ${b} = ?`,
                options: shuffle([sum, ...generateWrongAnswers(sum, 1, 9, 3)]),
                answer: sum,
                hint: `Zadrži ${Math.max(a,b)}, pa broji naprijed ${Math.min(a,b)} koraka.`,
                explanation: `${a} + ${b} = ${sum}. Zadržimo ${Math.max(a,b)} u glavi i dodamo ${Math.min(a,b)}.`
            });
        } else {
            const stories = [
                `Imaš ${a} autića i dobiješ još ${b}. Koliko imaš?`,
                `Imaš ${a} bombona i dobiješ još ${b}. Koliko imaš?`,
                `Imaš ${a} kockica i dodaš još ${b}. Koliko imaš?`,
                `Imaš ${a} lopte i dobiješ još ${b}. Koliko imaš?`,
                `Nacrtao si ${a} zvjezdica i još ${b}. Koliko ih je ukupno?`
            ];
            questions.push({
                type: "fill_blank",
                question: pickRandom(stories),
                display: `${a} + ${b} = <span class="blank">?</span>`,
                answer: sum,
                hint: `Zadrži ${Math.max(a,b)} u glavi i broji naprijed.`,
                explanation: `${a} + ${b} = ${sum}. Zadržimo veći broj i dodamo manji.`
            });
        }
    }
    return questions;
}

function generatePhase3(count) {
    // FAZA 3: Zbrajanje preko 10 - UVIJEK veći broj je baza, manji se rastavlja
    const questions = [];
    const used = new Set();
    
    while (questions.length < count) {
        const a = randInt(5, 9);
        const b = randInt(11 - a, 9);
        const key = `${a}+${b}`;
        if (used.has(key)) continue;
        used.add(key);
        
        const type = pickRandom(["fill_blank", "steps", "mcq"]);
        const sum = a + b;
        
        // UVIJEK veći broj je baza, manji se rastavlja
        const base = Math.max(a, b);
        const split = Math.min(a, b);
        const need = 10 - base;
        const remainder = split - need;
        
        if (type === "fill_blank") {
            questions.push({
                type: "fill_blank",
                question: "Zbroji pomoću desetke:",
                display: `${a} + ${b} = <span class="blank">?</span>`,
                answer: sum,
                hint: `${base} treba ${need} da postane 10. Uzmi ${need} od ${split}, ostane ${remainder}. 10 + ${remainder} = ${sum}.`,
                explanation: `${a} + ${b}: ${base} je veći, treba ${need} do 10. ${split} = ${need} + ${remainder}. ${base} + ${need} = 10, pa 10 + ${remainder} = ${sum}.`
            });
        } else if (type === "steps") {
            questions.push({
                type: "steps",
                question: "Riješi korak po korak pomoću desetke:",
                display: `${a} + ${b}`,
                steps: [
                    { text: `${base} treba `, answer: need, suffix: ` do 10.` },
                    { text: `Ostaje nam `, answer: remainder, suffix: `.` },
                    { text: `10 + `, answer: remainder, suffix: ` = ` },
                    { text: `Odgovor: `, answer: sum, suffix: `` }
                ],
                answer: sum,
                hint: `Najprije napravi 10. ${base} treba još ${need}.`,
                explanation: `${base} treba ${need} do 10. Uzmemo ${need} od ${split}, ostane ${remainder}. 10 + ${remainder} = ${sum}.`
            });
        } else {
            questions.push({
                type: "mcq",
                question: "Koliko je zbroj?",
                display: `${a} + ${b} = ?`,
                options: shuffle([sum, sum + 1, sum - 1, sum + 2]),
                answer: sum,
                hint: `Napravi 10: ${base} + ${need} = 10, od ${split} ostane ${remainder}.`,
                explanation: `${a} + ${b}: napravimo 10 od ${base}, pa dodamo ${remainder}. Odgovor je ${sum}.`
            });
        }
    }
    return questions;
}

function generatePhase4(count) {
    // FAZA 4: Osnovno oduzimanje
    const questions = [];
    const used = new Set();
    
    while (questions.length < count) {
        const a = randInt(2, 10);
        const b = randInt(1, a);
        const key = `${a}-${b}`;
        if (used.has(key)) continue;
        used.add(key);
        
        const type = pickRandom(["fill_blank", "mcq", "story"]);
        const diff = a - b;
        
        if (type === "fill_blank") {
            questions.push({
                type: "fill_blank",
                question: "Oduzmi:",
                display: `${a} - ${b} = <span class="blank">?</span>`,
                answer: diff,
                hint: `Makni ${b} od ${a}. Koliko ostane?`,
                explanation: `${a} - ${b} = ${diff}. Ako imamo ${a} i maknemo ${b}, ostane ${diff}.`
            });
        } else if (type === "mcq") {
            questions.push({
                type: "mcq",
                question: "Koliko je?",
                display: `${a} - ${b} = ?`,
                options: shuffle([diff, ...generateWrongAnswers(diff, 0, a, 3)]),
                answer: diff,
                hint: `Makni ${b}. Broji unatrag: ${Array.from({length: b}, (_,i) => a-i-1).join(', ')}.`,
                explanation: `${a} - ${b} = ${diff}. Maknuli smo ${b} od ${a}, ostalo je ${diff}.`
            });
        } else {
            const stories = [
                `Imaš ${a} bombona. Pojedeš ${b}. Koliko ostaje?`,
                `Imaš ${a} kockica. Makneš ${b}. Koliko ostaje?`,
                `Imaš ${a} autića. Pokloniš ${b}. Koliko ostaje?`,
                `Imaš ${a} naljepnica. Zalijepiš ${b}. Koliko ostaje?`,
                `Imaš ${a} jabuka. Pojedeš ${b}. Koliko ostaje?`
            ];
            questions.push({
                type: "fill_blank",
                question: pickRandom(stories),
                display: `${a} - ${b} = <span class="blank">?</span>`,
                answer: diff,
                hint: `Zamisli da makneš ${b} stvari od ${a}.`,
                explanation: `${a} - ${b} = ${diff}. Maknuli smo ${b}, ostalo je ${diff}.`
            });
        }
    }
    return questions;
}

function generatePhase5(count) {
    // FAZA 5: Oduzimanje kao udaljenost
    const questions = [];
    const used = new Set();
    
    while (questions.length < count) {
        const b = randInt(5, 9);
        const a = randInt(b + 2, 20);
        const key = `${a}-${b}`;
        if (used.has(key)) continue;
        used.add(key);
        
        const type = pickRandom(["fill_blank", "steps", "mcq"]);
        const diff = a - b;
        const to10 = 10 - b;
        const from10 = a - 10;
        
        if (type === "fill_blank") {
            questions.push({
                type: "fill_blank",
                question: "Koliko je daleko od broja do broja?",
                display: `${a} - ${b} = <span class="blank">?</span>`,
                answer: diff,
                hint: `Skoči do 10: ${b} do 10 je ${to10}. Od 10 do ${a} je ${from10}. Ukupno ${to10} + ${from10} = ${diff}.`,
                explanation: `${a} - ${b}: ${b} do 10 je ${to10}, 10 do ${a} je ${from10}. Ukupno ${diff}.`
            });
        } else if (type === "steps") {
            questions.push({
                type: "steps",
                question: "Riješi korak po korak (skok do 10):",
                display: `${a} - ${b}`,
                steps: [
                    { text: `${b} do 10 je `, answer: to10, suffix: `.` },
                    { text: `10 do ${a} je `, answer: from10, suffix: `.` },
                    { text: `Ukupno: ${to10} + `, answer: from10, suffix: ` = ` },
                    { text: `Odgovor: `, answer: diff, suffix: `` }
                ],
                answer: diff,
                hint: `Najpriji skoči do 10. Koliko je od ${b} do 10?`,
                explanation: `${b} do 10 = ${to10}, 10 do ${a} = ${from10}. Zbrojimo: ${to10} + ${from10} = ${diff}.`
            });
        } else {
            questions.push({
                type: "mcq",
                question: "Koliko je?",
                display: `${a} - ${b} = ?`,
                options: shuffle([diff, diff + 1, diff - 1, diff + 2]),
                answer: diff,
                hint: `Pitaj se: koliko je daleko od ${b} do ${a}? Skoči do 10.`,
                explanation: `${a} - ${b} = ${diff}. ${b} do 10 je ${to10}, 10 do ${a} je ${from10}. Ukupno ${diff}.`
            });
        }
    }
    return questions;
}

function generatePhase6(count) {
    // FAZA 6: Dvoznamenkasto zbrajanje slijeva nadesno
    const questions = [];
    const used = new Set();
    
    while (questions.length < count) {
        const a = randInt(11, 89);
        const b = randInt(11, 89);
        const aTens = Math.floor(a / 10) * 10;
        const aOnes = a % 10;
        const bTens = Math.floor(b / 10) * 10;
        const bOnes = b % 10;
        
        // Ensure no carry
        if (aOnes + bOnes >= 10) continue;
        
        const key = `${a}+${b}`;
        if (used.has(key)) continue;
        used.add(key);
        
        const type = pickRandom(["fill_blank", "steps", "mcq"]);
        const sum = a + b;
        
        if (type === "fill_blank") {
            questions.push({
                type: "fill_blank",
                question: "Zbroji (prvo desetice, onda jedinice):",
                display: `${a} + ${b} = <span class="blank">?</span>`,
                answer: sum,
                hint: `Prvo desetice: ${aTens} + ${bTens} = ${aTens + bTens}. Onda jedinice: ${aOnes} + ${bOnes} = ${aOnes + bOnes}.`,
                explanation: `${a} + ${b}: ${aTens} + ${bTens} = ${aTens + bTens}, ${aOnes} + ${bOnes} = ${aOnes + bOnes}. Ukupno ${sum}.`
            });
        } else if (type === "steps") {
            questions.push({
                type: "steps",
                question: "Riješi korak po korak:",
                display: `${a} + ${b}`,
                steps: [
                    { text: `Veliki dio: ${aTens} + ${bTens} = `, answer: aTens + bTens, suffix: `.` },
                    { text: `Mali dio: ${aOnes} + ${bOnes} = `, answer: aOnes + bOnes, suffix: `.` },
                    { text: `Zajedno: ${aTens + bTens} + `, answer: aOnes + bOnes, suffix: ` = ` },
                    { text: `Odgovor: `, answer: sum, suffix: `` }
                ],
                answer: sum,
                hint: `Rastavi brojeve: ${a} = ${aTens} + ${aOnes}, ${b} = ${bTens} + ${bOnes}.`,
                explanation: `Prvo desetice (${aTens} + ${bTens}), onda jedinice (${aOnes} + ${bOnes}). Ukupno ${sum}.`
            });
        } else {
            questions.push({
                type: "mcq",
                question: "Koliko je zbroj?",
                display: `${a} + ${b} = ?`,
                options: shuffle([sum, sum + 10, sum - 10, sum + 1]),
                answer: sum,
                hint: `Prvo desetice: ${aTens} + ${bTens}, onda jedinice: ${aOnes} + ${bOnes}.`,
                explanation: `${a} + ${b} = ${sum}. Prvo desetice, onda jedinice.`
            });
        }
    }
    return questions;
}

function generatePhase7(count) {
    // FAZA 7: Dvoznamenkasto zbrajanje pomoću zaokruživanja
    // UVIJEK veći broj je baza, manji se rastavlja
    const questions = [];
    const used = new Set();
    
    while (questions.length < count) {
        // Pick a number near a round number (19, 18, 17, 28, 29, etc.)
        const roundTargets = [20, 30, 40, 50];
        const target = pickRandom(roundTargets);
        const nearRound = target - randInt(1, 3);
        const other = randInt(2, 19);
        
        // UVIJEK veći broj je baza
        const base = Math.max(nearRound, other);
        const split = Math.min(nearRound, other);
        
        // Ako je veći broj onaj blizu zaokruženog, zaokružujemo njega
        // Inače, zaokružujemo manji broj do najbližeg desetka
        let actualTarget, need, remainder;
        
        if (base === nearRound) {
            // Veći je blizu zaokruženog - zaokružujemo veći
            actualTarget = target;
            need = actualTarget - base;
            remainder = split - need;
        } else {
            // Manji je blizu zaokruženog, ali veći je baza
            // Zaokružujemo veći do najbližeg većeg desetka
            actualTarget = Math.ceil(base / 10) * 10;
            need = actualTarget - base;
            remainder = split - need;
        }
        
        // Osiguraj da need nije negativan i da remainder ima smisla
        if (need < 0 || remainder < 0) continue;
        
        const key = `${nearRound}+${other}`;
        if (used.has(key)) continue;
        used.add(key);
        
        const type = pickRandom(["fill_blank", "steps", "mcq"]);
        const sum = nearRound + other;
        
        if (type === "fill_blank") {
            questions.push({
                type: "fill_blank",
                question: "Zbroji pomoću lijepog broja:",
                display: `${nearRound} + ${other} = <span class="blank">?</span>`,
                answer: sum,
                hint: `${base} treba ${need} do ${actualTarget}. Uzmi ${need} od ${split}, ostane ${remainder}. ${actualTarget} + ${remainder} = ${sum}.`,
                explanation: `${nearRound} + ${other}: ${base} je veći, treba ${need} do ${actualTarget}. ${split} = ${need} + ${remainder}. ${base} + ${need} = ${actualTarget}, pa ${actualTarget} + ${remainder} = ${sum}.`
            });
        } else if (type === "steps") {
            questions.push({
                type: "steps",
                question: "Riješi korak po korak:",
                display: `${nearRound} + ${other}`,
                steps: [
                    { text: `${base} treba `, answer: need, suffix: ` do ${actualTarget}.` },
                    { text: `Ostaje nam `, answer: remainder, suffix: `.` },
                    { text: `${actualTarget} + `, answer: remainder, suffix: ` = ` },
                    { text: `Odgovor: `, answer: sum, suffix: `` }
                ],
                answer: sum,
                hint: `Najprije napravi lijep broj. ${base} treba još ${need}.`,
                explanation: `${base} treba ${need} do ${actualTarget}. Uzmemo ${need} od ${split}, ostane ${remainder}. ${actualTarget} + ${remainder} = ${sum}.`
            });
        } else {
            questions.push({
                type: "mcq",
                question: "Koliko je zbroj?",
                display: `${nearRound} + ${other} = ?`,
                options: shuffle([sum, sum + 1, sum - 1, actualTarget + split]),
                answer: sum,
                hint: `Napravi ${actualTarget}: ${base} + ${need} = ${actualTarget}.`,
                explanation: `${nearRound} + ${other}: napravimo ${actualTarget}, pa dodamo ${remainder}. Odgovor je ${sum}.`
            });
        }
    }
    return questions;
}

function generatePhase8(count) {
    // FAZA 8: Množenje kao grupe
    const questions = [];
    const used = new Set();
    
    while (questions.length < count) {
        const a = randInt(2, 10);
        const b = randInt(2, 10);
        const key = `${a}×${b}`;
        if (used.has(key)) continue;
        used.add(key);
        
        const type = pickRandom(["fill_blank", "mcq", "story", "visual"]);
        const product = a * b;
        
        if (type === "fill_blank") {
            const phrasing = pickRandom([
                `${a} grupa po ${b}`,
                `${a} puta ${b}`,
                `${a} × ${b}`
            ]);
            questions.push({
                type: "fill_blank",
                question: "Koliko je jednako?",
                display: `${phrasing} = <span class="blank">?</span>`,
                answer: product,
                hint: `Zamisli ${a} redova s po ${b} kružića. Prebroji: ${Array.from({length: a}, (_,i) => (i+1)*b).join(', ')}.`,
                explanation: `${a} × ${b} = ${product}. To znači ${a} grupa po ${b}, ukupno ${product}.`
            });
        } else if (type === "mcq") {
            questions.push({
                type: "mcq",
                question: "Koliko je?",
                display: `${a} × ${b} = ?`,
                options: shuffle([product, ...generateWrongAnswers(product, product - 5, product + 5, 3)]),
                answer: product,
                hint: `Zbroji ${b} ${a} puta: ${Array.from({length: a}, () => b).join(' + ')} = ${product}.`,
                explanation: `${a} × ${b} znači ${b} + ${b} ${a-1 > 0 ? '+ ... (' + a + ' puta)' : ''} = ${product}.`
            });
        } else if (type === "visual") {
            questions.push({
                type: "visual",
                question: `Prikaži ${a} grupa po ${b} kružića. Koliko ukupno?`,
                display: "visual_groups",
                rows: a,
                perRow: b,
                answer: product,
                hint: `Prebroji sve kružiće. Možeš brojati ${b}, ${2*b}, ${3*b}...`,
                explanation: `${a} grupa po ${b} = ${a} × ${b} = ${product}.`
            });
        } else {
            const stories = [
                `${a} tanjura, na svakom ${b} keksa. Koliko keksa?`,
                `${a} kutija, u svakoj ${b} autića. Koliko autića?`,
                `${a} ekipa, u svakoj ${b} djece. Koliko djece?`,
                `${a} vrećica, u svakoj ${b} bombona. Koliko bombona?`,
                `${a} polica, na svakoj ${b} knjiga. Koliko knjiga?`
            ];
            questions.push({
                type: "fill_blank",
                question: pickRandom(stories),
                display: `${a} × ${b} = <span class="blank">?</span>`,
                answer: product,
                hint: `Zbroji ${b}, ${a} puta.`,
                explanation: `${a} × ${b} = ${product}. ${a} grupa po ${b} je ukupno ${product}.`
            });
        }
    }
    return questions;
}

function generatePhase9(count) {
    // FAZA 9: Duplo, pola, ×5, ×10
    const questions = [];
    const used = new Set();
    
    const types = ["double", "times2", "times4", "times5", "times10"];
    
    while (questions.length < count) {
        const subtype = pickRandom(types);
        let n, answer, display, hint, explanation;
        
        switch(subtype) {
            case "double":
                n = randInt(1, 15);
                answer = n * 2;
                display = `Duplo od ${n}`;
                hint = `Duplo znači isti broj još jednom: ${n} + ${n} = ${answer}.`;
                explanation = `Duplo od ${n} = ${n} + ${n} = ${answer}.`;
                break;
            case "times2":
                n = randInt(1, 10);
                answer = n * 2;
                display = `${n} × 2`;
                hint = `${n} × 2 znači ${n} + ${n} = ${answer}.`;
                explanation = `${n} × 2 = ${answer}.`;
                break;
            case "times4":
                n = randInt(1, 10);
                answer = n * 4;
                display = `${n} × 4`;
                hint = `×4 je duplo pa opet duplo: ${n} × 2 = ${n*2}, pa ${n*2} × 2 = ${answer}.`;
                explanation = `${n} × 4: duplo od ${n} je ${n*2}, duplo od ${n*2} je ${answer}.`;
                break;
            case "times5":
                n = randInt(1, 10);
                answer = n * 5;
                display = `${n} × 5`;
                hint = `×5 je pola od ×10: ${n} × 10 = ${n*10}, pa pola je ${answer}.`;
                explanation = `${n} × 5: ${n} × 10 = ${n*10}, pola od ${n*10} je ${answer}.`;
                break;
            case "times10":
                n = randInt(1, 10);
                answer = n * 10;
                display = `${n} × 10`;
                hint = `×10 samo dodaj 0: ${n} → ${answer}.`;
                explanation = `${n} × 10 = ${answer}. Samo napiši ${n} i dodaj 0.`;
                break;
        }
        
        const key = `${subtype}_${n}`;
        if (used.has(key)) continue;
        used.add(key);
        
        const qtype = pickRandom(["fill_blank", "mcq"]);
        
        if (qtype === "fill_blank") {
            questions.push({
                type: "fill_blank",
                question: "Koliko je?",
                display: `${display} = <span class="blank">?</span>`,
                answer: answer,
                hint: hint,
                explanation: explanation
            });
        } else {
            questions.push({
                type: "mcq",
                question: "Koliko je?",
                display: `${display} = ?`,
                options: shuffle([answer, answer + 5, answer - 5, answer + 10]),
                answer: answer,
                hint: hint,
                explanation: explanation
            });
        }
    }
    return questions;
}

function generatePhase10(count) {
    // FAZA 10: Dijeljenje kao dijeljenje stvari
    const questions = [];
    const used = new Set();
    
    while (questions.length < count) {
        const divisor = pickRandom([2, 3, 4, 5]);
        const answer = randInt(1, 10);
        const dividend = divisor * answer;
        
        const key = `${dividend}÷${divisor}`;
        if (used.has(key)) continue;
        used.add(key);
        
        const type = pickRandom(["fill_blank", "mcq", "story"]);
        
        if (type === "fill_blank") {
            questions.push({
                type: "fill_blank",
                question: "Pravedno podijeli:",
                display: `${dividend} ÷ ${divisor} = <span class="blank">?</span>`,
                answer: answer,
                hint: `Zamisli ${dividend} kockica podijeljenih na ${divisor} kutija. Svaka kutija dobije po koliko?`,
                explanation: `${dividend} ÷ ${divisor} = ${answer}. Podijelili smo ${dividend} na ${divisor} jednakih dijelova, svaki je ${answer}.`
            });
        } else if (type === "mcq") {
            questions.push({
                type: "mcq",
                question: "Koliko je?",
                display: `${dividend} ÷ ${divisor} = ?`,
                options: shuffle([answer, answer + 1, Math.max(1, answer - 1), answer + 2]),
                answer: answer,
                hint: `Koji broj pomnožen s ${divisor} daje ${dividend}?`,
                explanation: `${dividend} ÷ ${divisor} = ${answer} jer ${divisor} × ${answer} = ${dividend}.`
            });
        } else {
            const stories = [
                `${dividend} bombona dijelimo na ${divisor} djece. Koliko dobije svako?`,
                `${dividend} kockica dijelimo u ${divisor} kutije. Koliko ide u svaku?`,
                `${dividend} jabuka dijelimo u ${divisor} košara. Koliko ide u svaku?`,
                `${dividend} naljepnica dijelimo na ${divisor} djece. Koliko dobije svako?`
            ];
            questions.push({
                type: "fill_blank",
                question: pickRandom(stories),
                display: `${dividend} ÷ ${divisor} = <span class="blank">?</span>`,
                answer: answer,
                hint: `Podijeli jednako.`,
                explanation: `${dividend} ÷ ${divisor} = ${answer}. Svi dobiju jednako!`
            });
        }
    }
    return questions;
}

function generatePhase11(count) {
    // FAZA 11: Dijeljenje kao obrnuto množenje
    const questions = [];
    const used = new Set();
    
    while (questions.length < count) {
        const a = randInt(2, 9);
        const b = randInt(2, 9);
        const product = a * b;
        
        const key = `${a}×${b}`;
        if (used.has(key)) continue;
        used.add(key);
        
        const type = pickRandom(["fill_blank", "steps", "mcq"]);
        const subtype = pickRandom(["direct", "reverse"]);
        
        if (subtype === "direct") {
            if (type === "fill_blank") {
                questions.push({
                    type: "fill_blank",
                    question: `Ako znaš da je ${a} × ${b} = ${product}, koliko je ${product} ÷ ${a}?`,
                    display: `${product} ÷ ${a} = <span class="blank">?</span>`,
                    answer: b,
                    hint: `Množenje i dijeljenje su obitelj. Ako je ${a} × ${b} = ${product}, onda je ${product} ÷ ${a} = ${b}.`,
                    explanation: `${product} ÷ ${a} = ${b} jer ${a} × ${b} = ${product}.`
                });
            } else if (type === "steps") {
                questions.push({
                    type: "steps",
                    question: "Poveži množenje i dijeljenje:",
                    display: `${product} ÷ ${a}`,
                    steps: [
                        { text: `Znamo: ${a} × `, answer: b, suffix: ` = ${product}.` },
                        { text: `Zato: ${product} ÷ ${a} = `, answer: b, suffix: `.` }
                    ],
                    answer: b,
                    hint: `Koji broj pomnožen s ${a} daje ${product}?`,
                    explanation: `${a} × ${b} = ${product}, zato ${product} ÷ ${a} = ${b}.`
                });
            } else {
                questions.push({
                    type: "mcq",
                    question: `Ako je ${a} × ${b} = ${product}, koliko je ${product} ÷ ${a}?`,
                    display: `${product} ÷ ${a} = ?`,
                    options: shuffle([b, a, product - a, Math.floor(product / 2) || 1]),
                    answer: b,
                    hint: `Množenje i dijeljenje su obitelj.`,
                    explanation: `${product} ÷ ${a} = ${b} jer ${a} × ${b} = ${product}.`
                });
            }
        } else {
            // Reverse - ask for multiplication that helps
            const c = pickRandom([a, b]);
            const other = c === a ? b : a;
            questions.push({
                type: "fill_blank",
                question: `Koje množenje pomaže kod ${product} ÷ ${c}?`,
                display: `${c} × <span class="blank">?</span> = ${product}`,
                answer: other,
                hint: `Koji broj pomnožen s ${c} daje ${product}?`,
                explanation: `${c} × ${other} = ${product}, zato ${product} ÷ ${c} = ${other}.`
            });
        }
    }
    return questions;
}

function generatePhase12(count) {
    // FAZA 12: Speed math trikovi blizu broja 10
    const questions = [];
    const used = new Set();
    
    while (questions.length < count) {
        const a = randInt(5, 9);
        const b = randInt(5, 9);
        const key = `${a}×${b}`;
        if (used.has(key)) continue;
        used.add(key);
        
        const type = pickRandom(["fill_blank", "steps", "mcq"]);
        const product = a * b;
        const aDiff = 10 - a;
        const bDiff = 10 - b;
        const cross1 = a - bDiff;
        const cross2 = b - aDiff;
        const smallProd = aDiff * bDiff;
        
        if (type === "fill_blank") {
            questions.push({
                type: "fill_blank",
                question: "Pomnoži pomoću trika (koliko fali do 10?)",
                display: `${a} × ${b} = <span class="blank">?</span>`,
                answer: product,
                hint: `${a} treba ${aDiff} do 10. ${b} treba ${bDiff} do 10. ${a} - ${bDiff} = ${cross1}, ${aDiff} × ${bDiff} = ${smallProd}. Odgovor: ${cross1}${smallProd < 10 ? '0' + smallProd : smallProd}.`,
                explanation: `${a} × ${b}: ${a} je ${aDiff} ispod 10, ${b} je ${bDiff} ispod 10. ${a} - ${bDiff} = ${cross1}. ${aDiff} × ${bDiff} = ${smallProd}. Odgovor: ${product}.`
            });
        } else if (type === "steps") {
            questions.push({
                type: "steps",
                question: "Riješi trikom 'koliko fali do 10':",
                display: `${a} × ${b}`,
                steps: [
                    { text: `${a} treba `, answer: aDiff, suffix: ` do 10.` },
                    { text: `${b} treba `, answer: bDiff, suffix: ` do 10.` },
                    { text: `Oduzmemo ukriž: ${a} - ${bDiff} = `, answer: cross1, suffix: `.` },
                    { text: `Pomnožimo male: ${aDiff} × ${bDiff} = `, answer: smallProd, suffix: `.` },
                    { text: `Odgovor: `, answer: product, suffix: `` }
                ],
                answer: product,
                hint: `Koliko svakom broju fali do 10?`,
                explanation: `${a} fali ${aDiff}, ${b} fali ${bDiff}. ${a} - ${bDiff} = ${cross1}. ${aDiff} × ${bDiff} = ${smallProd}. Odgovor ${product}.`
            });
        } else {
            questions.push({
                type: "mcq",
                question: "Koliko je?",
                display: `${a} × ${b} = ?`,
                options: shuffle([product, product + 1, product - 1, (a+1)*b]),
                answer: product,
                hint: `${a} treba ${aDiff} do 10, ${b} treba ${bDiff}. Oduzmi ukriž, pomnoži male.`,
                explanation: `${a}×${b}: oduzmemo ukriž (${cross1}), pomnožimo male (${smallProd}) = ${product}.`
            });
        }
    }
    return questions;
}

// ==============================
// UTILITY FUNCTIONS
// ==============================

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(arr) {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

function generateWrongAnswers(correct, min, max, count) {
    const wrong = new Set();
    while (wrong.size < count) {
        const val = randInt(min, max);
        if (val !== correct && val >= 0) {
            wrong.add(val);
        }
    }
    return Array.from(wrong);
}

// ==============================
// NEW QUESTION TYPES
// ==============================

function generateMemoryCards(count) {
    const questions = [];
    const allPairs = [];
    for (let a = 2; a <= 10; a++) {
        for (let b = 2; b <= 10; b++) {
            allPairs.push({ left: `${a} × ${b}`, right: a * b, a, b });
        }
    }

    for (let q = 0; q < count; q++) {
        const selected = shuffle(allPairs).slice(0, 4);
        questions.push({
            type: 'matching',
            question: 'Spoji izraze s rezultatima:',
            display: 'Spoji parove',
            pairs: selected.map(p => ({ left: p.left, right: p.right })),
            hint: 'Izračunaj svaki izraz i pronađi odgovarajući broj.',
            explanation: 'Množenje i rezultat čine par!'
        });
    }
    return questions;
}

function generateSizeOrdering(count) {
    const questions = [];
    for (let q = 0; q < count; q++) {
        const exprs = [];
        const results = [];
        while (exprs.length < 4) {
            const a = randInt(2, 12);
            const b = randInt(2, 12);
            const op = pickRandom(['+', '-', '×']);
            let result;
            let display;
            if (op === '+') {
                result = a + b;
                display = `${a} + ${b}`;
            } else if (op === '-') {
                if (a < b) continue;
                result = a - b;
                display = `${a} - ${b}`;
            } else {
                result = a * b;
                display = `${a} × ${b}`;
            }
            if (!results.includes(result)) {
                exprs.push({ display, result });
                results.push(result);
            }
        }

        const sorted = [...exprs].sort((a, b) => a.result - b.result);
        const correctOrder = sorted.map(e => e.display).join(', ');

        questions.push({
            type: 'fill_blank',
            question: 'Poredaj izraze od najmanjeg do najvećeg rezultata (odvoji zarezima):',
            display: exprs.map(e => e.display).join('   |   '),
            answer: correctOrder,
            hint: 'Izračunaj svaki izraz, onda poredaj.',
            explanation: `Redoslijed: ${sorted.map(e => `${e.display} = ${e.result}`).join(', ')}`,
            _isOrdering: true
        });
    }
    return questions;
}

function generateNumberLineOrdering(count) {
    const questions = [];
    for (let q = 0; q < count; q++) {
        const nums = [];
        while (nums.length < 5) {
            const n = randInt(1, 100);
            if (!nums.includes(n)) nums.push(n);
        }
        const sorted = [...nums].sort((a, b) => a - b);
        const correctOrder = sorted.join(', ');

        questions.push({
            type: 'fill_blank',
            question: 'Poredaj brojeve od najmanjeg do najvećeg:',
            display: nums.join('   |   '),
            answer: correctOrder,
            hint: 'Pronađi najmanji broj, pa sljedeći...',
            explanation: `Redoslijed: ${correctOrder}`,
            _isOrdering: true
        });
    }
    return questions;
}
