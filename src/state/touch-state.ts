import { SnakeDirections } from "../enums/snake-directions";
import { TouchState } from "../typings";

const touchState: TouchState = {
  initialX: 0,
  initialY: 0,
  endX: 0,
  endY: 0,
  swipeDirection: SnakeDirections.RIGHT
}

const updateInitialTouchCoordinates = (x: number, y: number) => {
  touchState.initialX = x;
  touchState.initialY = y;
}

const updateEndTouchCoordinates = (x: number, y: number) => {
  touchState.endX = x;
  touchState.endY = y;
}

const getTouchState = () => {
  return { ...touchState };
}
const setSwipeDirection = (swipeDirection: SnakeDirections) => touchState.swipeDirection = swipeDirection;

const getSwipeDirection = () => {
  const { initialX, initialY, endX, endY } = getTouchState();
  const xDifference = endX - initialX;
  const yDifference = endY - initialY;
  const isHorizontal = Math.abs(xDifference) > Math.abs(yDifference);
  if (isHorizontal && xDifference >= 0) setSwipeDirection(SnakeDirections.RIGHT);
  if (isHorizontal && xDifference < 0) setSwipeDirection(SnakeDirections.LEFT);
  if (!isHorizontal && yDifference >= 0) setSwipeDirection(SnakeDirections.DOWN);
  if (!isHorizontal && yDifference < 0) setSwipeDirection(SnakeDirections.UP);
  return touchState.swipeDirection;
}

export { updateInitialTouchCoordinates, updateEndTouchCoordinates, getTouchState, getSwipeDirection };