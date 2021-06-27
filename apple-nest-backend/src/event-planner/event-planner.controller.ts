import { Controller, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CharacterService } from '../character/character.service';

const REWARD_TIME = 60 * 60;

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
    
    let remainingTime = 0;
    if (character.lastRewardDate) {
      remainingTime =
        REWARD_TIME - (new Date().valueOf() - character.lastRewardDate) / 1000;
    }

    if (remainingTime > 0) {
      const message = `${Math.ceil(remainingTime / 60)} minutes left until you can get another event reward`;
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }

    const currentMoney = character?.bag?.money || 0;
    character.bag = {
      ...(character.bag || {}),
      money: currentMoney + 1
    };
    character.lastRewardDate = new Date().valueOf();

    await this.characterService.update(character);
    return character;
  }
}
