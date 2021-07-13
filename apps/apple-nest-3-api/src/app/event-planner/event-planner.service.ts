import { Injectable } from '@nestjs/common';
import {
  ActionResponse,
  Character,
  Quest,
} from '@apple-nest-3/apple-nest-interfaces';
import { CharacterService } from '../character/character.service';

const REWARD_TIME = 60 * 60;

@Injectable()
export class EventPlannerService {
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
        message: `${Math.ceil(
          remainingTime / 60
        )} minutes left until you can get another event reward`,
      };
    } else {
      const updateCharacter = {
        ...character,
        lastRewardDate: currentTime,
        bag: {
          ...character.bag,
          money: (character?.bag?.money || 0) + 1,
        },
      };
      await this.characterService.update(updateCharacter);

      return {
        character: updateCharacter,
        message: 'Here is your reward',
      };
    }
  }

  isQuestComplete(character: Character) {
    switch (character.questNumber || Quest.GetMoney) {
      case Quest.GetMoney:
        return character?.bag?.money > 0;
      case Quest.BuySeed:
        return character?.bag?.seeds > 0;
      case Quest.GrowApple:
        return character?.bag?.apples > 0;
      default:
        return false;
    }
  }
}
