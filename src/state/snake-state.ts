import { GAME_PARAMETERS } from '../constants/game-parameters';
import { SnakePart } from '../typings';

const INITIAL_POINT = 80;
const INITIAL_SNAKE_HEAD: SnakePart = {
  x: INITIAL_POINT,
  y: 20,
  width: GAME_PARAMETERS.SNAKE_PART_SIZE,
  height: GAME_PARAMETERS.SNAKE_PART_SIZE
};

let snake: SnakePart[] = initializeSnake();

function initializeSnake(): SnakePart[] {
  return [
    INITIAL_SNAKE_HEAD,
    { ...INITIAL_SNAKE_HEAD, x: INITIAL_POINT - GAME_PARAMETERS.SNAKE_PART_SIZE },
    { ...INITIAL_SNAKE_HEAD, x: INITIAL_POINT - GAME_PARAMETERS.SNAKE_PART_SIZE * 2 },
    { ...INITIAL_SNAKE_HEAD, x: INITIAL_POINT - GAME_PARAMETERS.SNAKE_PART_SIZE * 3 },
    { ...INITIAL_SNAKE_HEAD, x: INITIAL_POINT - GAME_PARAMETERS.SNAKE_PART_SIZE * 4 }
  ];
}

const resetSnakeState = () => {
  snake = initializeSnake();
}

const getSnakeStructure = (): SnakePart[] => {
  return [...snake];
};

const getSnakeHead = (): SnakePart => {
  return snake[0];
};

const getSnakeBody = (): SnakePart[] => {
  return snake.slice(2);
}

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
      newPart = { ...lastPart, x: lastPartX, y: lastPartY + GAME_PARAMETERS.SNAKE_PART_SIZE, pastState: lastPart };
    } else {
      newPart = { ...lastPart, x: lastPartX, y: lastPartY - GAME_PARAMETERS.SNAKE_PART_SIZE, pastState: lastPart };
    }
  } else if (lastPartY === beforeLastPartY) {
    if (lastPartX > beforeLastPartX) {
      newPart = { ...lastPart, x: lastPartX + GAME_PARAMETERS.SNAKE_PART_SIZE, y: lastPartY, pastState: lastPart };
    } else {
      newPart = { ...lastPart, x: lastPartX - GAME_PARAMETERS.SNAKE_PART_SIZE, y: lastPartY, pastState: lastPart };
    }
  } else {
    const distanceBetweenPartsX = Math.abs(lastPartX - beforeLastPartX);
    const distanceBetweenPartsY = Math.abs(lastPartY - beforeLastPartY);
    if (distanceBetweenPartsX < distanceBetweenPartsY) {
      newPart = { ...lastPart, x: lastPartX, y: lastPartY + GAME_PARAMETERS.SNAKE_PART_SIZE, pastState: lastPart };
    } else {
      newPart = { ...lastPart, x: lastPartX + GAME_PARAMETERS.SNAKE_PART_SIZE, y: lastPartY, pastState: lastPart };
    }
  }
  snake.push(newPart);
  return [...snake];
};

export { getSnakeStructure, updateSnakeStructure, addSnakePart, getSnakeHead, resetSnakeState, getSnakeBody };
