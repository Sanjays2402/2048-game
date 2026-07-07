import { useState, useCallback, useEffect } from 'react';
import Board from './Board';
import { useSwipe } from './useSwipe';
import { useLocalStorage } from './useLocalStorage';
import { BEST_SCORE_KEY } from './constants';
import { initGame, move, addRandomTile, isGameOver, hasWon } from './gameLogic';

export default function Game() {
  const [grid, setGrid] = useState(initGame);
  const [score, setScore] = useState(0);
  const [best, setBest] = useLocalStorage(BEST_SCORE_KEY, 0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [keepPlaying, setKeepPlaying] = useState(false);
  const [prevStates, setPrevStates] = useState([]);
  const [moves, setMoves] = useState(0);

  const handleMove = useCallback(
    (direction) => {
      if (gameOver) return;
      if (won && !keepPlaying) return;

      const result = move(grid, direction);
      if (!result.moved) return;

      // Push current state onto the undo history (cap depth to keep memory bounded).
      setPrevStates((h) => [...h.slice(-49), { grid, score, moves }]);
      setMoves((m) => m + 1);

      const newGrid = addRandomTile(result.grid);
      const newScore = score + result.score;

      setGrid(newGrid);
      setScore(newScore);

      if (newScore > best) {
        setBest(newScore);
      }

      if (!won && !keepPlaying && hasWon(newGrid)) {
        setWon(true);
      } else if (isGameOver(newGrid)) {
        setGameOver(true);
      }
    },
    [grid, score, best, gameOver, won, keepPlaying, moves, setBest]
  );

  // Keyboard controls
  useEffect(() => {
    const keyMap = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right',
      w: 'up',
      s: 'down',
      a: 'left',
      d: 'right',
    };

    const handleKey = (e) => {
      const dir = keyMap[e.key];
      if (dir) {
        e.preventDefault();
        handleMove(dir);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleMove]);

  // Swipe controls for mobile
  useSwipe(handleMove);

  const undo = useCallback(() => {
    setPrevStates((h) => {
      if (h.length === 0) return h;
      const last = h[h.length - 1];
      setGrid(last.grid);
      setScore(last.score);
      setMoves(last.moves);
      setGameOver(false);
      return h.slice(0, -1);
    });
  }, []);

  const restart = () => {
    setGrid(initGame());
    setScore(0);
    setGameOver(false);
    setWon(false);
    setKeepPlaying(false);
    setPrevStates([]);
    setMoves(0);
  };

  const continueGame = () => {
    setKeepPlaying(true);
  };

  return (
    <div className="game-container">
      <header className="game-header">
        <h1 className="game-title">2048</h1>
        <div className="scores">
          <div className="score-box">
            <span className="score-label">Score</span>
            <span className="score-value">{score}</span>
          </div>
          <div className="score-box">
            <span className="score-label">Best</span>
            <span className="score-value">{best}</span>
          </div>
          <div className="score-box">
            <span className="score-label">Moves</span>
            <span className="score-value">{moves}</span>
          </div>
        </div>
      </header>

      <div className="game-intro">
        <p>Join the tiles, get to <strong>2048!</strong></p>
        <div className="header-buttons">
          <button
            className="undo-btn"
            onClick={undo}
            disabled={prevStates.length === 0}
            title={prevStates.length === 0 ? 'Nothing to undo' : 'Undo last move'}
          >
            ↩
          </button>
          <button className="new-game-btn" onClick={restart}>
            New Game
          </button>
        </div>
      </div>

      <div className="board-wrapper">
        <Board grid={grid} />

        {gameOver && (
          <div className="overlay">
            <div className="overlay-content">
              <h2>Game Over!</h2>
              <p>Score: {score}</p>
              <button className="new-game-btn" onClick={restart}>
                Try Again
              </button>
            </div>
          </div>
        )}

        {won && !keepPlaying && (
          <div className="overlay overlay-win">
            <div className="overlay-content">
              <h2>You Win! 🎉</h2>
              <p>Score: {score}</p>
              <div className="overlay-buttons">
                <button className="new-game-btn" onClick={continueGame}>
                  Keep Playing
                </button>
                <button className="new-game-btn" onClick={restart}>
                  New Game
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <p className="instructions">
        <strong>How to play:</strong> Use arrow keys or swipe to move tiles.
        Tiles with the same number merge when they collide.
      </p>
    </div>
  );
}
