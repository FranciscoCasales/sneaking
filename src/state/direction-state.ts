import { GAME_PARAMETERS } from '../constants/game-parameters';
import { SnakeDirections } from '../enums/snake-directions';
import { DirectionState } from '../typings';

const snakeDirection: DirectionState = {
  currentDirection: SnakeDirections.RIGHT,
  incomingDirection: SnakeDirections.RIGHT
};

const resetSnakeDirectionState = () => {
  snakeDirection.currentDirection = SnakeDirections.RIGHT;
  snakeDirection.incomingDirection = SnakeDirections.RIGHT;
}

const updateCurrentDirection = (x: number, y: number) => {
  const { currentDirection, incomingDirection } = snakeDirection;
  if (
    (currentDirection === SnakeDirections.RIGHT && incomingDirection === SnakeDirections.LEFT) ||
    (currentDirection === SnakeDirections.LEFT && incomingDirection === SnakeDirections.RIGHT) ||
    (currentDirection === SnakeDirections.UP && incomingDirection === SnakeDirections.DOWN) ||
    (currentDirection === SnakeDirections.DOWN && incomingDirection === SnakeDirections.UP)
  ) return;
  if (currentDirection !== incomingDirection) {
    if (x % GAME_PARAMETERS.SNAKE_PART_SIZE === 0 && y % GAME_PARAMETERS.SNAKE_PART_SIZE === 0) {
      snakeDirection.currentDirection = incomingDirection;
    }
  }
};

const updateIncomingDirection = (incomingDirection: SnakeDirections) => {
  snakeDirection.incomingDirection = incomingDirection;
};

const getCurrentDirection = () => {
  return snakeDirection.currentDirection;
};

const getIncomingDirection = () => {
  return snakeDirection.incomingDirection;
};

export {
  updateCurrentDirection,
  updateIncomingDirection,
  getCurrentDirection,
  getIncomingDirection,
  resetSnakeDirectionState
};
