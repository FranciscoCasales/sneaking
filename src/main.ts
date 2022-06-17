import './style.css';
import { renderSnake, renderSnakeFeed } from './render-element';
import { cleanGameBoard, drawGameBoard } from './game-board';
import { moveSnake } from './move-snake';
import { listenKeys } from './listen-keys';
import { detectCollisionsWithBody, detectIfSnakeIsEating, detectOutOfBounds } from './detect-collision';
import { updateIncomingDirection } from './state/direction-state';
import { getSnakeHead } from './state/snake-state';
import { isGameOver, isPaused, setGameLoopFunction, startGame } from './state/game-state';
import { gameOver } from './state/game-over-state';

const gameCanvas = drawGameBoard();
const gameContext = gameCanvas.getContext('2d') as CanvasRenderingContext2D;
renderSnake(gameContext);
const { getDirection } = listenKeys();

const gameLoop = () => {
  updateIncomingDirection(getDirection());
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
