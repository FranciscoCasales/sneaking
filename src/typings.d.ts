import { SnakeDirections } from './enums/snake-directions';

export interface GameState {
  score: number;
  speed: number;
  feedStyle: string;
  isGameOver: boolean;
  gameLoop: Function;
  signOverlay: HTMLDivElement;
  isPaused: boolean;
}
export interface GameElement {
  x: number;
  y: number;
  width: number;
  height: number;
  pastState?: Omit<GameElement, 'emoji'>;
}

export interface DirectionState {
  currentDirection: SnakeDirections;
  incomingDirection: SnakeDirections;
}

export type SnakePart = GameElement;

export interface FeedState extends Omit<GameElement, 'pastState'> {
  emoji: string;
  mustBeUpdated?: boolean;
}
