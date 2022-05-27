import { GAME_PARAMETERS } from '../constants/game-parameters';
import { SnakePart } from '../typings';

const INITIAL_POINT = 60;

let snake: SnakePart[] = [
  { x: INITIAL_POINT, y: 20 },
  { x: INITIAL_POINT - GAME_PARAMETERS.SNAKE_PART_SIZE, y: 20 },
  { x: INITIAL_POINT - GAME_PARAMETERS.SNAKE_PART_SIZE * 2, y: 20 },
  { x: INITIAL_POINT - GAME_PARAMETERS.SNAKE_PART_SIZE * 3, y: 20 },
  { x: INITIAL_POINT - GAME_PARAMETERS.SNAKE_PART_SIZE * 4, y: 20 }
];

const getSnakeStructure = (): SnakePart[] => {
  return [...snake];
};

const getSnakeHead = (): SnakePart => {
  return snake[0];
};

const updateSnakeStructure = (newSnake: SnakePart[]): SnakePart[] => {
  snake = [...newSnake];
  return [...snake];
};

const addSnakePart = (): SnakePart[] => {
  const lastPart = snake[snake.length - 1];
  const { x: lastPartX, y: lastPartY } = lastPart;
  const beforeLastPart = snake[snake.length - 2];
  const { x: beforeLastPartX, y: beforeLastPartY } = beforeLastPart;
  let newPart: SnakePart;
  if (lastPartX === beforeLastPartX) {
    if (lastPartY > beforeLastPartY) {
      newPart = { x: lastPartX, y: lastPartY + GAME_PARAMETERS.SNAKE_PART_SIZE, pastState: lastPart };
    } else {
      newPart = { x: lastPartX, y: lastPartY - GAME_PARAMETERS.SNAKE_PART_SIZE, pastState: lastPart };
    }
  } else if (lastPartY === beforeLastPartY) {
    if (lastPartX > beforeLastPartX) {
      newPart = { x: lastPartX + GAME_PARAMETERS.SNAKE_PART_SIZE, y: lastPartY, pastState: lastPart };
    } else {
      newPart = { x: lastPartX - GAME_PARAMETERS.SNAKE_PART_SIZE, y: lastPartY, pastState: lastPart };
    }
  } else {
    const distanceBetweenPartsX = Math.abs(lastPartX - beforeLastPartX);
    const distanceBetweenPartsY = Math.abs(lastPartY - beforeLastPartY);
    if (distanceBetweenPartsX < distanceBetweenPartsY) {
      newPart = { x: lastPartX, y: lastPartY + GAME_PARAMETERS.SNAKE_PART_SIZE, pastState: lastPart };
    } else {
      newPart = { x: lastPartX + GAME_PARAMETERS.SNAKE_PART_SIZE, y: lastPartY, pastState: lastPart };
    }
  }
  snake.push(newPart);
  return [...snake];
};

export { getSnakeStructure, updateSnakeStructure, addSnakePart, getSnakeHead };
