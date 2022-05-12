import { GAME_PARAMETERS } from './constants/game-parameters';
import { SnakePart } from './typings';

const renderSnake = (gameContext: CanvasRenderingContext2D, snake: SnakePart[]) => {
  snake.forEach(({ x, y }) => {
    gameContext.lineWidth = GAME_PARAMETERS.SNAKE_LINE_WIDTH;
    gameContext.strokeStyle = GAME_PARAMETERS.SNAKE_STROKE_COLOR;
    gameContext.strokeRect(x, y, GAME_PARAMETERS.SNAKE_PART_SIZE, GAME_PARAMETERS.SNAKE_PART_SIZE);
    gameContext.fillStyle = GAME_PARAMETERS.SNAKE_FILL_COLOR;
    gameContext.fillRect(x, y, GAME_PARAMETERS.SNAKE_PART_SIZE, GAME_PARAMETERS.SNAKE_PART_SIZE);
  });
}

export { renderSnake };