import './style.css';
import { renderSnake, renderSnakeFeed } from './render-element';
import { cleanGameBoard, drawGameBoard } from './game-board';
import { moveSnake } from './move-snake';
import { listenKeys } from './listen-keys';
import { detectIfSnakeIsEating } from './detect-collision';
import { updateIncomingDirection } from './state/direction-state';

const gameCanvas = drawGameBoard();
const gameContext = gameCanvas.getContext('2d') as CanvasRenderingContext2D;
renderSnake(gameContext);
const { getDirection } = listenKeys();

const gameLoop = () => {
  updateIncomingDirection(getDirection());
  moveSnake();
  cleanGameBoard(gameContext);
  detectIfSnakeIsEating();
  renderSnake(gameContext);
  renderSnakeFeed(gameContext, gameCanvas);
  window.requestAnimationFrame(gameLoop);
};

gameLoop();
