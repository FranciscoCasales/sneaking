import { SnakeDirections } from './enums/snake-directions';

export interface SnakePart {
  x: number;
  y: number;
}

export interface SnakePartWithPastInfo extends SnakePart {
  pastState?: SnakeWithDirection;
}