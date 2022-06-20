import { SnakeDirections } from './enums/snake-directions';
import { updateIncomingDirection } from './state/direction-state';
import { continueGame, isGameOver, isPaused, pauseGame, restartGame } from './state/game-state';
import { getSwipeDirection, getTouchCount, incrementTouchCount, resetTouchCount, updateEndTouchCoordinates, updateInitialTouchCoordinates } from './state/touch-state';

const listenKeys = (): void => {
  window.addEventListener('keyup', event => {
    event.preventDefault();
    switch (event.key) {
      case SnakeDirections.LEFT:
        updateIncomingDirection(SnakeDirections.LEFT);
        break;
      case SnakeDirections.UP:
        updateIncomingDirection(SnakeDirections.UP);
        break;
      case SnakeDirections.RIGHT:
        updateIncomingDirection(SnakeDirections.RIGHT);
        break;
      case SnakeDirections.DOWN:
        updateIncomingDirection(SnakeDirections.DOWN);
        break;
      case ' ':
      case 'Enter':
        pauseContinueOrRestart();
        break;
    }
  });
}

const listenTouchPath = () => {
  let touchEventInProgress = false;
  window.addEventListener('touchstart', (event: TouchEvent) => {
    updateInitialTouchCoordinates(event.touches[0].clientX, event.touches[0].clientY);
    incrementTouchCount();
  });
  window.addEventListener('touchend', (event: TouchEvent) => {
    if (!touchEventInProgress) {
      touchEventInProgress = true;
      setTimeout(() => {
        const touchCount = getTouchCount();
        if (touchCount === 1) {
          updateEndTouchCoordinates(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
          updateIncomingDirection(getSwipeDirection());
        } else {
          pauseContinueOrRestart();
        }
        resetTouchCount();
        touchEventInProgress = false;
      }, 200);
    }
  });
}

const pauseContinueOrRestart = () => {
  if (isGameOver()) {
    updateIncomingDirection(SnakeDirections.RIGHT);
    restartGame();
  } else {
    isPaused() ? continueGame() : pauseGame();
  }
}

export { listenKeys, listenTouchPath };