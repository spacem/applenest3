import { Quest } from './quest';
import { Bag } from './bag';

export interface Character {
  _id?: string;
  userId: string;
  name: string;
  bag?: Bag;
  weaponLevel?: number;
  armourLevel?: number;
  lastRewardDate?: number;
  seedReadyDate?: number;
  megaSeedReadyDate?: number;
  legendarySeedReadyDate?: number;
  rankBeaten?: number;
  questNumber?: Quest;
}
