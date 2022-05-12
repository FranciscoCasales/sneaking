import { GAME_PARAMETERS } from './constants/game-parameters';
import { remToPixel } from './utils/rem-to-pixel';

const drawGameBoard = (): CanvasRenderingContext2D => {
  const gameCanvas = document.getElementById('game_board') as HTMLCanvasElement;
  resizeCanvas(gameCanvas);
  window.addEventListener('resize', resizeCanvas.bind(null, gameCanvas));
  gameCanvas.style.margin = '1rem';
  gameCanvas.style.backgroundColor = GAME_PARAMETERS.BOARD_COLOR;
  gameCanvas.style.border = '1px solid black';
  return gameCanvas.getContext('2d') as CanvasRenderingContext2D;
}

const cleanGameBoard = (gameContext: CanvasRenderingContext2D) => {
  gameContext.clearRect(0, 0, gameContext.canvas.width, gameContext.canvas.height);
}

const resizeCanvas = (gameCanvas: HTMLCanvasElement) => {
  const { width, height } = getScreenSize();
  gameCanvas.width = width - remToPixel(2) - 10;
  gameCanvas.height = height - remToPixel(2) - 10;
}

const getScreenSize = () => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  return {
    width: screenWidth,
    height: screenHeight
  }
}

export { drawGameBoard, cleanGameBoard };