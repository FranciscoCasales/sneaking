import { GAME_PARAMETERS } from './constants/game-parameters';
import { SnakeDirections } from './enums/snake-directions';
import { getCurrentDirection } from './state/direction-state';
import { getFeedState } from './state/feed-state';
import { addSnakePart, getSnakeHead } from './state/snake-state';

const detectCollision = (isFirstLoop: boolean) => {
  if (isFirstLoop) {
    return true;
  }
  const { x: headX, y: headY } = getSnakeHead();
  const { x: feedX, y: feedY } = getFeedState();
  console.log(`headX: ${headX}, headY: ${headY}, feedX: ${feedX}, feedY: ${feedY}`);
  const xAxisIsCollidingIfDirectionIsRight = feedX >= headX && feedX <= (headX + GAME_PARAMETERS.SNAKE_PART_SIZE);
  const yAxisIsCollidingIfDirectionIsDown = feedY >= headY && feedY <= (headY + GAME_PARAMETERS.SNAKE_PART_SIZE);
  const xAxisIsCollidingIfDirectionIsLeft = feedX >= (headX - GAME_PARAMETERS.SNAKE_PART_SIZE) && feedX <= headX;
  const yAxisIsCollidingIfDirectionIsUP = feedY >= (headY - GAME_PARAMETERS.SNAKE_PART_SIZE) && feedY <= headY;
  let isTheSnakeEating = false;
  const snakeDirection = getCurrentDirection();
  switch (snakeDirection) {
    case SnakeDirections.RIGHT:
      isTheSnakeEating = xAxisIsCollidingIfDirectionIsRight && yAxisIsCollidingIfDirectionIsUP && yAxisIsCollidingIfDirectionIsDown;
      break;
    case SnakeDirections.LEFT:
      isTheSnakeEating = xAxisIsCollidingIfDirectionIsLeft && yAxisIsCollidingIfDirectionIsDown && yAxisIsCollidingIfDirectionIsUP;
      break;
    case SnakeDirections.UP:
      isTheSnakeEating = xAxisIsCollidingIfDirectionIsRight && xAxisIsCollidingIfDirectionIsLeft && yAxisIsCollidingIfDirectionIsUP;
      break;
    case SnakeDirections.DOWN:
      isTheSnakeEating = xAxisIsCollidingIfDirectionIsLeft && xAxisIsCollidingIfDirectionIsRight && yAxisIsCollidingIfDirectionIsDown;
      break;
  }
  console.log('isTheSnakeEating', isTheSnakeEating);
  if (isTheSnakeEating) {
    addSnakePart();
  }
  return isTheSnakeEating;
};

export { detectCollision };
