import { Injectable } from '@nestjs/common';
import {
  ActionResponse,
  Character
} from '@apple-nest-3/apple-nest-interfaces';
import { CharacterService } from '../character/character.service';

const REWARD_TIME = 60 * 10;

@Injectable()
export class WellService {
  constructor(private characterService: CharacterService) {}

  async giveReward(
    character: Character,
    currentTime: number
  ): Promise<ActionResponse> {
    let remainingTime = 0;
    if (character.lastRewardDate) {
      remainingTime =
        REWARD_TIME - (currentTime - character.lastRewardDate) / 1000;
    }

    if (remainingTime > 0) {
      return {
        character,
        message: `Come back in ${Math.ceil(
          remainingTime / 60
        )} minutes to get more.`,
      };
    } else {
      const updatedCharacter = {
        ...character,
        lastRewardDate: currentTime,
        bag: {
          ...character.bag,
          money: (character?.bag?.money || 0) + 1,
        },
      };
      await this.characterService.update(updatedCharacter);
      return {
        character: updatedCharacter,
        message: 'You found some money. Click character info to view your inventory.',
      };
    }
  }

  async collectWater(character: Character) {
    const water = character?.bag?.water || 0;
    if (water < character?.bag?.buckets) {
      const updatedCharacter = {
        ...character,
        bag: {
          ...character.bag,
          water: (character?.bag?.water || 0)  + 1,
        },
      };
      await this.characterService.update(updatedCharacter);
      return {
        character: updatedCharacter,
        message: 'You filled up a bucket with water.',
      };
    } else {
      return {
        character,
        message: 'Cannot fetch water. Not enough empty buckets.',
      };
    }
  }
}
