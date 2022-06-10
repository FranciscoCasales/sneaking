import { getFeedState, markFeedAsUpdating } from './state/feed-state';
import { addSnakePart, getSnakeHead } from './state/snake-state';
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

export { detectCollision, detectIfSnakeIsEating, detectCollisions };
