import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CharacterService } from '../character/character.service';
import {
  ActionBody,
  ActionType
} from '@apple-nest-3/apple-nest-interfaces';
import { PlotService } from './plot.service';

@Controller('plot')
export class PlotController {
  constructor(
    private characterService: CharacterService,
    private plotService: PlotService) {}

  @Post('/action')
  async action(@Body() body: ActionBody) {
    const character = await this.characterService.fetchById(body.characterId);
    if (!character) {
      throw new HttpException(
        'Invalid character id' + body.characterId,
        HttpStatus.BAD_REQUEST
      );
    }

    switch (body.type) {
      case ActionType.Plant:
        return this.plotService.plant(character);
      case ActionType.Harvest:
        return this.plotService.harvest(character);
      default:
        throw new HttpException(
          `Invalid Plot Action ${body.type}`,
          HttpStatus.BAD_REQUEST
        );
    }
  }
}
