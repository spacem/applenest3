import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ActionType,
  QtyActionBody,
} from '@apple-nest-3/apple-nest-interfaces';
import { CharacterService } from '../character/character.service';
import { FarmerService } from './farmer.service';

@Controller('farmer')
export class FarmerController {
  constructor(
    private characterService: CharacterService,
    private farmerService: FarmerService) {}

  @Post('/action')
  async action(@Body() body: QtyActionBody) {
    if (body.type !== ActionType.BuySeeds) {
      throw new HttpException(
        `Invalid Farmer Action ${body.type}`,
        HttpStatus.BAD_REQUEST
      );
    }

    const character = await this.characterService.fetchById(body.characterId);
    if (!character) {
      throw new HttpException(
        'Invalid character id' + body.characterId,
        HttpStatus.BAD_REQUEST
      );
    }

    const numSeeds = body.quantity;
    return this.farmerService.buySeeds(character, numSeeds);
  }
}
