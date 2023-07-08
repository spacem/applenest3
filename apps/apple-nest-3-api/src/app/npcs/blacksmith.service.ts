import { Injectable } from '@nestjs/common';
import {
  ActionResponse,
  Character
} from '@apple-nest-3/apple-nest-interfaces';
import { CharacterService } from '../character/character.service';

const WEAPON_COST = 20;
const SHIELD_COST = 20;

@Injectable()
export class BlacksmithService {
  constructor(private characterService: CharacterService) {}

  async buyWeapon(character: Character): Promise<ActionResponse> {
    const money = character?.bag?.money || 0;
    if (money > WEAPON_COST) {
      const updatedCharacter = {
        ...character,
        bag: {
          ...character.bag,
          money: money - WEAPON_COST,
          weapon: (character?.bag?.weapon || 0)  + 1,
        },
      };
      await this.characterService.update(updatedCharacter);
      return {
        character: updatedCharacter,
        message: character?.bag?.weapon ? `Upgraded to lv${character?.bag?.weapon}` : 'You now have a basic weapon.',
      };
    } else {
      return {
        character,
        message: `Not enough money. Weapons costs ${WEAPON_COST} to buy/upgrade.`,
      };
    }
  }

  async buyShield(character: Character): Promise<ActionResponse> {
    const money = character?.bag?.money || 0;
    if (money > SHIELD_COST) {
      const updatedCharacter = {
        ...character,
        bag: {
          ...character.bag,
          money: money - SHIELD_COST,
          shield: (character?.bag?.shield || 0)  + 1,
        },
      };
      await this.characterService.update(updatedCharacter);
      return {
        character: updatedCharacter,
        message: character?.bag?.weapon ? `Upgraded to lv${character?.bag?.shield}` : 'You now have a weak shield.',
      };
    } else {
      return {
        character,
        message: `Not enough money. Sheilds costs ${SHIELD_COST} to buy/upgrade.`,
      };
    }
  }
}
