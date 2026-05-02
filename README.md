# Mentalna Matematika - Učenje kroz Igru

Interaktivna web aplikacija za učenje mentalne matematike djece i roditelja kroz zabavne igre i zadatke. Aplikacija prati 12-fazni kurikulum temeljen na filozofiji **"Prvo napravi lijep broj, onda popravi"**.

## 🎯 Značajke

### 12 Faza Učenja
1. **Prijatelji broja 10** - Nauči koji brojevi čine 10
2. **Jednoznamenkasto zbrajanje** - Zbrajaj bez brojanja od 1
3. **Zbrajanje preko 10** - Napravi 10, pa nastavi
4. **Osnovno oduzimanje** - Makni dio, vidi ostatak
5. **Oduzimanje kao udaljenost** - Skoči do 10, pa do cilja
6. **Dvoznamenkasto zbrajanje** - Prvo desetice, onda jedinice
7. **Zbrajanje zaokruživanjem** - Daj malo jednom broju da postane lijep
8. **Množenje kao grupe** - Jednake skupine
9. **Duplo, pola, ×5 i ×10** - Pametno množenje
10. **Dijeljenje stvari** - Podijeli pravedno
11. **Dijeljenje kao obrnuto množenje** - Ako znam množenje, znam i dijeljenje
12. **Speed math trikovi** - Množenje blizu 10

### Tipovi Zadataka
- **Dopuni prazninu** - Unesi točan odgovor
- **Odaberi odgovor** - Multiple choice s 4 opcije
- **Spoji parove** - Drag-and-drop matching
- **Vizualno** - Broji kružiće i grupe
- **Korak po korak** - Nauči metodu postupno

### Interaktivni Koraci Učenja
Svaka faza sadrži vizualne, interaktivne korake učenja prilagođene konceptu:
- **Faza 1** — Brojni blokovi za prijatelje broja 10, prstići, brojevna crta
- **Faza 2** — Naglašavanje većeg broja, zamjena poredka
- **Faza 3** — Košara s jabukama (povuci i ispusti) za "Napravi 10, pa nastavi"
- **Faza 4** — Klikni kocke da ih "makneš", povezivanje sa zbrajanjem
- **Faza 5** — Skokovi brojevnom crtom do 10, pa do cilja
- **Faza 6** — Rastavljanje na desetice i jedinice, vizualno zbrajanje
- **Faza 7** — Zaokruživanje na lijep broj (20, 30, 40, 50)
- **Faza 8** — Grupe tanjura/keksa/balona za množenje
- **Faza 9** — Vizualni prikaz duplo (×2), pola (÷2), ×5 i ×10
- **Faza 10** — Pravedna podjela kockica na tanjure
- **Faza 11** — Obitelj brojeva (3-4-12) za povezivanje množenja i dijeljenja
- **Faza 12** — Trik "Koliko fali do 10?" za množenje blizu 10

### Načini Igranja
- **Učenje** — Interaktivni vizualni vodič kroz metodu korak po korak
- **Vježbaj** — Uči bez pritiska
- **Kviz** - Zaradi zvjezdice (1-3 zvjezdice ovisno o točnosti)
- **Brzinski** - 10 zadataka u 60 sekundi
- **Korak po korak** - Detaljno učenje metode
- **Dnevni izazov** - Svaki dan novi izazov za posebnu nagradu

### Gamifikacija
- ⭐ Zvjezdice za točnost
- 🔥 Streak sustav za uzastopne točne odgovore
- 🏆 Medalje i dostignuća
- 🔒 Otključavanje novih faza i svjetova
- 🎉 Konfeti za odlične rezultate
- 📊 Praćenje napretka po fazama

### Roditeljski Elementi
- Savjeti za roditelje za svaku fazu
- Mentalne rečenice/mantra za lakše pamćenje
- Objasnjenja metoda i filozofije
- Povratne informacije i hintovi

---

## 📱 Mobilna i Responzivna Iskustva

Aplikacija je optimizirana za mobilne uređaje s bogatim skupom poboljšanja za dodir.

### Podržane Značajke
| Značajka | Opis |
|----------|------|
| **Swipe geste** | Lijevo/desno za navigaciju pitanja i koraka učenja |
| **Uvećane područja za dodir** | Minimalna veličina 44×44dp na svim gumbovima i karticama |
| **Landscape orijentacija** | Prilagođeni izgled za horizontalno držanje uređaja |
| **Portrait orijentacija** | Standardni vertikalni izgled optimiziran za telefone |
| **Tablet viewport** | Prilagođen raspored za tablete (601–1024 px) |
| **Safe area insets** | Podrška za "notch" i zakrivljene zaslone |
| **Touch feedback** | Aktivni stanja bez `hover` efekata |
| **Horizontal scroll snap** | Za faze u landscape načinu rada |

### Breakpointi
- **Mobilni**: < 600 px (jedan stupac, kompaktno)
- **Tablet**: 601–1024 px (2 stupca, povećani elementi)
- **Desktop**: > 1024 px (3 stupca za faze)

---

## ♿ Pristupačnost (Accessibility)

Aplikacija je dizajnirana s pristupačnošću na umu — od početka (a11y-first).

### Implementirane Značajke

