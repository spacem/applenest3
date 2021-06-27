import { Controller, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CharacterService } from '../character/character.service';

@Controller('event-planner')
export class EventPlannerController {

  constructor(private characterService: CharacterService) {
  }

  @Post('/give-reward/:characterId')
  async giveReward(@Param('characterId') characterId) {
    const character = await this.characterService.fetchById(characterId);
    if (!character) {
      throw new HttpException('Invalid character id' + characterId, HttpStatus.BAD_REQUEST);
    }
    const currentMoney = character?.bag?.money || 0;
    character.bag = {
      ...(character.bag || {}),
      money: currentMoney + 1
    };

    await this.characterService.update(character);
    return character;
  }
}
