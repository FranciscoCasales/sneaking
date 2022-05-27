import { GAME_PARAMETERS } from './constants/game-parameters';
import { SnakeDirections } from './enums/snake-directions';
import { getCurrentDirection, updateCurrentDirection } from './state/direction-state';
import { getSnakeStructure, updateSnakeStructure } from './state/snake-state';
import { SnakePart } from './typings';

const moveSnake = () => {
  const snake = getSnakeStructure();
  const movedSnake = snake.map((snakePart, partIndex) => moveAllSnake(
    snakePart,
    snake[partIndex - 1],
    snake[partIndex + 1]
  ));
  updateSnakeStructure(movedSnake);
};

const moveAllSnake = (
  currentSnakePart: SnakePart,
  pastSnakePart: SnakePart,
  nextSnakePart: SnakePart
): SnakePart => {
  if (nextSnakePart && !nextSnakePart.pastState) {
    nextSnakePart.pastState = { ...currentSnakePart };
  }
  if (!currentSnakePart.pastState) {
    return moveSnakeHead(currentSnakePart);
  } else {
    updatePastState(currentSnakePart, pastSnakePart);
    return moveSnakePart(currentSnakePart);
  }
};

const updatePastState = (currentSnakePart: SnakePart, pastSnakePart: SnakePart) => {
  const { x: currentPartX, y: currentPartY } = currentSnakePart;
  const { x: pastPartX, y: pastPartY } = currentSnakePart.pastState as SnakePart;
  if (currentPartX === pastPartX && currentPartY === pastPartY) {
    currentSnakePart.pastState = { ...pastSnakePart };
  }
};

const moveSnakeHead = (snakeHead: SnakePart): SnakePart => {
  const { x: headX, y: headY } = snakeHead;
  updateCurrentDirection(headX, headY);
  switch (getCurrentDirection()) {
    case SnakeDirections.RIGHT:
      return { ...snakeHead, x: headX + GAME_PARAMETERS.SNAKE_STEP_SIZE / GAME_PARAMETERS.SNAKE_STEP_SPEED_DIVIDER };
    case SnakeDirections.LEFT:
      return { ...snakeHead, x: headX - GAME_PARAMETERS.SNAKE_STEP_SIZE / GAME_PARAMETERS.SNAKE_STEP_SPEED_DIVIDER };
    case SnakeDirections.UP:
      return { ...snakeHead, y: headY - GAME_PARAMETERS.SNAKE_STEP_SIZE / GAME_PARAMETERS.SNAKE_STEP_SPEED_DIVIDER };
    case SnakeDirections.DOWN:
      return { ...snakeHead, y: headY + GAME_PARAMETERS.SNAKE_STEP_SIZE / GAME_PARAMETERS.SNAKE_STEP_SPEED_DIVIDER };
  }
};

const moveSnakePart = (currentSnakePart: SnakePart): SnakePart => {
  const { x: currentPartX, y: currentPartY } = currentSnakePart;
  if (currentSnakePart.pastState) {
    const { x: pastPartX, y: pastPartY } = currentSnakePart.pastState;
    if (currentPartX > pastPartX) {
      return { ...currentSnakePart, x: currentPartX - GAME_PARAMETERS.SNAKE_STEP_SIZE / GAME_PARAMETERS.SNAKE_STEP_SPEED_DIVIDER };
    } else if (currentPartX < pastPartX) {
      return { ...currentSnakePart, x: currentPartX + GAME_PARAMETERS.SNAKE_STEP_SIZE / GAME_PARAMETERS.SNAKE_STEP_SPEED_DIVIDER };
    } else if (currentPartY > pastPartY) {
      return { ...currentSnakePart, y: currentPartY - GAME_PARAMETERS.SNAKE_STEP_SIZE / GAME_PARAMETERS.SNAKE_STEP_SPEED_DIVIDER };
    } else if (currentPartY < pastPartY) {
      return { ...currentSnakePart, y: currentPartY + GAME_PARAMETERS.SNAKE_STEP_SIZE / GAME_PARAMETERS.SNAKE_STEP_SPEED_DIVIDER };
    }
  }
  return currentSnakePart;
};

export { moveSnake };
