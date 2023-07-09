import { Injectable } from '@nestjs/common';
import {
  ActionResponse,
  Character,
  easyEnemies,
  hardEnemies,
} from '@apple-nest-3/apple-nest-interfaces';
import { CharacterService } from '../character/character.service';

@Injectable()
export class BattleService {
  constructor(private characterService: CharacterService) {}

  async battle(
    character: Character,
    enemyName: string
  ): Promise<ActionResponse> {
    const creature = [...easyEnemies, ...hardEnemies].find(
      (e) => e.name === enemyName
    );
    if (!creature) {
      return { character, message: `No such creature ${enemyName}` };
    }

    const { bag } = character;

    let hp = 100;
    let enemyHp = 100;
    let yourTurn = false;

    const doEnemyAttack = () => {
      const damage = creature.weapon * 10;
      const absorbedDamage = Math.min((bag?.shield || 0), damage)
      const actualDamage = (damage - absorbedDamage);
      const newHp = hp - actualDamage;
      hp = newHp;
    }
  
    const attackEnemy = () => {
      const damage = (bag?.weapon || 0) * 10;
      const absorbedDamage = Math.min(creature.shield, damage)
      const actualDamage = (damage - absorbedDamage);
      const newHp = enemyHp - actualDamage;
      enemyHp = newHp;
    }

    const giveTicket = async () => {
      const updatedCharacter = {
        ...character,
        bag: {
          ...character.bag,
          tickets: (character?.bag?.tickets || 0) + 1,
        },
      };
      await this.characterService.update(updatedCharacter);
    };

    for (let numTurns = 0; numTurns < 8; ++numTurns) {
      if (yourTurn) {
        attackEnemy();
      } else {
        doEnemyAttack();
      }
      yourTurn = !yourTurn;
      if (hp <= 0) {
        return { character, message: `${enemyName} won with ${enemyHp}% HP remaining` };
      }
      if (enemyHp <= 0) {
        await giveTicket();
        return { character, message: `You defeated the ${enemyName} with ${hp}% HP remaining and have recieved ${creature.reward > 1 ? `${creature.reward} tickets` : 'a single ticket' } as a reward` };
      }
    }

    return {
      character,
      message: `The battle took too long, the ${enemyName} ran away with ${enemyHp}% HP remaining`
    };
  }

  async collectWater(character: Character) {
    const water = character?.bag?.water || 0;
    if (water < character?.bag?.buckets) {
      const updatedCharacter = {
        ...character,
        bag: {
          ...character.bag,
          water: character?.bag?.buckets,
        },
      };
      await this.characterService.update(updatedCharacter);
      return {
        character: updatedCharacter,
        message: 'You filled up your buckets with water.',
      };
    } else {
      return {
        character,
        message: 'Cannot fetch water. Not enough empty buckets.',
      };
    }
  }
}
