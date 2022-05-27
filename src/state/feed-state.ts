import { GAME_PARAMETERS } from '../constants/game-parameters';
import { FeedState } from '../typings';
import { getSnakeStructure } from './snake-state';

const feedState: FeedState = {
  x: 0,
  y: 0,
  emoji: '🍎'
};

const updateCoordinates = (width: number, height: number): FeedState => {
  let xPos = 50;
  let yPos = 20;
  do {
    xPos = Math.floor(Math.random() * ((width - GAME_PARAMETERS.SNAKE_FEED_SIZE) / GAME_PARAMETERS.SNAKE_PART_SIZE)) * GAME_PARAMETERS.SNAKE_PART_SIZE;
    yPos = Math.floor(Math.random() * ((height - GAME_PARAMETERS.SNAKE_FEED_SIZE) / GAME_PARAMETERS.SNAKE_PART_SIZE)) * GAME_PARAMETERS.SNAKE_PART_SIZE;
  } while (validateIfNotColliding(xPos, yPos));
  feedState.x = xPos;
  feedState.y = yPos;
  return { ...feedState };
};

const validateIfNotColliding = (x: number, y: number): boolean => {
  return getSnakeStructure().map(({ x: snakeX, y: snakeY }) => {
    if (snakeX >= x && snakeX <= (x + GAME_PARAMETERS.SNAKE_PART_SIZE)) {
      return true;
    } else if (snakeY >= y && snakeY <= (y + GAME_PARAMETERS.SNAKE_PART_SIZE)) {
      return true;
    }
    return false;
  }).reduce((prev, curr) => prev || curr);
};

const updateFeedEmoji = (emoji: string): FeedState => {
  feedState.emoji = emoji;
  return { ...feedState };
};

const updateAllFeedState = (x: number, y: number, emoji: string): FeedState => {
  feedState.x = x;
  feedState.y = y;
  feedState.emoji = emoji;
  return { ...feedState };
};

const getFeedState = (): FeedState => ({ ...feedState });

export {
  updateCoordinates,
  updateFeedEmoji,
  updateAllFeedState,
  getFeedState
};
