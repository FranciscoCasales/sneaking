import { SnakeDirections } from './enums/snake-directions';

export interface GameElement {
  x: number,
  y: number,
  pastState?: Omit<GameElement, 'emoji'>
  emoji: string,
}

export interface DirectionState {
  currentDirection: SnakeDirections,
  incomingDirection: SnakeDirections,
}

export type SnakePart = Omit<GameElement, 'emoji'>;

export type FeedState = Omit<GameElement, 'pastState'>;
