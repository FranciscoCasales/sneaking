import { SnakeDirections } from './enums/snake-directions';
import { getCurrentDirection, updateIncomingDirection } from './state/direction-state';
import { continueGame, isGameOver, isPaused, pauseGame, restartGame } from './state/game-state';
import { getSwipeDirection, updateEndTouchCoordinates, updateInitialTouchCoordinates } from './state/touch-state';

const listenKeys = (): void => {
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
    updateIncomingDirection(direction ? direction : getCurrentDirection());
  });
}

const listenTouchPath = () => {
  window.addEventListener('touchstart', (event: TouchEvent) => {
    console.log(event.touches[0].clientX, event.touches[0].clientY);
    updateInitialTouchCoordinates(event.touches[0].clientX, event.touches[0].clientY);
  });
  window.addEventListener('touchend', (event: TouchEvent) => {
    console.log(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
    updateEndTouchCoordinates(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
    updateIncomingDirection(getSwipeDirection());
  });
}

function isPause() {
  if (isPaused())
    continueGame();
  else
    pauseGame();
}

export { listenKeys, listenTouchPath };