import { Injectable } from '@nestjs/common';
import { ActionResponse, Character } from 'apple-nest-interfaces';
import { CharacterService } from '../character/character.service';

const REWARD_TIME = 60 * 60;

@Injectable()
export class EventPlannerService {
  constructor(private characterService: CharacterService) {
  }

  async giveReward(character: Character, currentTime: number) {
    let remainingTime = 0;
    if (character.lastRewardDate) {
      remainingTime =
        REWARD_TIME - (currentTime - character.lastRewardDate) / 1000;
    }

    const response: ActionResponse = {
      character: {
        ...character,
      },
      message: '',
    }

    if (remainingTime > 0) {
      response.message = `${Math.ceil(remainingTime / 60)} minutes left until you can get another event reward`;
    } else {
      const currentMoney = character?.bag?.money || 0;
      response.character.bag = {
        ...(character.bag || {}),
        money: currentMoney + 1
      };
      response.character.lastRewardDate = currentTime;
      await this.characterService.update(response.character);

      response.message = 'Here is your reward';
    }
    return response;
  }

  isQuestComplete(character: Character) {
    switch(character.questNumber || 1) {
      case 1:
        return character?.bag?.money > 0
      case 2:
        return character?.bag?.seeds > 0
      default:
        return false;
    }
  }
}
