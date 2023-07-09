import { BattleCreature } from './battle-creature';

export const easyEnemies: BattleCreature[] = [
  {
    name: 'Armoured Goblin',
    reward: 1,
    weapon: 1,
    shield: 2,
    battleStart:
      'A deamon like creature, the Armoured Goblin, runs across the field and attacks you.',
  },
  {
    name: 'Balanced Goblin',
    reward: 1,
    weapon: 2,
    shield: 1,
    battleStart:
      'A deamon like creature, the Balanced Goblin, runs across the field and attacks you.',
  },
  {
    name: 'Vicious Troll',
    reward: 1,
    weapon: 5,
    shield: 0,
    battleStart: 'As you walk over a bridge the Vicious Troll crawls out and attacks you.'
  }
];
