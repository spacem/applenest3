import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ActionBody,
  ActionType,
} from '@apple-nest-3/apple-nest-interfaces';
import { CharacterService } from '../character/character.service';
import { EventPlannerService } from './event-planner.service';

@Controller('event-planner')
export class EventPlannerController {
  constructor(
    private characterService: CharacterService,
    private eventPlannerService: EventPlannerService
  ) {}

  @Post('/action')
  async action(@Body() body: ActionBody) {
    const character = await this.characterService.fetchById(body.characterId);
    if (!character) {
      throw new HttpException(
        `Invalid character id ${body.characterId}`,
        HttpStatus.BAD_REQUEST
      );
    }

    switch (body.type) {
      case ActionType.Reward:
        return await this.eventPlannerService.giveReward(
          character,
          new Date().valueOf()
        );
      case ActionType.Quest:
        return this.eventPlannerService.completeQuest(character);
      default:
        throw new HttpException(
          `Invalid event planner action ${body.type}`,
          HttpStatus.BAD_REQUEST
        );
    }
  }
}
