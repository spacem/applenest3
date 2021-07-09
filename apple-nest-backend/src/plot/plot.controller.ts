import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CharacterService } from '../character/character.service';
import { ActionBody, ActionType, Character } from 'apple-nest-interfaces';

const SEED_GROW_TIME = 60 * 1000;

@Controller('plot')
export class PlotController {
  constructor(private characterService: CharacterService) {
  }

  @Post('/action')
  async action(@Body() body: ActionBody) {
    const character = await this.characterService.fetchById(body.characterId);
    if (!character) {
      throw new HttpException('Invalid character id' + body.characterId, HttpStatus.BAD_REQUEST);
    }

    switch(body.type) {
      case ActionType.Plant:
        return this.plant(character);
      case ActionType.Harvest:
        return this.harvest(character);
      default:
        throw new HttpException(`Invalid Plot Action ${body.type}`, HttpStatus.BAD_REQUEST);
    }
  }

  async plant(character: Character) {
    if (character.seedReadyDate != null) {
      throw new HttpException('Character is already growing a tree', HttpStatus.BAD_REQUEST);
    }

    if (character.bag?.seeds > 0) {
      const updatedCharacter: Character = {
        ...character,
        bag: {
          ...character?.bag,
          seeds: character.bag.seeds - 1
        },
        seedReadyDate: new Date().valueOf() + SEED_GROW_TIME
      };
      await this.characterService.update(updatedCharacter);
      return {
        character: updatedCharacter,
        message: `That will take ${SEED_GROW_TIME / 1000} seconds to grow`
      }
    } else {
      return {
        character,
        message: 'Not enough seeds'
      }
    }
  }
  
  async harvest(character: Character) {
    if (character.seedReadyDate == null) {
      throw new HttpException('Character is not growing a tree', HttpStatus.BAD_REQUEST);
    }

    const timeLeft = Math.ceil((character.seedReadyDate - new Date().valueOf()) / 1000);
    if (timeLeft > 0) {
      return {
        character: character,
        message: `${timeLeft} seconds remaining`
      };
    }

    const numApples = Math.ceil(Math.random() * 5);

    const updatedCharacter: Character = {
      ...character,
      bag: {
        ...character?.bag,
        apples: (character.bag.apples || 0) + numApples
      },
      seedReadyDate: null
    };
    await this.characterService.update(updatedCharacter);
    return {
      character: updatedCharacter,
      message: `${numApples} apples grown`
    }
  }
}
