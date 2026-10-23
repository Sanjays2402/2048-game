# 🎮 2048 Game

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/tested_with-Vitest-6E9F18?style=flat&logo=vitest&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)

A sleek, modern implementation of the classic **2048 puzzle game** built with React and Vite. Slide tiles, merge numbers, and reach 2048!

## ✨ Features

- 🎯 Classic 2048 gameplay with smooth animations
- ⌨️ Keyboard arrow key controls (plus WASD)
- 📱 Touch/swipe support for mobile devices
- 🏆 Score tracking with persistent best score (localStorage)
- ↩️ Multi-level undo
- 🔢 Move counter
- ♿ Accessible: ARIA grid/labels + `prefers-reduced-motion` support
- 🎉 Win detection at 2048 with option to keep playing
- 💀 Game over detection when no moves remain
- ⚡ Fast & responsive — powered by Vite HMR

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/Sanjays2402/2048-game.git
cd 2048-game

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Build

```bash
npm run build
npm run preview
```

## 🧪 Testing

Unit tests run on [Vitest](https://vitest.dev) with Testing Library and jsdom:

```bash
npm test          # run the suite once
npm run test:watch # watch mode
npm run coverage   # coverage report
```

The suite covers the core game logic (merging, sliding, all four directions,
win/lose detection, deterministic tile spawning via an injectable RNG) and the
`useLocalStorage` hook.

## 🏗️ Project Structure

```
2048-game/
├── src/
│   ├── App.jsx          # Main app layout
│   ├── Game.jsx         # Game state management & controls
│   ├── Board.jsx        # Grid rendering
│   ├── Tile.jsx         # Individual tile component
│   ├── gameLogic.js     # Core game logic (move, merge, win/loss detection)
│   ├── useSwipe.js      # Touch/swipe gesture hook
│   ├── App.css          # Styling
│   └── main.jsx         # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🎮 How to Play

- Use **arrow keys** (desktop) or **swipe** (mobile) to slide tiles
- Tiles with the same number **merge** when they collide
- Reach **2048** to win — or keep going for a higher score!

## 👤 Author

**Sanjay Santhanam**

## Terms & Disclaimer

By using this project you agree to the following.

- **No warranty.** This software is provided "as is", without warranty of any kind, express or implied, including merchantability, fitness for a particular purpose, and non-infringement.
- **No liability.** To the maximum extent permitted by law, the author and contributors are not liable for any claim, loss, or damage (direct, indirect, incidental, or consequential, including lost data or profits) arising from its use.
- **Your responsibility.** You use it at your own risk and are responsible for complying with the laws that apply to you.
- **Game.** Provided for entertainment. Take breaks; it is not designed for people with photosensitive epilepsy, and flashing effects may occur.
- **Third parties.** Names, logos, APIs, and services of others belong to their owners and are used for identification only; no affiliation or endorsement is implied.
- **Your statutory rights.** Nothing here limits rights that cannot be waived by agreement, including under consumer-protection laws in the USA, Canada (including Quebec), and India (Consumer Protection Act, 2019).
- **License.** Use, copying, and distribution are governed by the [LICENSE](LICENSE) file; if anything here conflicts with it, the license controls.

## Content, Assets & Fair Use

- **Original work.** Unless noted otherwise (including below), the code, text, design, and images in this repository were created by the author.
- **Libraries, fonts, and icons.** Third-party libraries, fonts (for example Google Fonts), and icon sets belong to their creators and are used under their own licenses; see the dependency manifests and each source for terms.
- **Logos, brands, and screenshots.** Third-party names, logos, and screenshots appear only to identify or describe their products (nominative use). They remain the property of their owners and do not imply affiliation or endorsement.
- **Ideas and inspiration.** Where this project is inspired by another product, game, or idea, it is an independent implementation. It borrows only general ideas, mechanics, or styles, which are not anyone's exclusive property, and is meant to contain no third-party code or artwork used without permission.
- **Fair use and fair dealing.** Any third-party material is used in limited ways for purposes such as education, research, review, commentary, or identification, relying on fair use in the USA (17 U.S.C. § 107), fair dealing in Canada (Copyright Act, ss. 29–29.2), and fair dealing in India (Copyright Act, 1957, s. 52), where they apply.
- **Concerns and takedown requests.** If you own rights in something here and believe it is used improperly, [open an issue](https://github.com/Sanjays2402/2048-game/issues) or contact the author through their GitHub profile with a link to the material and your claim. It will be reviewed promptly and credited, changed, or removed as appropriate. You may also use GitHub's DMCA process.
- **Contributions.** By contributing, you confirm you have the right to submit your contribution and agree it is licensed under this repository's license.
- **Website.** The project site has its own [Terms](https://sanjays2402.github.io/2048-game/terms.html) and [Fair Use](https://sanjays2402.github.io/2048-game/fair-use.html) pages.
