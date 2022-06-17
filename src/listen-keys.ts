import { SnakeDirections } from './enums/snake-directions';
import { continueGame, isGameOver, isPaused, pauseGame, restartGame } from './state/game-state';

const listenKeys = () => {
  let direction: SnakeDirections = SnakeDirections.RIGHT;
  window.addEventListener('keyup', event => {
    event.preventDefault();
    switch (event.key) {
      case SnakeDirections.LEFT:
        direction = SnakeDirections.LEFT;
        break;
      case SnakeDirections.UP:
        direction = SnakeDirections.UP;
        break;
      case SnakeDirections.RIGHT:
        direction = SnakeDirections.RIGHT;
        break;
      case SnakeDirections.DOWN:
        direction = SnakeDirections.DOWN;
        break;
      case ' ':
      case 'Enter':
        if (isGameOver()) {
          direction = SnakeDirections.RIGHT;
          restartGame();
        } else {
          isPause();
        }
        break;
    }
  });
  const getDirection = () => direction;
  return { getDirection };
}

function isPause() {
  if (isPaused())
    continueGame();
  else
    pauseGame();
}

export { listenKeys };