#### ARIA atributi
- **`role`** na svim zaslonima (`banner`, `main`, `dialog`, `progressbar`, `timer`, `region`, `group`)
- **`aria-label`** i **`aria-labelledby`** za kontekst svim interaktivnim elementima
- **`aria-live`** na dinamičkim područjima (zvjezdice, streak, povratne informacije)
- **`aria-expanded`** na gumbu za pomoć
- **`aria-controls`** povezuje gumb pomoći s njenim sadržajem
- **`aria-hidden="true"`** na svim dekorativnim emoji ikonama i Font Awesome ikonama

#### Tipkovnična navigacija
- **Skip link** — "Preskoči na glavni sadržaj" za brzi preskok splash zaslona
- **Tab navigacija** kroz sve interaktivne elemente
- **Enter** za potvrdu odgovora
- **Brojevi 1-4** za odabir opcija u multiple-choice pitanjima
- **H** za otvaranje pomoći
- **Escape** za izlazak iz kviza
- **Strelice lijevo/desno** za navigaciju među pitanjima i koracima učenja
- **Fokus upravljanje** — fokus se automatski prebacuje na prvi interaktivni element pri promjeni zaslona
- **Focus trap** u modalnim prozorima (dijalozi, potvrde)

#### Kontrast i boje
- **WCAG AA** kompatibilan kontrast teksta na pozadini
- **`prefers-contrast: more`** — pojačani kontrast s crnim obrubima i tamnijim bojama
- **`prefers-reduced-motion`** — potpuno isključivanje svih animacija za korisnike koji to žele

#### Ostalo
- **`sr-only`** klase za tekst namijenjen isključivo čitačima zaslona
- **Live regione** za obavještenja o točnosti odgovora, streak-u i novim zaslonima
- **Progressbar** atributi na svim trakama napretka

---

## 🚀 Pokretanje

Otvori `index.html` u web pregledniku. Aplikacija je potpuno klijentska (HTML/CSS/JS) i ne zahtijeva server.

## 📁 Struktura Projekta

```
index.html              # Glavna stranica s UI komponentama i ARIA atributima
css/
  style.css             # Glavni stilovi, responzivni dizajn, animacije
css/
  mobile.css            # Mobile-first dodaci: swipe zone, touch target, landscape, tablet
css/
  accessibility.css     # ARIA fokus stilovi, high contrast, reduced motion, sr-only
js/
  phases.js             # Definicija 12 faza i generatori zadataka
js/
  app.js                # Glavna aplikacijska logika, kviz engine
js/
  mobile.js             # Swipe gesture engine, orientation handler, touch target enhancer
js/
  accessibility.js      # ARIA live regions, keyboard navigation, focus management, announcer
```

## 📱 Responzivni Dizajn

Aplikacija je prilagođena za:
- **Mobilne telefone** (portrait & landscape)
- **Tablete** (601–1024 px, optimizirani grid i fontovi)
- **Desktop računala** (> 1024 px)

## 💾 Pohrana Napretka

Napredak se pohranjuje u `localStorage` preglednika:
- Broj riješenih zadataka po fazi
- Zaradene zvjezdice
- Otključane faze
- Dnevni izazovi
- Status učenja (learned flag)

## 🎨 Dizajn Filozofija

- **10-15 minuta dnevno** - Kratke sesije bez prenapona
- **4-5 puta tjedno** - Pravilna rutina
- **Uvijek završi s pobjedom** - Zadnji zadatak je uvijek uspješan
- **Bez forsiranja** - Učenje kroz zabavu

## 🧮 Matematička Filozofija

> **"Prvo napravi lijep broj, onda popravi"**

Primjer: `29 + 16` → `29` treba `1` do `30`. Uzmemo `1` od `16`, ostane `15`. `30 + 15 = 45`.

## 🔧 Tehnologije

- HTML5 semantički markup s ARIA atributima
- CSS3 (flexbox, grid, animacije, custom properties, media queries)
- JavaScript (ES6+, bez vanjskih biblioteka za core funkcionalnost)
- Font Awesome ikone
- Google Fonts (Nunito)

## 📄 Licenca

Otvoreni kod za edukativne svrhe.

---

## ✅ Novo Implementirane Značajke (zadnji update)

### Mobile/Responsive
- ✅ Swipe geste za navigaciju pitanja i učenja
- ✅ Uvećane područja za dodir (min 44×44dp)
- ✅ Landscape optimizacija (kompaktni splash, horizontal scroll za faze, side-by-side layout)
- ✅ Tablet breakpoint (601–1024 px)
- ✅ `prefers-reduced-motion` potpora
- ✅ Safe area insets za moderne telefone
- ✅ Touch feedback bez hover efekata

### Accessibility
- ✅ ARIA `role`, `aria-label`, `aria-live`, `aria-expanded`, `aria-controls` na ključnim elementima
- ✅ Skip link za brzu tipkovničku navigaciju
- ✅ Tipkovničke prečice (Enter, 1-4, H, Escape, strelice)
- ✅ Focus management i focus trap u modalima
- ✅ Screen reader only tekst (`sr-only`)
- ✅ `prefers-contrast: more` — pojačani kontrast
- ✅ `prefers-reduced-motion` — isključivanje animacija
- ✅ Live regione za dinamičke promjene
