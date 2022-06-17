import { getFeedState, markFeedAsUpdating } from './state/feed-state';
import { setGameOver } from './state/game-state';
import { addSnakePart, getSnakeBody, getSnakeHead } from './state/snake-state';
import { GameElement } from './typings';

const detectIfSnakeIsEating = (): void => {
  const snakeHead = getSnakeHead();
  const feed = getFeedState();
  const isTheSnakeEating = detectCollision(snakeHead, feed);
  if (isTheSnakeEating) {
    addSnakePart();
    markFeedAsUpdating();
  }
};

const detectCollisionsWithBody = () => {
  const snakeHead = getSnakeHead();
  const snakeBody = getSnakeBody();
  const isSnakeCollidingWithBody = detectCollisions(snakeHead, snakeBody);
  if (isSnakeCollidingWithBody) {
    setGameOver();
  }
}

const detectCollision = (
  gameElement1: GameElement,
  gameElement2: GameElement
): boolean => {
  const { x: element1X, y: element1Y, width: element1With, height: element1Height } = gameElement1;
  const { x: element2X, y: element2Y, width: element2With, height: element2Height } = gameElement2;
  if (
    element1X < element2X + element2With &&
    element1X + element1With > element2X &&
    element1Y < element2Y + element2Height &&
    element1Height + element1Y > element2Y
  ) {
    return true;
  }
  return false;
};

const detectCollisions = (gameElement: GameElement, gameElements: GameElement[]): boolean => {
  return gameElements
    .map(element => detectCollision(element, gameElement))
    .reduce((prev, curr) => prev || curr);
};

const detectOutOfBounds = (gameElement: GameElement, container: { width: number, height: number }): void => {
  const { x, y, width, height } = gameElement;
  const { width: containerWidth, height: containerHeight } = container;
  const outOfBounds = (
    x < 0 ||
    y < 0 ||
    x + width > containerWidth ||
    y + height > containerHeight
  );
  if (outOfBounds) {
    setGameOver();
  }
}

export { detectCollision, detectIfSnakeIsEating, detectCollisions, detectOutOfBounds, detectCollisionsWithBody };
