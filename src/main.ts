import './style.css'
import { renderSnake } from './snake'
import { cleanGameBoard, drawGameBoard } from './game-board';
import { INITIAL_SNAKE_STRUCTURE } from './constants/initial-snake-structure';
import { moveSnake } from './move-snake';
import { listenKeys } from './listen-keys';

const gameContext = drawGameBoard();
let snake = INITIAL_SNAKE_STRUCTURE;
renderSnake(gameContext, snake);
const { getDirection } = listenKeys();

const gameLoop = () => {
  snake = moveSnake(snake, getDirection());
  cleanGameBoard(gameContext);
  renderSnake(gameContext, snake);
  window.requestAnimationFrame(gameLoop);
}

gameLoop();