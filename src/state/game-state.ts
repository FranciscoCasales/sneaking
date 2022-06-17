import { GAME_OVER_SIGN, PAUSE_SIGN } from "../constants/game-signs-constants";
import { GameState } from "../typings";
import { resetSnakeDirectionState } from "./direction-state";
import { resetFeedState } from "./feed-state";
import { resetSnakeState } from "./snake-state";

const gameState: GameState = {
  score: 0,
  speed: 0,
  feedStyle: '🍎',
  isGameOver: false,
  gameLoop: () => { },
  signOverlay: document.getElementById('sign_overlay') as HTMLDivElement,
  isPaused: false
}

const setGameLoopFunction = (gameLoop: Function): void => {
  gameState.gameLoop = gameLoop;
}

const setGameOver = (): void => {
  gameState.isGameOver = true;
  gameOver();
};

const isGameOver = (): boolean => { return gameState.isGameOver; };

const restartGame = (): void => {
  gameState.isGameOver = false;
  gameState.isPaused = false;
  resetSnakeDirectionState();
  resetGameOver();
  resetSnakeState();
  resetFeedState();
  gameState.gameLoop();
}

const startGame = (): void => {
  gameState.gameLoop();
}

const gameOver = () => {
  const { signOverlay } = gameState;
  signOverlay.classList.add('show');
  const signGrid = buildSignGrid(19, 11);
  if (signOverlay.childElementCount === 0) {
    signGrid.append(...GAME_OVER_SIGN);
    signOverlay.appendChild(signGrid);
  }
}

const resetGameOver = () => {
  resetSignElements();
}

const pauseGame = (): void => {
  gameState.isPaused = true;
  const { signOverlay } = gameState;
  signOverlay.classList.add('show');
  const signGrid = buildSignGrid(24, 5);
  if (signOverlay.childElementCount === 0) {
    signGrid.append(...PAUSE_SIGN);
    signOverlay.appendChild(signGrid);
  }
}

const continueGame = (): void => {
  gameState.isPaused = false;
  resetSignElements();
  gameState.gameLoop();
}

const resetSignElements = () => {
  const { signOverlay } = gameState;
  signOverlay.classList.remove('show');
  const firstChildElement = signOverlay.firstElementChild;
  if (firstChildElement) {
    signOverlay.removeChild(firstChildElement);
  }
}

const buildSignGrid = (columns: number, rows: number): HTMLDivElement => {
  const signGrid = document.createElement('div');
  signGrid.classList.add('sign-wrapper');
  signGrid.style.setProperty('--sign-columns', `${columns}`);
  signGrid.style.setProperty('--sign-rows', `${rows}`);
  return signGrid;
}

const isPaused = (): boolean => { return gameState.isPaused; }

export { setGameOver, isGameOver, restartGame, startGame, setGameLoopFunction, pauseGame, continueGame, isPaused };