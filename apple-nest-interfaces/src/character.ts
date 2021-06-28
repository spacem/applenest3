import { Quest } from './quest';
import { Bag } from './bag';

export interface Character {
  uuid?: string;
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
