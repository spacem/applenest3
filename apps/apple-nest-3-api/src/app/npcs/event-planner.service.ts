import { Injectable } from '@nestjs/common';
import {
  ActionResponse,
  Character
} from '@apple-nest-3/apple-nest-interfaces';
import { CharacterService } from '../character/character.service';
import { QuestService } from '../character/quest.service';

const REWARD_TIME = 60 * 10;

@Injectable()
export class EventPlannerService {
  constructor(private characterService: CharacterService, private questService: QuestService) {}

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
