# 🎮 2048 Game

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)

A sleek, modern implementation of the classic **2048 puzzle game** built with React and Vite. Slide tiles, merge numbers, and reach 2048!

## ✨ Features

- 🎯 Classic 2048 gameplay with smooth animations
- ⌨️ Keyboard arrow key controls
- 📱 Touch/swipe support for mobile devices
- 🏆 Score tracking with persistent best score (localStorage)
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
