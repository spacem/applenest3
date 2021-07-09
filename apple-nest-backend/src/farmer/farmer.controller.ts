import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ActionType, Character, QtyActionBody } from 'apple-nest-interfaces';
import { CharacterService } from '../character/character.service';

@Controller('farmer')
export class FarmerController {
  constructor(private characterService: CharacterService) {
  }

  @Post('/action')
  async action(@Body() body: QtyActionBody) {
    if (body.type !== ActionType.BuySeeds) {
      throw new HttpException(`Invalid Farmer Action ${body.type}`, HttpStatus.BAD_REQUEST);
    }

    const character = await this.characterService.fetchById(body.characterId);
    if (!character) {
      throw new HttpException('Invalid character id' + body.characterId, HttpStatus.BAD_REQUEST);
    }

    const numSeeds = body.quantity;
    if (character.bag?.money >= numSeeds) {
      const updatedCharacter: Character = {
        ...character,
        bag: {
          ...character?.bag,
          money: character.bag.money - numSeeds,
          seeds: (character.bag.seeds || 0) + numSeeds
        }
      };
      await this.characterService.update(updatedCharacter);
      return {
        character: updatedCharacter,
        message: 'Here are your seeds'
      }
    } else {
      return {
        character,
        message: 'Not enough money'
      }
    }
  }
}
