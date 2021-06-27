import { Controller, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { Character } from 'apple-nest-interfaces';
import { CharacterService } from '../character/character.service';
import { EventPlannerService } from './event-planner.service';

@Controller('event-planner')
export class EventPlannerController {

  constructor(
    private characterService: CharacterService,
    private eventPlannerService: EventPlannerService) {
  }

  @Post('/give-reward/:characterId')
  async giveReward(@Param('characterId') characterId) {
    const character = await this.characterService.fetchById(characterId);
    if (!character) {
      throw new HttpException('Invalid character id' + characterId, HttpStatus.BAD_REQUEST);
    }
    return await this.eventPlannerService.giveReward(character, new Date().valueOf());
  }

  @Post('/complete-quest/:characterId')
  async completeQuest(@Param('characterId') characterId) {
    const character = await this.characterService.fetchById(characterId);
    if (!character) {
      throw new HttpException('Invalid character id' + characterId, HttpStatus.BAD_REQUEST);
    }

    const status = this.eventPlannerService.isQuestComplete(character);
    if (status) {
      const updatedCharacter: Character = {
        ...character,
        questNumber: character.questNumber ? character.questNumber + 1 : 2
      };
      await this.characterService.update(updatedCharacter);

      return {
        character: updatedCharacter,
        message: 'Good job! Come back to me for more quests!'
      };
    } else {
      return {
        character: character,
        message: 'Looks like the quest is not completed???'
      };
    }
  }
}
