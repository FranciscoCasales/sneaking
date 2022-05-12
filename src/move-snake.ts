import { GAME_PARAMETERS } from './constants/game-parameters';
import { SnakeDirections } from './enums/snake-directions';
import { SnakePart, SnakePartWithPastInfo } from './typings';

const moveSnake = (snake: SnakePartWithPastInfo[], currentDirection: SnakeDirections): SnakePart[] => {
  return snake.map((snakePart, partIndex) => moveAllSnake(
    snakePart,
    snake[partIndex - 1],
    snake[partIndex + 1],
    currentDirection
  ));
}

const moveAllSnake = (
  currentSnakePart: SnakePartWithPastInfo,
  pastSnakePart: SnakePartWithPastInfo,
  nextSnakePart: SnakePartWithPastInfo,
  currentDirection: SnakeDirections
  ): SnakePartWithPastInfo => {
  if (nextSnakePart && !nextSnakePart.pastState) {
    nextSnakePart.pastState = {...currentSnakePart};
  }
  if (!currentSnakePart.pastState) {
    const newSnakeHead = moveSnakeHead(currentSnakePart, currentDirection);
    return newSnakeHead;
  } else {
    updatePastState(currentSnakePart, pastSnakePart);
    return moveSnakePart(currentSnakePart);
  }
}

const updatePastState = (currentSnakePart: SnakePartWithPastInfo, pastSnakePart: SnakePartWithPastInfo) => {
  const { x: currentPartX, y: currentPartY } = currentSnakePart;
  const { x: pastPartX, y: pastPartY } = currentSnakePart.pastState as SnakePartWithPastInfo;
  if (currentPartX === pastPartX && currentPartY === pastPartY) {
    currentSnakePart.pastState = {...pastSnakePart};
  }
}

const moveSnakeHead = (snakeHead: SnakePart, currentDirection: SnakeDirections): SnakePart => {
  const { x: headX, y: headY } = snakeHead;
  switch (currentDirection) {
    case SnakeDirections.RIGHT:
      return {...snakeHead, x: headX + GAME_PARAMETERS.SNAKE_STEP_SIZE};
    case SnakeDirections.LEFT:
      return {...snakeHead, x: headX - GAME_PARAMETERS.SNAKE_STEP_SIZE};
    case SnakeDirections.UP:
      return {...snakeHead, y: headY - GAME_PARAMETERS.SNAKE_STEP_SIZE};
    case SnakeDirections.DOWN:
      return {...snakeHead, y: headY + GAME_PARAMETERS.SNAKE_STEP_SIZE};
  }
}

const moveSnakePart = (currentSnakePart: SnakePartWithPastInfo): SnakePartWithPastInfo => {
  const { x: currentPartX, y: currentPartY } = currentSnakePart;
  if (currentSnakePart.pastState) {
    const { x: pastPartX, y: pastPartY } = currentSnakePart.pastState;
    if (currentPartX > pastPartX) {
      return {...currentSnakePart, x: currentPartX - GAME_PARAMETERS.SNAKE_STEP_SIZE};
    } else if (currentPartX < pastPartX) {
      return {...currentSnakePart, x: currentPartX + GAME_PARAMETERS.SNAKE_STEP_SIZE};
    }
    if (currentPartY > pastPartY) {
      return {...currentSnakePart, y: currentPartY - GAME_PARAMETERS.SNAKE_STEP_SIZE};
    } else if (currentPartY < pastPartY) {
      return {...currentSnakePart, y: currentPartY + GAME_PARAMETERS.SNAKE_STEP_SIZE};
    }
  }
  return currentSnakePart;
}

export { moveSnake };