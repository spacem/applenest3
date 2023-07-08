import { Injectable } from '@nestjs/common';
import {
  ActionResponse,
  Character
} from '@apple-nest-3/apple-nest-interfaces';
import { CharacterService } from '../character/character.service';
import { QuestService } from '../character/quest.service';

const REWARD_TIME = 60 * 60;

@Injectable()
export class EventPlannerService {
  constructor(private characterService: CharacterService, private questService: QuestService) {}

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
        )} minutes left until you can get any more.`,
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
        message: 'Here is your reward',
      };
    }
  }

  async completeQuest(character: Character) {
    const status = this.questService.isQuestComplete(character);
    if (status) {
      const updatedCharacter: Character = {
        ...character,
      };
      await this.characterService.update(updatedCharacter);

      return {
        character: updatedCharacter,
        message: 'Good job! Come back to me for more quests!',
      };
    } else {
      return {
        character: character,
        message: 'Looks like the quest is not completed???',
      };
    }
  }
}
