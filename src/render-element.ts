import { GAME_PARAMETERS } from './constants/game-parameters';
import { getFeedState, getFeedUpdateState, markFeedAsUpdated, updateCoordinates } from './state/feed-state';
import { getSnakeStructure } from './state/snake-state';

const renderSnake = (gameContext: CanvasRenderingContext2D) => {
  getSnakeStructure().forEach(({ x, y }) => {
    gameContext.lineWidth = GAME_PARAMETERS.SNAKE_LINE_WIDTH;
    gameContext.strokeStyle = GAME_PARAMETERS.SNAKE_STROKE_COLOR;
    gameContext.strokeRect(x, y, GAME_PARAMETERS.SNAKE_PART_SIZE, GAME_PARAMETERS.SNAKE_PART_SIZE);
    gameContext.fillStyle = GAME_PARAMETERS.SNAKE_FILL_COLOR;
    gameContext.fillRect(x, y, GAME_PARAMETERS.SNAKE_PART_SIZE, GAME_PARAMETERS.SNAKE_PART_SIZE);
  });
};

const renderSnakeFeed = (gameContext: CanvasRenderingContext2D, { width, height }: HTMLCanvasElement): boolean => {
  let feedState = getFeedState();
  if (feedState.mustBeUpdated) {
    feedState = updateCoordinates(width, height);
    markFeedAsUpdated();
  }
  gameContext.font = `${GAME_PARAMETERS.SNAKE_FEED_SIZE}px Sans-Serif`;
  gameContext.textAlign = 'left';
  gameContext.textBaseline = 'top';
  gameContext.fillText('🍎', feedState.x, feedState.y);
  return true;
};

export { renderSnake, renderSnakeFeed };
