# Contributing

Thanks for your interest in improving the 2048 game!

## Development setup

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
```

## Before opening a pull request

Please make sure all three of these pass locally:

```bash
npm run lint     # eslint — must be clean
npm test         # vitest — all tests green
npm run build    # production build must succeed
```

CI runs the same three checks on every pull request.

## Guidelines

- **Keep game logic pure and tested.** `src/gameLogic.js` functions are pure
  (no mutation, no side effects) and take an injectable `rng` where randomness
  is involved. Add or update tests in `src/*.test.js` for any logic change.
- **Small, focused commits** using [Conventional Commits](https://www.conventionalcommits.org)
  (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `ci:`).
- **Accessibility matters.** Preserve ARIA roles/labels and the
  `prefers-reduced-motion` behavior when touching the UI.

## Project structure

| Path | Purpose |
|------|---------|
| `src/gameLogic.js` | Pure game logic (move, merge, win/lose) |
| `src/constants.js` | Shared constants |
| `src/Game.jsx` | State management and controls |
| `src/Board.jsx` / `src/Tile.jsx` | Rendering |
| `src/useLocalStorage.js` / `src/useSwipe.js` | Hooks |
| `src/*.test.js` | Vitest unit tests |
