import { BattleCreature } from './battle-creature';

export const hardEnemies: BattleCreature[] = [
  {
    name: 'Forest Goblin',
    reward: 10,
    weapon: 10,
    shield: 20,
    battleStart:
      'A deamon like creature, the Forest Goblin, jumps out of a tree and attacks you.',
  },
  {
    name: 'Possesed Snake',
    reward: 10,
    weapon: 20,
    shield: 10,
    battleStart: 'A Possessed Snake slithers out of the long grass and attacks you.'
  },
  {
    name: 'Flying Monster',
    reward: 100,
    weapon: 200,
    shield: 100,
    battleStart: 'A Flying Monster swoops through the trees and and attacks you.'
  }
];
