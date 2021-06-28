import { Controller, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { Character } from 'apple-nest-interfaces';
import { CharacterService } from '../character/character.service';

@Controller('farmer')
export class FarmerController {
  constructor(private characterService: CharacterService) {
  }

  @Post('/buy-seeds/:characterId/:numSeeds')
  async giveReward(@Param('characterId') characterId, @Param('numSeeds') numSeedsString) {
    const character = await this.characterService.fetchById(characterId);
    if (!character) {
      throw new HttpException('Invalid character id' + characterId, HttpStatus.BAD_REQUEST);
    }

    const numSeeds = Number(numSeedsString);
    if (character.bag?.money > numSeeds) {
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
