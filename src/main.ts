import './style.css';
import { renderSnake, renderSnakeFeed } from './render-element';
import { cleanGameBoard, drawGameBoard } from './game-board';
import { moveSnake } from './move-snake';
import { listenKeys } from './listen-keys';
import { detectCollision } from './detect-collition';
import { updateIncomingDirection } from './state/direction-state';

const gameCanvas = drawGameBoard();
const gameContext = gameCanvas.getContext('2d') as CanvasRenderingContext2D;
renderSnake(gameContext);
const { getDirection } = listenKeys();
let activeFeed = false;
let isFirstLoop = true;

const gameLoop = () => {
  updateIncomingDirection(getDirection());
  moveSnake();
  cleanGameBoard(gameContext);
  activeFeed = !detectCollision(isFirstLoop);
  renderSnake(gameContext);
  activeFeed = renderSnakeFeed(gameContext, gameCanvas, activeFeed);
  isFirstLoop = false;
  window.requestAnimationFrame(gameLoop);
};

gameLoop();
