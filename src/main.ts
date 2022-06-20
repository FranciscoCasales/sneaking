import './style.css';
import { renderSnake, renderSnakeFeed } from './render-element';
import { cleanGameBoard, drawGameBoard } from './game-board';
import { moveSnake } from './move-snake';
import { listenKeys, listenTouchPath } from './listen-direction-events';
import { detectCollisionsWithBody, detectIfSnakeIsEating, detectOutOfBounds } from './detect-collision';
import { getSnakeHead } from './state/snake-state';
import { isGameOver, isPaused, setGameLoopFunction, startGame } from './state/game-state';

const gameCanvas = drawGameBoard();
const gameContext = gameCanvas.getContext('2d') as CanvasRenderingContext2D;
renderSnake(gameContext);
listenKeys();
listenTouchPath();

const gameLoop = () => {
  moveSnake();
  cleanGameBoard(gameContext);
  detectIfSnakeIsEating();
  detectOutOfBounds(getSnakeHead(), gameCanvas);
  detectCollisionsWithBody();
  renderSnake(gameContext);
  renderSnakeFeed(gameContext, gameCanvas);
  if (!isGameOver() && !isPaused()) {
    window.requestAnimationFrame(gameLoop);
  }
};

setGameLoopFunction(gameLoop);
startGame();
