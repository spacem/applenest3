import { Character } from '@apple-nest-3/apple-nest-interfaces';
import * as mongoose from 'mongoose';

export const CHARACTER_COLLECTION = 'Character';

export const CharacterSchema = new mongoose.Schema<Character>({
  name: String,
  userId: String,
  bag: {
    money: { type: Number },
    apples: { type: Number },
    seeds: { type: Number }
  },
  weaponLevel: Number,
  armourLevel: Number,
  lastRewardDate: Number,
  seedReadyDate: Number,
  megaSeedReadyDate: Number,
  legendarySeedReadyDate: Number,
  rankBeaten: Number,
  questNumber: Number
});
