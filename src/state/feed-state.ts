import { GAME_PARAMETERS } from '../constants/game-parameters';
import { detectCollisions } from '../detect-collision';
import { FeedState } from '../typings';
import { getSnakeStructure } from './snake-state';

const feedState: FeedState = {
  x: 300,
  y: 300,
  width: GAME_PARAMETERS.SNAKE_FEED_SIZE,
  height: GAME_PARAMETERS.SNAKE_FEED_SIZE,
  emoji: '🍎',
  mustBeUpdated: true
};

const updateCoordinates = (containerWidth: number, containerHeight: number): FeedState => {
  let xPos;
  let yPos;
  const { width, height } = feedState;
  do {
    xPos = Math.floor(Math.random() * ((containerWidth - width) / width)) * width;
    yPos = Math.floor(Math.random() * ((containerHeight - height) / height)) * height;
    feedState.x = xPos;
    feedState.y = yPos;
  } while (detectCollisions(feedState, getSnakeStructure()));
  return { ...feedState };
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

const markFeedAsUpdating = (): void => { feedState.mustBeUpdated = true; };

const markFeedAsUpdated = (): void => { feedState.mustBeUpdated = false; };

const getFeedUpdateState = (): boolean => Boolean(feedState.mustBeUpdated);

export {
  updateCoordinates,
  updateFeedEmoji,
  updateAllFeedState,
  getFeedState,
  markFeedAsUpdating,
  markFeedAsUpdated,
  getFeedUpdateState
};
