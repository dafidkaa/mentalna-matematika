// LEARN CONTENT - Step definitions for each phase
Object.assign(App, {
    generateLearnSteps(phaseIndex) {
        const steps = [];
        
        switch(phaseIndex) {
            case 0: // Prijatelji broja 10
                steps.push(
                    {
                        title: "Upoznaj broj 10! 🎯",
                        html: `
                            <div class="learn-explanation">
                                <strong>Broj 10</strong> je prvi veliki "lijepi broj".<br><br>
                                Dva broja su <strong>prijatelji</strong> ako zajedno čine 10.
                            </div>
                            <div class="learn-visual">
                                <div style="text-align:center;margin-bottom:1rem;font-size:1.1rem;">Klikni na prazne kocke da ih napuniš!</div>
                                <div class="learn-blocks-interactive" data-target="10">
                                    ${Array(7).fill().map((_,i) => `<div class="learn-block-interactive blue" style="background:#E3F2FD;border-color:#90CAF9;color:#1565C0;">7</div>`).join('')}
                                    ${Array(3).fill().map((_,i) => `<div class="learn-block-interactive" style="background:var(--color-bg);border:2px dashed var(--color-border);color:var(--color-text-light);font-size:0.9rem;">?</div>`).join('')}
                                </div>
                                <p style="color:var(--color-text-light);margin-top:0.5rem;text-align:center;">7 kockica plavih + 3 prazne = 10</p>
                                <div style="margin-top:1rem;font-size:1.3rem;text-align:center;">
                                    <span style="color:var(--color-primary);font-weight:900;">7 + 3 = 10</span> ✨
                                </div>
                            </div>
                        `,
                        interactiveType: 'countBlocks'
                    },
                    {
                        title: "Pogledajmo sve parove prijatelja!",
                        html: `
                            <div class="learn-explanation">
                                Evo svih parova koji čine 10 — prstići pomažu!
                            </div>
                            <div class="learn-visual">
                                <div style="display:flex;flex-direction:column;gap:1.2rem;align-items:center;">
                                    <div style="text-align:center;">
                                        <div style="font-weight:700;margin-bottom:0.5rem;">1 + 9 = 10</div>
                                        <div class="learn-fingers" data-target="1">
                                            <span class="learn-finger">☝️</span>
                                            <span class="learn-finger">✌️</span>
                                            <span class="learn-finger">🤟</span>
                                            <span class="learn-finger">🖐️</span>
                                            <span class="learn-finger">🖐️</span>
                                        </div>
                                        <div style="font-size:0.85rem;color:var(--color-text-light);margin-top:0.3rem;">Klikni prvi prst!</div>
                                    </div>
                                    <div style="text-align:center;">
                                        <div style="font-weight:700;margin-bottom:0.5rem;">5 + 5 = 10</div>
                                        <div class="learn-fingers" data-target="5">
                                            <span class="learn-finger">☝️</span>
                                            <span class="learn-finger">✌️</span>
                                            <span class="learn-finger">🤟</span>
                                            <span class="learn-finger">🖖</span>
                                            <span class="learn-finger">🖐️</span>
                                        </div>
                                        <div style="font-size:0.85rem;color:var(--color-text-light);margin-top:0.3rem;">Klikni svih 5 prstiju!</div>
                                    </div>
                                </div>
                                <div style="margin-top:1rem;background:var(--color-bg);padding:1rem;border-radius:var(--radius-md);text-align:center;">
                                    <strong style="color:var(--color-primary);">Zapamti:</strong><br>
                                    1+9, 2+8, 3+7, 4+6, 5+5<br>
                                    I obrnuto isto vrijedi!
                                </div>
                            </div>
                        `,
                        interactiveType: 'fingers'
                    },
                    {
                        title: "Koliko treba do 10?",
                        html: `
                            <div class="learn-explanation">
                                Kad vidiš broj, pitaj se: <strong>"Koliko mu treba do 10?"</strong><br>
                                Klikni točan odgovor!
                            </div>
                            <div class="learn-visual">
                                <div style="text-align:center;margin-bottom:1.5rem;">
                                    <div style="font-size:2rem;font-weight:900;color:var(--color-primary);margin-bottom:1rem;">Broj 8 treba koliko do 10?</div>
                                    <div class="learn-number-line-interactive">
                                        ${[1,2,3,4,5,6,7,8,9,10].map(n => `
                                            <div class="learn-num-tile ${n===8?'highlight':n===10?'target':''}" data-answer="${n}" data-correct="2">${n}</div>
                                        `).join('')}
                                    </div>
                                </div>
                                <div class="learn-mini-quiz">
                                    <h4>🎯 Mali izazov: 6 + ? = 10</h4>
                                    <div class="learn-mini-options">
                                        <button class="learn-mini-btn" data-answer="3" data-correct="4">3</button>
                                        <button class="learn-mini-btn" data-answer="4" data-correct="4">4</button>
                                        <button class="learn-mini-btn" data-answer="5" data-correct="4">5</button>
                                        <button class="learn-mini-btn" data-answer="2" data-correct="4">2</button>
                                    </div>
                                </div>
                            </div>
                        `,
                        interactiveType: 'miniQuiz'
                    },
                    {
                        title: "Vježbaj s prstima!",
                        html: `
                            <div class="learn-explanation">
                                <strong>Prstima</strong> je najlakše provjeriti:
                            </div>
                            <div class="learn-visual">
                                <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;max-width:400px;">
                                    <div style="text-align:center;padding:1rem;background:var(--color-bg);border-radius:var(--radius-md);border:2px solid var(--color-border);">
                                        <div style="font-size:1.5rem;font-weight:900;">9 + 1 = ?</div>
                                        <div style="margin-top:0.5rem;">9 prstiju + još 1</div>
                                        <div style="margin-top:0.5rem;color:var(--color-success);font-weight:700;">→ 10 ✓</div>
                                    </div>
                                    <div style="text-align:center;padding:1rem;background:var(--color-bg);border-radius:var(--radius-md);border:2px solid var(--color-border);">
                                        <div style="font-size:1.5rem;font-weight:900;">6 + 4 = ?</div>
                                        <div style="margin-top:0.5rem;">6 prstiju + još 4</div>
                                        <div style="margin-top:0.5rem;color:var(--color-success);font-weight:700;">→ 10 ✓</div>
                                    </div>
                                    <div style="text-align:center;padding:1rem;background:var(--color-bg);border-radius:var(--radius-md);border:2px solid var(--color-border);">
                                        <div style="font-size:1.5rem;font-weight:900;">3 + 7 = ?</div>
                                        <div style="margin-top:0.5rem;">3 prsta + još 7</div>
                                        <div style="margin-top:0.5rem;color:var(--color-success);font-weight:700;">→ 10 ✓</div>
                                    </div>
                                    <div style="text-align:center;padding:1rem;background:var(--color-bg);border-radius:var(--radius-md);border:2px solid var(--color-border);">
                                        <div style="font-size:1.5rem;font-weight:900;">2 + 8 = ?</div>
                                        <div style="margin-top:0.5rem;">2 prsta + još 8</div>
                                        <div style="margin-top:0.5rem;color:var(--color-success);font-weight:700;">→ 10 ✓</div>
                                    </div>
                                </div>
                            </div>
                        `
                    },
                    {
                        title: "Brzi kviz — znaš li napamet?",
                        html: `
                            <div class="learn-explanation">
                                Cilj je znati <strong>odmah</strong>, bez brojanja!
                            </div>
                            <div class="learn-visual">
                                <div class="learn-mini-quiz">
                                    <h4>🧠 Koliko treba broju 7 da bude 10?</h4>
                                    <div class="learn-mini-options">
                                        <button class="learn-mini-btn" data-answer="2" data-correct="3">2</button>
                                        <button class="learn-mini-btn" data-answer="3" data-correct="3">3</button>
                                        <button class="learn-mini-btn" data-answer="4" data-correct="3">4</button>
                                        <button class="learn-mini-btn" data-answer="5" data-correct="3">5</button>
                                    </div>
                                </div>
                                <div style="margin-top:1.5rem;text-align:center;">
                                    <div class="learn-step-complete">
                                        <span class="celebration-emoji">🎉</span>
                                        <div style="font-size:1.2rem;font-weight:700;color:var(--color-success);">
                                            Sada znaš prijatelje broja 10!
                                        </div>
                                        <div style="margin-top:0.5rem;color:var(--color-text-light);">
                                            Idemo na vježbu ili kviz!
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `,
                        interactiveType: 'miniQuiz'
                    }
                );
                break;
                
            case 1: // Jednoznamenkasto zbrajanje
                steps.push(
                    {
                        title: "Zadrži veći broj u glavi",
                        html: `
                            <div class="learn-explanation">
                                Ne trebaš brojati od 1. Samo <strong>zadrži veći broj</strong> i dodaj manji.
                            </div>
                            <div class="learn-visual">
                                <div class="learn-equation">
                                    <span class="eq-num">5</span>
                                    <span class="eq-op">+</span>
                                    <span class="eq-num highlight">3</span>
                                    <span class="eq-op">=</span>
                                    <span class="eq-num">?</span>
                                </div>
                                <div class="learn-explanation" style="margin-top:1rem;">
                                    Zadrži <strong>5</strong> u glavi. Dodaj 3:<br>
                                    <span style="font-size:1.3rem;font-weight:800;color:var(--color-secondary);">5 → 6 → 7 → 8</span>
                                </div>
                            </div>
                        `
                    },
                    {
                        title: "Vježbajmo s drugim primjerom",
                        html: `
                            <div class="learn-explanation">
                                <strong>7 + 2</strong> — što je veći broj?
                            </div>
                            <div class="learn-visual">
                                <div class="learn-equation">
                                    <span class="eq-num">7</span>
                                    <span class="eq-op">+</span>
                                    <span class="eq-num">2</span>
                                    <span class="eq-op">=</span>
                                    <span class="eq-num">?</span>
                                </div>
                                <div style="display:flex;align-items:center;gap:1rem;justify-content:center;margin:1rem 0;">
                                    <div style="text-align:center;">
                                        <div style="font-size:2rem;">😊</div>
                                        <div style="font-size:1.5rem;font-weight:900;">7</div>
                                        <div style="font-size:0.8rem;color:var(--color-text-light);">Zadrži ovog</div>
                                    </div>
                                    <div style="font-size:2rem;">+</div>
                                    <div style="text-align:center;opacity:0.5;">
                                        <div style="font-size:1.5rem;">2</div>
                                        <div style="font-size:0.8rem;">Dodaj ovo</div>
                                    </div>
                                </div>
                                <div class="learn-explanation">
                                    <strong>7</strong> u glavi → dodaj 2 → <strong style="color:var(--color-success);">9!</strong>
                                </div>
                            </div>
                        `
                    },
                    {
                        title: "Još jedan trik",
                        html: `
                            <div class="learn-explanation">
                                Ponekad je lakše zamijeniti brojeve:
                            </div>
                            <div class="learn-visual">
                                <div class="learn-equation">
                                    <span class="eq-num">2</span>
                                    <span class="eq-op">+</span>
                                    <span class="eq-num highlight">6</span>
                                    <span class="eq-op">=</span>
                                    <span class="eq-num">?</span>
                                </div>
                                <div style="text-align:center;margin:1rem 0;">
                                    <div style="font-size:1.2rem;margin-bottom:0.5rem;">Isto je kao:</div>
                                    <div class="learn-equation">
                                        <span class="eq-num highlight">6</span>
                                        <span class="eq-op">+</span>
                                        <span class="eq-num">2</span>
                                        <span class="eq-op">=</span>
                                        <span class="eq-num" style="background:var(--color-success);color:white;border-color:var(--color-success);">8</span>
                                    </div>
                                </div>
                                <div class="learn-explanation">
                                    Zadrži <strong>veći</strong> broj — lakše je!
                                </div>
                            </div>
                        `
                    },
                    {
                        title: "Brzo provjeri! 🧠",
                        html: `
                            <div class="learn-explanation">
                                Pokušaj odmah — bez brojanja od 1:
                            </div>
                            <div class="learn-visual">
                                <div class="learn-mini-quiz">
                                    <h4>🎯 Koliko je 4 + 3?</h4>
                                    <div class="learn-mini-options">
                                        <button class="learn-mini-btn" data-answer="6" data-correct="7">6</button>
                                        <button class="learn-mini-btn" data-answer="7" data-correct="7">7</button>
                                        <button class="learn-mini-btn" data-answer="8" data-correct="7">8</button>
                                        <button class="learn-mini-btn" data-answer="5" data-correct="7">5</button>
                                    </div>
                                </div>
                                <div class="learn-mini-quiz" style="margin-top:1rem;background:linear-gradient(135deg,#E3F2FD 0%,#BBDEFB 100%);border-color:#90CAF9;">
                                    <h4 style="color:#1565C0;">🎯 Koliko je 5 + 4?</h4>
                                    <div class="learn-mini-options">
                                        <button class="learn-mini-btn" data-answer="8" data-correct="9">8</button>
                                        <button class="learn-mini-btn" data-answer="9" data-correct="9">9</button>
                                        <button class="learn-mini-btn" data-answer="10" data-correct="9">10</button>
                                        <button class="learn-mini-btn" data-answer="7" data-correct="9">7</button>
                                    </div>
                                </div>
                                <div style="margin-top:1.5rem;text-align:center;">
                                    <div class="learn-step-complete">
                                        <span class="celebration-emoji">🎉</span>
                                        <div style="font-size:1.2rem;font-weight:700;color:var(--color-success);">
                                            Odlično! Sada znaš zbrajati!
                                        </div>
                                        <div style="margin-top:0.5rem;color:var(--color-text-light);">
                                            Zadrži veći broj, dodaj manji.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `,
                        interactiveType: 'miniQuiz'
                    }
                );
                break;
                
            case 2: // Zbrajanje preko 10
                steps.push(
                    {
                        title: "Napravi 10, pa nastavi!",
                        html: `
                            <div class="learn-explanation">
                                <strong>Trik:</strong> Prvo napravi <strong>10</strong>, pa onda zbroji ostatak!
                            </div>
                            <div class="learn-visual">
                                <div class="learn-equation" style="font-size:2rem;">
                                    <span class="eq-num">8</span>
                                    <span class="eq-op">+</span>
                                    <span class="eq-num">5</span>
                                    <span class="eq-op">=</span>
                                    <span class="eq-num">?</span>
                                </div>
                                <div style="display:flex;align-items:center;gap:0.5rem;justify-content:center;margin:1rem 0;flex-wrap:wrap;">
                                    <div class="learn-block blue">8</div>
                                    <div style="font-size:1.5rem;">treba</div>
                                    <div class="learn-block green highlight">2</div>
                                    <div style="font-size:1.5rem;">do 10!</div>
                                </div>
                                <div style="text-align:center;margin:1rem 0;">
                                    <div style="font-size:1.3rem;margin-bottom:0.5rem;">Zato rastavimo 5 na <strong>2</strong> i <strong>3</strong>:</div>
                                    <div class="learn-equation">
                                        <span class="eq-num">5</span>
                                        <span class="eq-op">=</span>
                                        <span class="eq-num highlight">2</span>
                                        <span class="eq-op">+</span>
                                        <span class="eq-num">3</span>
                                    </div>
                                </div>
                            </div>
                        `
                    },
                    {
                        title: "🧺 Povuci jabuke u košaru!",
                        html: `
                            <div class="learn-explanation">
                                Imamo <strong>8 jabuka</strong> u košari. Donesi još od <strong>5</strong> da napuniš do 10!
                            </div>
                            <div class="learn-visual">
                                <div class="basket-game" id="basket-game" data-first="8" data-second="5">
                                    <div class="basket-area">
                                        <div class="basket-label">Košara</div>
                                        <div class="basket" id="basket">
                                            <div class="basket-silhouette">🧺</div>
                                            <div class="basket-items" id="basket-items">
                                                ${Array(8).fill().map((_,i) => `<span class="apple in-basket" data-id="in-${i}">🍎</span>`).join('')}
                                            </div>
                                            <div class="basket-count" id="basket-count">8 / 10</div>
                                        </div>
                                        <div class="target-badge" id="target-badge">Treba još 2 do 10!</div>
                                    </div>
                                    
                                    <div class="arrow-hint" id="arrow-hint">⬇ Povuci jabuke ⬇</div>
                                    
                                    <div class="outside-area" id="outside-area">
                                        <div class="outside-label">Još 5 jabuka ovdje:</div>
                                        <div class="apples-outside" id="apples-outside">
                                            ${Array(5).fill().map((_,i) => `<span class="apple draggable" draggable="true" data-id="out-${i}">🍎</span>`).join('')}
                                        </div>
                                    </div>
                                    
                                    <div class="game-result hidden" id="game-result">
                                        <div class="result-equation">
                                            <span class="eq-num" style="background:var(--color-success);color:white;">10</span>
                                            <span class="eq-op">+</span>
                                            <span class="eq-num" id="remainder-count">3</span>
                                            <span class="eq-op">=</span>
                                            <span class="eq-num" style="background:var(--color-success);color:white;">13</span>
                                        </div>
                                        <div class="result-text">U košari je 10, a ostalo je 3 vani!<br><strong>8 + 5 = 13</strong></div>
                                    </div>
                                </div>
                            </div>
                        `,
                        interactiveType: 'basketGame'
                    },
                    {
                        title: "Sada je lako!",
                        html: `
                            <div class="learn-explanation">
                                Prvo dodamo <strong>2</strong> broju 8 da napravimo 10, pa dodamo preostalu <strong>3</strong>:
                            </div>
                            <div class="learn-visual">
                                <div style="display:flex;flex-direction:column;gap:1rem;align-items:center;">
                                    <div class="learn-equation">
                                        <span class="eq-num" style="background:var(--color-success);color:white;">8 + 2</span>
                                        <span class="eq-op">=</span>
                                        <span class="eq-num" style="background:var(--color-success);color:white;">10</span>
                                    </div>
                                    <div style="font-size:1.5rem;">⬇</div>
                                    <div class="learn-equation">
                                        <span class="eq-num">10</span>
                                        <span class="eq-op">+</span>
                                        <span class="eq-num">3</span>
                                        <span class="eq-op">=</span>
                                        <span class="eq-num" style="background:var(--color-success);color:white;">13</span>
                                    </div>
                                </div>
                                <div class="learn-explanation" style="margin-top:1rem;">
                                    <strong>8 + 5 = 13</strong> ✓ Lako, zar ne?
                                </div>
                            </div>
                        `
                    },
                    {
                        title: "Još jedan primjer: 7 + 6",
                        html: `
                            <div class="learn-explanation">
                                <strong>7</strong> treba <strong>3</strong> do 10. Zato rastavimo 6 na 3 i 3.
                            </div>
                            <div class="learn-visual">
                                <div style="display:flex;flex-direction:column;gap:1rem;align-items:center;">
                                    <div style="display:flex;align-items:center;gap:0.5rem;">
                                        <div class="learn-block blue">7</div>
                                        <div style="font-size:1.3rem;">treba</div>
                                        <div class="learn-block green highlight">3</div>
                                        <div style="font-size:1.3rem;">do 10</div>
                                    </div>
                                    <div style="font-size:1.5rem;">⬇</div>
                                    <div>Rastavimo 6 → <strong>3</strong> + <strong>3</strong></div>
                                    <div style="font-size:1.5rem;">⬇</div>
                                    <div class="learn-equation">
                                        <span class="eq-num" style="background:var(--color-success);color:white;">10</span>
                                        <span class="eq-op">+</span>
                                        <span class="eq-num">3</span>
                                        <span class="eq-op">=</span>
                                        <span class="eq-num" style="background:var(--color-success);color:white;">13</span>
                                    </div>
                                </div>
                                <p style="margin-top:1rem;text-align:center;font-weight:700;color:var(--color-primary);">7 + 6 = 13 ✓</p>
                            </div>
                        `
                    },
                    {
                        title: "Znaš li sad? 🎯",
                        html: `
                            <div class="learn-explanation">
                                Pokušaj odmah — napravi 10!
                            </div>
                            <div class="learn-visual">
                                <div class="learn-mini-quiz">
                                    <h4>🧠 Koliko je 9 + 4?</h4>
                                    <div class="learn-mini-options">
                                        <button class="learn-mini-btn" data-answer="12" data-correct="13">12</button>
                                        <button class="learn-mini-btn" data-answer="13" data-correct="13">13</button>
                                        <button class="learn-mini-btn" data-answer="14" data-correct="13">14</button>
                                        <button class="learn-mini-btn" data-answer="11" data-correct="13">11</button>
                                    </div>
                                </div>
                                <div class="learn-mini-quiz" style="margin-top:1rem;background:linear-gradient(135deg,#E3F2FD 0%,#BBDEFB 100%);border-color:#90CAF9;">
                                    <h4 style="color:#1565C0;">🧠 Koliko je 6 + 5?</h4>
                                    <div class="learn-mini-options">
                                        <button class="learn-mini-btn" data-answer="10" data-correct="11">10</button>
                                        <button class="learn-mini-btn" data-answer="12" data-correct="11">12</button>
                                        <button class="learn-mini-btn" data-answer="11" data-correct="11">11</button>
                                        <button class="learn-mini-btn" data-answer="13" data-correct="11">13</button>
                                    </div>
                                </div>
                                <div style="margin-top:1.5rem;text-align:center;">
                                    <div class="learn-step-complete">
                                        <span class="celebration-emoji">🎉</span>
                                        <div style="font-size:1.2rem;font-weight:700;color:var(--color-success);">
                                            Sjajno! Znaš zbrajati preko 10!
                                        </div>
                                        <div style="margin-top:0.5rem;color:var(--color-text-light);">
                                            Prvo napravi 10, pa nastavi.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `,
                        interactiveType: 'miniQuiz'
                    }
                );
                break;
                
            case 3: // Osnovno oduzimanje
                steps.push(
                    {
                        title: "Makni dio, vidi ostatak! ➖",
                        html: `
                            <div class="learn-explanation">
                                <strong>Oduzimanje</strong> znači: imam nešto, maknem dio, vidim koliko ostaje.
                            </div>
                            <div class="learn-visual">
                                <div style="text-align:center;margin-bottom:1rem;font-size:1.1rem;">Klikni kocke da ih "makneš"!</div>
                                <div class="learn-blocks-interactive" data-target="10">
                                    ${Array(10).fill().map((_,i) => `<div class="learn-block-interactive ${i < 6 ? 'blue' : ''}" style="${i < 6 ? 'background:#E3F2FD;border-color:#90CAF9;color:#1565C0;' : 'background:var(--color-bg);border:2px dashed var(--color-border);color:var(--color-text-light);'}">${i < 6 ? '10' : ''}</div>`).join('')}
                                </div>
                                <p style="color:var(--color-text-light);margin-top:0.5rem;text-align:center;">Imamo 10. Ako maknemo 6, ostane 4.</p>
                                <div style="margin-top:1rem;font-size:1.3rem;text-align:center;">
                                    <span style="color:var(--color-primary);font-weight:900;">10 - 6 = 4</span> ✨
                                </div>
                            </div>
                        `,
                        interactiveType: 'countBlocks'
                    },
                    {
                        title: "Oduzimanje i zbrajanje su prijatelji! 🤝",
                        html: `
                            <div class="learn-explanation">
                                Ako znaš zbrajanje, znaš i oduzimanje!
                            </div>
                            <div class="learn-visual">
                                <div style="display:flex;flex-direction:column;gap:1rem;align-items:center;">
                                    <div style="font-size:1.5rem;font-weight:700;">6 + 4 = 10</div>
                                    <div style="font-size:2rem;">⬇</div>
                                    <div style="font-size:1.5rem;font-weight:700;color:var(--color-success);">10 - 6 = 4</div>
                                    <div style="font-size:1.2rem;color:var(--color-text-light);">Isto je, samo okrenuto!</div>
                                </div>
                                <div style="margin-top:1.5rem;background:var(--color-bg);padding:1rem;border-radius:var(--radius-md);text-align:center;">
                                    <strong style="color:var(--color-primary);">Pravilo:</strong><br>
                                    Ako je A + B = C, onda je C - A = B
                                </div>
                            </div>
                        `
                    },
                    {
                        title: "Brzo provjeri! 🧠",
                        html: `
                            <div class="learn-explanation">
                                Pokušaj odmah — makni dio i vidi ostatak:
                            </div>
                            <div class="learn-visual">
                                <div class="learn-mini-quiz">
                                    <h4>🎯 Koliko je 8 - 3?</h4>
                                    <div class="learn-mini-options">
                                        <button class="learn-mini-btn" data-answer="4" data-correct="5">4</button>
                                        <button class="learn-mini-btn" data-answer="5" data-correct="5">5</button>
                                        <button class="learn-mini-btn" data-answer="6" data-correct="5">6</button>
                                        <button class="learn-mini-btn" data-answer="3" data-correct="5">3</button>
                                    </div>
                                </div>
                                <div class="learn-mini-quiz" style="margin-top:1rem;background:linear-gradient(135deg,#E3F2FD 0%,#BBDEFB 100%);border-color:#90CAF9;">
                                    <h4 style="color:#1565C0;">🎯 Koliko je 9 - 4?</h4>
                                    <div class="learn-mini-options">
                                        <button class="learn-mini-btn" data-answer="4" data-correct="5">4</button>
                                        <button class="learn-mini-btn" data-answer="6" data-correct="5">6</button>
                                        <button class="learn-mini-btn" data-answer="5" data-correct="5">5</button>
                                        <button class="learn-mini-btn" data-answer="3" data-correct="5">3</button>
                                    </div>
                                </div>
                                <div style="margin-top:1.5rem;text-align:center;">
                                    <div class="learn-step-complete">
                                        <span class="celebration-emoji">🎉</span>
                                        <div style="font-size:1.2rem;font-weight:700;color:var(--color-success);">
                                            Odlično! Znaš oduzimati!
                                        </div>
                                        <div style="margin-top:0.5rem;color:var(--color-text-light);">
                                            Makni dio, vidi ostatak.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `,
                        interactiveType: 'miniQuiz'
                    }
                );
                break;

            case 4: // Oduzimanje kao udaljenost
                steps.push(
                    {
                        title: "Skoči do 10, pa do cilja! 🚀",
                        html: `
                            <div class="learn-explanation">
                                Ponekad ne moramo ništa micati. Samo gledamo koliko je jedan broj daleko od drugog.
                            </div>
                            <div class="learn-visual">
                                <div style="text-align:center;margin-bottom:1.5rem;">
                                    <div style="font-size:2rem;font-weight:900;color:var(--color-primary);margin-bottom:1rem;">13 - 8 = ?</div>
                                    <div class="learn-number-line-interactive">
                                        ${[8,9,10,11,12,13].map((n, i) => `
                                            <div class="learn-num-tile ${n===8?'highlight':n===13?'target':n===10?'special':''}" data-answer="${i}" data-correct="5">${n}</div>
                                        `).join('')}
                                    </div>
                                    <div style="font-size:0.85rem;color:var(--color-text-light);margin-top:0.5rem;">Od 8 do 10 je 2, od 10 do 13 je 3. Ukupno 5!</div>
                                </div>
                                <div style="margin-top:1rem;font-size:1.3rem;text-align:center;">
                                    <span style="color:var(--color-primary);font-weight:900;">8 → 10 (2 skoka) → 13 (3 skoka) = 5</span> ✨
                                </div>
                            </div>
                        `,
                        interactiveType: 'numberLine'
                    },
                    {
                        title: "Još jedan primjer: 15 - 7",
                        html: `
                            <div class="learn-explanation">
                                Skoči do 10, pa nastavi!
                            </div>
                            <div class="learn-visual">
                                <div style="display:flex;flex-direction:column;gap:1rem;align-items:center;">
                                    <div style="font-size:1.5rem;font-weight:700;">15 - 7</div>
                                    <div style="display:flex;align-items:center;gap:0.5rem;font-size:1.2rem;">
                                        <span style="color:var(--color-primary);font-weight:800;">7</span>
                                        <span>→</span>
                                        <span style="color:var(--color-success);font-weight:800;">10</span>
                                        <span>(3 skoka)</span>
                                    </div>
                                    <div style="display:flex;align-items:center;gap:0.5rem;font-size:1.2rem;">
                                        <span style="color:var(--color-success);font-weight:800;">10</span>
                                        <span>→</span>
                                        <span style="color:var(--color-primary);font-weight:800;">15</span>
                                        <span>(5 skokova)</span>
                                    </div>
                                    <div style="font-size:1.5rem;font-weight:900;color:var(--color-success);">3 + 5 = 8</div>
                                </div>
                            </div>
                        `
                    },
                    {
                        title: "Znaš li sad? 🎯",
                        html: `
                            <div class="learn-explanation">
                                Pokušaj skočiti do 10!
                            </div>
                            <div class="learn-visual">
                                <div class="learn-mini-quiz">
                                    <h4>🧠 Koliko je 14 - 9?</h4>
                                    <div class="learn-mini-options">
                                        <button class="learn-mini-btn" data-answer="4" data-correct="5">4</button>
                                        <button class="learn-mini-btn" data-answer="5" data-correct="5">5</button>
                                        <button class="learn-mini-btn" data-answer="6" data-correct="5">6</button>
                                        <button class="learn-mini-btn" data-answer="3" data-correct="5">3</button>
                                    </div>
                                </div>
                                <div class="learn-mini-quiz" style="margin-top:1rem;background:linear-gradient(135deg,#E3F2FD 0%,#BBDEFB 100%);border-color:#90CAF9;">
                                    <h4 style="color:#1565C0;">🧠 Koliko je 12 - 7?</h4>
                                    <div class="learn-mini-options">
                                        <button class="learn-mini-btn" data-answer="4" data-correct="5">4</button>
                                        <button class="learn-mini-btn" data-answer="6" data-correct="5">6</button>
                                        <button class="learn-mini-btn" data-answer="5" data-correct="5">5</button>
                                        <button class="learn-mini-btn" data-answer="3" data-correct="5">3</button>
                                    </div>
                                </div>
                                <div style="margin-top:1.5rem;text-align:center;">
                                    <div class="learn-step-complete">
                                        <span class="celebration-emoji">🎉</span>
                                        <div style="font-size:1.2rem;font-weight:700;color:var(--color-success);">
                                            Sjajno! Znaš skakati do 10!
                                        </div>
                                        <div style="margin-top:0.5rem;color:var(--color-text-light);">
                                            Skoči do 10, pa do cilja.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `,
                        interactiveType: 'miniQuiz'
                    }
                );
                break;

            case 5: // Dvoznamenkasto zbrajanje
                steps.push(
                    {
                        title: "Rastavi broj na desetice i jedinice! 🔢",
                        html: `
                            <div class="learn-explanation">
                                Dvoznamenkasti broj ima veliki dio (desetice) i mali dio (jedinice).
                            </div>
                            <div class="learn-visual">
                                <div style="display:flex;flex-direction:column;gap:1rem;align-items:center;">
                                    <div style="font-size:2rem;font-weight:900;">42</div>
                                    <div style="display:flex;gap:1rem;">
                                        <div style="text-align:center;padding:1rem;background:#E3F2FD;border-radius:var(--radius-md);border:2px solid #90CAF9;">
                                            <div style="font-size:1.5rem;font-weight:800;color:#1565C0;">40</div>
                                            <div style="font-size:0.8rem;">desetice</div>
                                        </div>
                                        <div style="text-align:center;padding:1rem;background:#FFF3E0;border-radius:var(--radius-md);border:2px solid #FFB74D;">
                                            <div style="font-size:1.5rem;font-weight:800;color:#E65100;">2</div>
                                            <div style="font-size:0.8rem;">jedinice</div>
                                        </div>
                                    </div>
                                    <div style="font-size:1.5rem;">40 + 2 = 42</div>
                                </div>
                            </div>
                        `
                    },
                    {
                        title: "Prvo desetice, onda jedinice! ➕",
                        html: `
                            <div class="learn-explanation">
                                Zbrojimo velike dijelove, pa male dijelove.
                            </div>
                            <div class="learn-visual">
                                <div style="display:flex;flex-direction:column;gap:1rem;align-items:center;">
                                    <div style="font-size:1.8rem;font-weight:900;">42 + 35</div>
                                    <div style="display:flex;align-items:center;gap:0.5rem;font-size:1.2rem;">
                                        <span>40 + 30 =</span>
                                        <span style="color:var(--color-success);font-weight:800;">70</span>
                                    </div>
                                    <div style="display:flex;align-items:center;gap:0.5rem;font-size:1.2rem;">
                                        <span>2 + 5 =</span>
                                        <span style="color:var(--color-success);font-weight:800;">7</span>
                                    </div>
                                    <div style="font-size:1.5rem;font-weight:900;color:var(--color-primary);">70 + 7 = 77</div>
                                </div>
                            </div>
                        `
                    },
                    {
                        title: "Vježbajmo! 🧠",
                        html: `
                            <div class="learn-explanation">
                                Prvo desetice, onda jedinice!
                            </div>
                            <div class="learn-visual">
                                <div class="learn-mini-quiz">
                                    <h4>🎯 Koliko je 24 + 13?</h4>
                                    <div class="learn-mini-options">
                                        <button class="learn-mini-btn" data-answer="36" data-correct="37">36</button>
                                        <button class="learn-mini-btn" data-answer="37" data-correct="37">37</button>
                                        <button class="learn-mini-btn" data-answer="38" data-correct="37">38</button>
                                        <button class="learn-mini-btn" data-answer="47" data-correct="37">47</button>
                                    </div>
                                </div>
                                <div class="learn-mini-quiz" style="margin-top:1rem;background:linear-gradient(135deg,#E3F2FD 0%,#BBDEFB 100%);border-color:#90CAF9;">
                                    <h4 style="color:#1565C0;">🎯 Koliko je 52 + 34?</h4>
                                    <div class="learn-mini-options">
                                        <button class="learn-mini-btn" data-answer="85" data-correct="86">85</button>
                                        <button class="learn-mini-btn" data-answer="88" data-correct="86">88</button>
                                        <button class="learn-mini-btn" data-answer="86" data-correct="86">86</button>
                                        <button class="learn-mini-btn" data-answer="76" data-correct="86">76</button>
                                    </div>
                                </div>
                                <div style="margin-top:1.5rem;text-align:center;">
                                    <div class="learn-step-complete">
                                        <span class="celebration-emoji">🎉</span>
                                        <div style="font-size:1.2rem;font-weight:700;color:var(--color-success);">
                                            Super! Znaš zbrajati velike brojeve!
                                        </div>
                                        <div style="margin-top:0.5rem;color:var(--color-text-light);">
                                            Prvo desetice, onda jedinice.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `,
                        interactiveType: 'miniQuiz'
                    }
                );
                break;

            case 6: // Zbrajanje zaokruživanjem
                steps.push(
                    {
                        title: "Daj malo jednom broju! ✨",
                        html: `
                            <div class="learn-explanation">
                                Jedan broj pretvori u lijepi broj (20, 30, 40, 50), a drugi prilagodi.
                            </div>
                            <div class="learn-visual">
                                <div style="display:flex;flex-direction:column;gap:1rem;align-items:center;">
                                    <div style="font-size:1.8rem;font-weight:900;">29 + 16</div>
                                    <div style="display:flex;align-items:center;gap:0.5rem;font-size:1.2rem;">
                                        <span>29 treba</span>
                                        <span style="color:var(--color-success);font-weight:800;">1</span>
                                        <span>do 30</span>
                                    </div>
                                    <div style="font-size:1.2rem;">Uzmemo 1 od 16 → ostane 15</div>
                                    <div style="font-size:1.5rem;font-weight:900;color:var(--color-primary);">30 + 15 = 45</div>
                                </div>
                            </div>
                        `
                    },
                    {
                        title: "Napravi lijep broj, pa zbroji! 🎯",
                        html: `
                            <div class="learn-explanation">
                                To nije varanje, to je pametno računanje!
                            </div>
                            <div class="learn-visual">
                                <div style="display:flex;flex-direction:column;gap:1rem;align-items:center;">
                                    <div style="font-size:1.8rem;font-weight:900;">38 + 25</div>
                                    <div style="display:flex;align-items:center;gap:0.5rem;font-size:1.2rem;">
                                        <span>38 treba</span>
                                        <span style="color:var(--color-success);font-weight:800;">2</span>
                                        <span>do 40</span>
                                    </div>
                                    <div style="font-size:1.2rem;">Uzmemo 2 od 25 → ostane 23</div>
                                    <div style="font-size:1.5rem;font-weight:900;color:var(--color-primary);">40 + 23 = 63</div>
                                </div>
                            </div>
                        `
                    },
                    {
                        title: "Vježbajmo! 🧠",
                        html: `
                            <div class="learn-explanation">
                                Daj malo jednom broju da postane lijep!
                            </div>
                            <div class="learn-visual">
                                <div class="learn-mini-quiz">
                                    <h4>🎯 Koliko je 19 + 27?</h4>
                                    <div class="learn-mini-options">
                                        <button class="learn-mini-btn" data-answer="45" data-correct="46">45</button>
                                        <button class="learn-mini-btn" data-answer="46" data-correct="46">46</button>
                                        <button class="learn-mini-btn" data-answer="44" data-correct="46">44</button>
                                        <button class="learn-mini-btn" data-answer="36" data-correct="46">36</button>
                                    </div>
                                </div>
                                <div class="learn-mini-quiz" style="margin-top:1rem;background:linear-gradient(135deg,#E3F2FD 0%,#BBDEFB 100%);border-color:#90CAF9;">
                                    <h4 style="color:#1565C0;">🎯 Koliko je 49 + 18?</h4>
                                    <div class="learn-mini-options">
                                        <button class="learn-mini-btn" data-answer="66" data-correct="67">66</button>
                                        <button class="learn-mini-btn" data-answer="68" data-correct="67">68</button>
                                        <button class="learn-mini-btn" data-answer="67" data-correct="67">67</button>
                                        <button class="learn-mini-btn" data-answer="57" data-correct="67">57</button>
                                    </div>
                                </div>
                                <div style="margin-top:1.5rem;text-align:center;">
                                    <div class="learn-step-complete">
                                        <span class="celebration-emoji">🎉</span>
                                        <div style="font-size:1.2rem;font-weight:700;color:var(--color-success);">
                                            Pametno računanje!
                                        </div>
                                        <div style="margin-top:0.5rem;color:var(--color-text-light);">
                                            Daj malo jednom broju da postane lijep.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `,
                        interactiveType: 'miniQuiz'
                    }
                );
                break;

            case 7: // Množenje kao grupe
                steps.push(
                    {
                        title: "Množenje su jednake grupe! 🍪",
                        html: `
                            <div class="learn-explanation">
                                Množenje nije tablica koju treba bubati. Množenje znači: više jednakih grupa.
                            </div>
                            <div class="learn-visual">
                                <div style="text-align:center;margin-bottom:1rem;font-size:1.1rem;">3 tanjura, na svakom 4 keksa:</div>
                                <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
                                    ${Array(3).fill().map((_,i) => `
                                        <div style="text-align:center;">
                                            <div style="font-size:0.8rem;margin-bottom:0.3rem;">Tanjur ${i+1}</div>
                                            <div style="display:flex;gap:0.3rem;">
                                                ${Array(4).fill().map(() => `<span style="font-size:1.5rem;">🍪</span>`).join('')}
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                                <div style="margin-top:1rem;font-size:1.3rem;text-align:center;">
                                    <span style="color:var(--color-primary);font-weight:900;">3 × 4 = 12</span> ✨
                                </div>
                            </div>
                        `
                    },
                    {
                        title: "Prebroj grupe! 🔢",
                        html: `
                            <div class="learn-explanation">
                                Broj grupa × Broj u svakoj grupi = Ukupno
                            </div>
                            <div class="learn-visual">
                                <div style="display:flex;flex-direction:column;gap:1rem;align-items:center;">
                                    <div style="display:flex;gap:0.5rem;justify-content:center;">
                                        ${Array(5).fill().map(() => `<span style="font-size:2rem;">🎈</span>`).join('')}
                                    </div>
                                    <div style="font-size:1.2rem;">5 grupa, svaka ima 1 balon = 5 × 1 = 5</div>
                                    <div style="display:flex;gap:0.5rem;justify-content:center;">
                                        ${Array(2).fill().map(() => `
                                            <div style="display:flex;gap:0.3rem;">
                                                ${Array(3).fill().map(() => `<span style="font-size:1.5rem;">⭐</span>`).join('')}
                                            </div>
                                        `).join('')}
                                    </div>
                                    <div style="font-size:1.2rem;">2 grupe, svaka ima 3 zvjezdice = 2 × 3 = 6</div>
                                </div>
                            </div>
                        `
                    },
                    {
                        title: "Znaš li? 🎯",
                        html: `
                            <div class="learn-explanation">
                                Koliko je ukupno?
                            </div>
                            <div class="learn-visual">
                                <div class="learn-mini-quiz">
                                    <h4>🧠 4 × 2 = ?</h4>
                                    <div class="learn-mini-options">
                                        <button class="learn-mini-btn" data-answer="6" data-correct="8">6</button>
                                        <button class="learn-mini-btn" data-answer="8" data-correct="8">8</button>
                                        <button class="learn-mini-btn" data-answer="10" data-correct="8">10</button>
                                        <button class="learn-mini-btn" data-answer="4" data-correct="8">4</button>
                                    </div>
                                </div>
                                <div class="learn-mini-quiz" style="margin-top:1rem;background:linear-gradient(135deg,#E3F2FD 0%,#BBDEFB 100%);border-color:#90CAF9;">
                                    <h4 style="color:#1565C0;">🧠 3 × 3 = ?</h4>
                                    <div class="learn-mini-options">
                                        <button class="learn-mini-btn" data-answer="6" data-correct="9">6</button>
                                        <button class="learn-mini-btn" data-answer="8" data-correct="9">8</button>
                                        <button class="learn-mini-btn" data-answer="9" data-correct="9">9</button>
                                        <button class="learn-mini-btn" data-answer="12" data-correct="9">12</button>
                                    </div>
                                </div>
                                <div style="margin-top:1.5rem;text-align:center;">
                                    <div class="learn-step-complete">
                                        <span class="celebration-emoji">🎉</span>
                                        <div style="font-size:1.2rem;font-weight:700;color:var(--color-success);">
                                            Sjajno! Znaš množiti!
                                        </div>
                                        <div style="margin-top:0.5rem;color:var(--color-text-light);">
                                            Množenje su jednake grupe.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `,
                        interactiveType: 'miniQuiz'
                    }
                );
                break;

            case 8: // Duplo, pola, ×5 i ×10
                steps.push(
                    {
                        title: "Duplo znači ×2! ⚡",
                        html: `
                            <div class="learn-explanation">
                                Duplo je isto što i množiti s 2.
                            </div>
                            <div class="learn-visual">
                                <div style="display:flex;flex-direction:column;gap:1rem;align-items:center;">
                                    <div style="font-size:1.5rem;">Duplo od 7:</div>
                                    <div style="display:flex;gap:0.5rem;">
                                        <span style="font-size:2rem;">🍎</span>
                                        <span style="font-size:2rem;">🍎</span>
                                        <span style="font-size:2rem;">🍎</span>
                                        <span style="font-size:2rem;">🍎</span>
                                        <span style="font-size:2rem;">🍎</span>
                                        <span style="font-size:2rem;">🍎</span>
                                        <span style="font-size:2rem;">🍎</span>
                                        <span style="font-size:2rem;">🍎</span>
                                        <span style="font-size:2rem;">🍎</span>
                                        <span style="font-size:2rem;">🍎</span>
                                        <span style="font-size:2rem;">🍎</span>
                                        <span style="font-size:2rem;">🍎</span>
                                        <span style="font-size:2rem;">🍎</span>
                                        <span style="font-size:2rem;">🍎</span>
                                    </div>
                                    <div style="font-size:1.5rem;font-weight:900;color:var(--color-primary);">7 × 2 = 14</div>
                                </div>
                            </div>
                        `
                    },
                    {
                        title: "Pola je podijeli na 2! 🔢",
                        html: `
                            <div class="learn-explanation">
                                Pola je isto što i podijeliti s 2.
                            </div>
                            <div class="learn-visual">
                                <div style="display:flex;flex-direction:column;gap:1rem;align-items:center;">
                                    <div style="font-size:1.5rem;">Pola od 10:</div>
                                    <div style="display:flex;gap:0.5rem;">
                                        <span style="font-size:2rem;">🍎</span>
                                        <span style="font-size:2rem;">🍎</span>
                                        <span style="font-size:2rem;">🍎</span>
                                        <span style="font-size:2rem;">🍎</span>
                                        <span style="font-size:2rem;">🍎</span>
                                    </div>
                                    <div style="font-size:1.5rem;font-weight:900;color:var(--color-primary);">10 ÷ 2 = 5</div>
                                </div>
                            </div>
                        `
                    },
                    {
                        title: "×5 je pola od ×10! 🎯",
                        html: `
                            <div class="learn-explanation">
                                ×10 je lako (samo dodaj 0). ×5 je pola od toga.
                            </div>
                            <div class="learn-visual">
                                <div style="display:flex;flex-direction:column;gap:1rem;align-items:center;">
                                    <div style="font-size:1.2rem;">7 × 10 = 70</div>
                                    <div style="font-size:1.2rem;">Pola od 70 = 35</div>
                                    <div style="font-size:1.5rem;font-weight:900;color:var(--color-success);">7 × 5 = 35</div>
                                </div>
                            </div>
                        `
                    },
                    {
                        title: "Vježbajmo! 🧠",
                        html: `
                            <div class="learn-explanation">
                                Duplo, pola, ×5 i ×10!
                            </div>
                            <div class="learn-visual">
                                <div class="learn-mini-quiz">
                                    <h4>🎯 Koliko je 6 × 5?</h4>
                                    <div class="learn-mini-options">
                                        <button class="learn-mini-btn" data-answer="25" data-correct="30">25</button>
                                        <button class="learn-mini-btn" data-answer="35" data-correct="30">35</button>
                                        <button class="learn-mini-btn" data-answer="30" data-correct="30">30</button>
                                        <button class="learn-mini-btn" data-answer="20" data-correct="30">20</button>
                                    </div>
                                </div>
                                <div class="learn-mini-quiz" style="margin-top:1rem;background:linear-gradient(135deg,#E3F2FD 0%,#BBDEFB 100%);border-color:#90CAF9;">
                                    <h4 style="color:#1565C0;">🎯 Koliko je 8 × 10?</h4>
                                    <div class="learn-mini-options">
                                        <button class="learn-mini-btn" data-answer="18" data-correct="80">18</button>
                                        <button class="learn-mini-btn" data-answer="80" data-correct="80">80</button>
                                        <button class="learn-mini-btn" data-answer="88" data-correct="80">88</button>
                                        <button class="learn-mini-btn" data-answer="8" data-correct="80">8</button>
                                    </div>
                                </div>
                                <div style="margin-top:1.5rem;text-align:center;">
                                    <div class="learn-step-complete">
                                        <span class="celebration-emoji">🎉</span>
                                        <div style="font-size:1.2rem;font-weight:700;color:var(--color-success);">
                                            Odlično! Znaš pametno množiti!
                                        </div>
                                        <div style="margin-top:0.5rem;color:var(--color-text-light);">
                                            ×2 je duplo. ×5 je pola od ×10.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `,
                        interactiveType: 'miniQuiz'
                    }
                );
                break;

            case 9: // Dijeljenje stvari
                steps.push(
                    {
                        title: "Podijeli pravedno! 🎁",
                        html: `
                            <div class="learn-explanation">
                                Dijeljenje znači: imamo nešto i pravedno dijelimo. Svi dobiju jednako.
                            </div>
                            <div class="learn-visual">
                                <div style="text-align:center;margin-bottom:1rem;font-size:1.1rem;">12 kockica podijeli na 3 tanjura:</div>
                                <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
                                    ${Array(3).fill().map((_,i) => `
                                        <div style="text-align:center;">
                                            <div style="font-size:0.8rem;margin-bottom:0.3rem;">Tanjur ${i+1}</div>
                                            <div style="display:flex;gap:0.3rem;flex-wrap:wrap;justify-content:center;">
                                                ${Array(4).fill().map(() => `<span style="font-size:1.5rem;">🎲</span>`).join('')}
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                                <div style="margin-top:1rem;font-size:1.3rem;text-align:center;">
                                    <span style="color:var(--color-primary);font-weight:900;">12 ÷ 3 = 4</span> ✨
                                </div>
                            </div>
                        `
                    },
                    {
                        title: "Dijeljenje kao obrnuto množenje! 🔄",
                        html: `
                            <div class="learn-explanation">
                                Ako znaš množenje, znaš i dijeljenje!
                            </div>
                            <div class="learn-visual">
                                <div style="display:flex;flex-direction:column;gap:1rem;align-items:center;">
                                    <div style="font-size:1.5rem;font-weight:700;">3 × 4 = 12</div>
                                    <div style="font-size:2rem;">⬇</div>
                                    <div style="font-size:1.5rem;font-weight:700;color:var(--color-success);">12 ÷ 3 = 4</div>
                                    <div style="font-size:1.2rem;color:var(--color-text-light);">Isto je, samo okrenuto!</div>
                                </div>
                            </div>
                        `
                    },
                    {
                        title: "Vježbajmo! 🧠",
                        html: `
                            <div class="learn-explanation">
                                Podijeli pravedno!
                            </div>
                            <div class="learn-visual">
                                <div class="learn-mini-quiz">
                                    <h4>🎯 Koliko je 15 ÷ 3?</h4>
                                    <div class="learn-mini-options">
                                        <button class="learn-mini-btn" data-answer="4" data-correct="5">4</button>
                                        <button class="learn-mini-btn" data-answer="6" data-correct="5">6</button>
                                        <button class="learn-mini-btn" data-answer="5" data-correct="5">5</button>
                                        <button class="learn-mini-btn" data-answer="3" data-correct="5">3</button>
                                    </div>
                                </div>
                                <div class="learn-mini-quiz" style="margin-top:1rem;background:linear-gradient(135deg,#E3F2FD 0%,#BBDEFB 100%);border-color:#90CAF9;">
                                    <h4 style="color:#1565C0;">🎯 Koliko je 20 ÷ 4?</h4>
                                    <div class="learn-mini-options">
                                        <button class="learn-mini-btn" data-answer="4" data-correct="5">4</button>
                                        <button class="learn-mini-btn" data-answer="6" data-correct="5">6</button>
                                        <button class="learn-mini-btn" data-answer="5" data-correct="5">5</button>
                                        <button class="learn-mini-btn" data-answer="8" data-correct="5">8</button>
                                    </div>
                                </div>
                                <div style="margin-top:1.5rem;text-align:center;">
                                    <div class="learn-step-complete">
                                        <span class="celebration-emoji">🎉</span>
                                        <div style="font-size:1.2rem;font-weight:700;color:var(--color-success);">
                                            Super! Znaš dijeliti!
                                        </div>
                                        <div style="margin-top:0.5rem;color:var(--color-text-light);">
                                            Podijeli pravedno.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `,
                        interactiveType: 'miniQuiz'
                    }
                );
                break;

            case 10: // Dijeljenje kao obrnuto množenje
                steps.push(
                    {
                        title: "Obitelj brojeva! 🔄",
                        html: `
                            <div class="learn-explanation">
                                Jedna obitelj brojeva daje 4 računa. Pogledaj:
                            </div>
                            <div class="learn-visual">
                                <div style="display:flex;flex-direction:column;gap:1rem;align-items:center;">
                                    <div style="font-size:1.5rem;font-weight:900;color:var(--color-primary);">3, 4, 12</div>
                                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;max-width:400px;width:100%;">
                                        <div style="text-align:center;padding:0.8rem;background:#E3F2FD;border-radius:var(--radius-md);">
                                            <div style="font-size:1.3rem;font-weight:700;">3 × 4 = 12</div>
                                        </div>
                                        <div style="text-align:center;padding:0.8rem;background:#E3F2FD;border-radius:var(--radius-md);">
                                            <div style="font-size:1.3rem;font-weight:700;">4 × 3 = 12</div>
                                        </div>
                                        <div style="text-align:center;padding:0.8rem;background:#FFF3E0;border-radius:var(--radius-md);">
                                            <div style="font-size:1.3rem;font-weight:700;">12 ÷ 3 = 4</div>
                                        </div>
                                        <div style="text-align:center;padding:0.8rem;background:#FFF3E0;border-radius:var(--radius-md);">
                                            <div style="font-size:1.3rem;font-weight:700;">12 ÷ 4 = 3</div>
                                        </div>
                                    </div>
                                    <div style="font-size:1rem;color:var(--color-text-light);">Sva 4 računa koriste iste brojeve!</div>
                                </div>
                            </div>
                        `
                    },
                    {
                        title: "Sve 4 računske operacije! ➕➖✖➗",
                        html: `
                            <div class="learn-explanation">
                                Zbrajanje i oduzimanje su prijatelji. Množenje i dijeljenje su prijatelji.
                            </div>
                            <div class="learn-visual">
                                <div style="display:flex;flex-direction:column;gap:1rem;align-items:center;">
                                    <div style="font-size:1.3rem;">Ako znaš jedno, znaš i drugo!</div>
                                    <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
                                        <div style="text-align:center;padding:1rem;background:var(--color-bg);border-radius:var(--radius-md);border:2px solid var(--color-border);">
                                            <div style="font-size:1.2rem;font-weight:700;">5 + 3 = 8</div>
                                            <div style="font-size:1rem;">8 - 5 = 3</div>
                                        </div>
                                        <div style="text-align:center;padding:1rem;background:var(--color-bg);border-radius:var(--radius-md);border:2px solid var(--color-border);">
                                            <div style="font-size:1.2rem;font-weight:700;">2 × 6 = 12</div>
                                            <div style="font-size:1rem;">12 ÷ 2 = 6</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                    },
                    {
                        title: "Vježbajmo! 🧠",
                        html: `
                            <div class="learn-explanation">
                                Ako znam množenje, znam i dijeljenje!
                            </div>
                            <div class="learn-visual">
                                <div class="learn-mini-quiz">
                                    <h4>🎯 Ako je 4 × 5 = 20, koliko je 20 ÷ 4?</h4>
                                    <div class="learn-mini-options">
                                        <button class="learn-mini-btn" data-answer="4" data-correct="5">4</button>
                                        <button class="learn-mini-btn" data-answer="6" data-correct="5">6</button>
                                        <button class="learn-mini-btn" data-answer="5" data-correct="5">5</button>
                                        <button class="learn-mini-btn" data-answer="20" data-correct="5">20</button>
                                    </div>
                                </div>
                                <div class="learn-mini-quiz" style="margin-top:1rem;background:linear-gradient(135deg,#E3F2FD 0%,#BBDEFB 100%);border-color:#90CAF9;">
                                    <h4 style="color:#1565C0;">🎯 Ako je 3 × 6 = 18, koliko je 18 ÷ 3?</h4>
                                    <div class="learn-mini-options">
                                        <button class="learn-mini-btn" data-answer="5" data-correct="6">5</button>
                                        <button class="learn-mini-btn" data-answer="9" data-correct="6">9</button>
                                        <button class="learn-mini-btn" data-answer="6" data-correct="6">6</button>
                                        <button class="learn-mini-btn" data-answer="3" data-correct="6">3</button>
                                    </div>
                                </div>
                                <div style="margin-top:1.5rem;text-align:center;">
                                    <div class="learn-step-complete">
                                        <span class="celebration-emoji">🎉</span>
                                        <div style="font-size:1.2rem;font-weight:700;color:var(--color-success);">
                                            Sjajno! Znaš obitelj brojeva!
                                        </div>
                                        <div style="margin-top:0.5rem;color:var(--color-text-light);">
                                            Ako znam množenje, znam i dijeljenje.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `,
                        interactiveType: 'miniQuiz'
                    }
                );
                break;

            case 11: // Speed math trikovi
                steps.push(
                    {
                        title: "Koliko fali do 10? 🚀",
                        html: `
                            <div class="learn-explanation">
                                Kad množimo brojeve blizu 10, pitamo: "Koliko fali do 10?"
                            </div>
                            <div class="learn-visual">
                                <div style="display:flex;flex-direction:column;gap:1rem;align-items:center;">
                                    <div style="font-size:1.8rem;font-weight:900;">8 × 9</div>
                                    <div style="display:flex;gap:1rem;align-items:center;">
                                        <div style="text-align:center;">
                                            <div style="font-size:1.5rem;font-weight:800;">8</div>
                                            <div style="font-size:0.9rem;color:var(--color-text-light);">fali 2</div>
                                        </div>
                                        <div style="font-size:1.5rem;">×</div>
                                        <div style="text-align:center;">
                                            <div style="font-size:1.5rem;font-weight:800;">9</div>
                                            <div style="font-size:0.9rem;color:var(--color-text-light);">fali 1</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                    },
                    {
                        title: "Oduzmi ukriž, pomnoži male! 🎯",
                        html: `
                            <div class="learn-explanation">
                                Trik za brojeve blizu 10:
                            </div>
                            <div class="learn-visual">
                                <div style="display:flex;flex-direction:column;gap:1rem;align-items:center;">
                                    <div style="font-size:1.8rem;font-weight:900;">8 × 9</div>
                                    <div style="font-size:1.2rem;">8 - 1 = <span style="color:var(--color-success);font-weight:800;">7</span></div>
                                    <div style="font-size:1.2rem;">2 × 1 = <span style="color:var(--color-success);font-weight:800;">2</span></div>
                                    <div style="font-size:1.5rem;font-weight:900;color:var(--color-primary);">72</div>
                                    <div style="font-size:1rem;color:var(--color-text-light);">Prvi dio je 7, drugi dio je 2 → 72</div>
                                </div>
                            </div>
                        `
                    },
                    {
                        title: "Još jedan primjer! 🧠",
                        html: `
                            <div class="learn-explanation">
                                Pokušaj sada!
                            </div>
                            <div class="learn-visual">
                                <div style="display:flex;flex-direction:column;gap:1rem;align-items:center;">
                                    <div style="font-size:1.8rem;font-weight:900;">7 × 8</div>
                                    <div style="font-size:1.2rem;">7 fali 3, 8 fali 2</div>
                                    <div style="font-size:1.2rem;">7 - 2 = <span style="color:var(--color-success);font-weight:800;">5</span> (ili 8 - 3 = 5)</div>
                                    <div style="font-size:1.2rem;">3 × 2 = <span style="color:var(--color-success);font-weight:800;">6</span></div>
                                    <div style="font-size:1.5rem;font-weight:900;color:var(--color-primary);">56</div>
                                </div>
                            </div>
                        `
                    },
                    {
                        title: "Znaš li? 🎯",
                        html: `
                            <div class="learn-explanation">
                                Pokušaj trik!
                            </div>
                            <div class="learn-visual">
                                <div class="learn-mini-quiz">
                                    <h4>🧠 Koliko je 9 × 7?</h4>
                                    <div class="learn-mini-options">
                                        <button class="learn-mini-btn" data-answer="62" data-correct="63">62</button>
                                        <button class="learn-mini-btn" data-answer="64" data-correct="63">64</button>
                                        <button class="learn-mini-btn" data-answer="63" data-correct="63">63</button>
                                        <button class="learn-mini-btn" data-answer="56" data-correct="63">56</button>
                                    </div>
                                </div>
                                <div class="learn-mini-quiz" style="margin-top:1rem;background:linear-gradient(135deg,#E3F2FD 0%,#BBDEFB 100%);border-color:#90CAF9;">
                                    <h4 style="color:#1565C0;">🧠 Koliko je 6 × 9?</h4>
                                    <div class="learn-mini-options">
                                        <button class="learn-mini-btn" data-answer="52" data-correct="54">52</button>
                                        <button class="learn-mini-btn" data-answer="56" data-correct="54">56</button>
                                        <button class="learn-mini-btn" data-answer="54" data-correct="54">54</button>
                                        <button class="learn-mini-btn" data-answer="45" data-correct="54">45</button>
                                    </div>
                                </div>
                                <div style="margin-top:1.5rem;text-align:center;">
                                    <div class="learn-step-complete">
                                        <span class="celebration-emoji">🎉</span>
                                        <div style="font-size:1.2rem;font-weight:700;color:var(--color-success);">
                                            Fenomenalno! Znaš speed math!
                                        </div>
                                        <div style="margin-top:0.5rem;color:var(--color-text-light);">
                                            Koliko fali do 10? Oduzmi ukriž, pomnoži male.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `,
                        interactiveType: 'miniQuiz'
                    }
                );
                break;
        }
        
        return steps;
    }
});
