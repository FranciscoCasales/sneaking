import { SnakeDirections } from './enums/snake-directions';

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
    }
  });
  const getDirection = () => direction;
  return { getDirection };
}

export { listenKeys };