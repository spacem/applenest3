import { ActionType } from './action-type';

export interface ActionBody {
  type: ActionType;
  characterId?: string;
}
