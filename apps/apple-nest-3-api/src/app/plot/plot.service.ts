import { Character } from '@apple-nest-3/apple-nest-interfaces';
import { Injectable } from '@nestjs/common';
import { CharacterService } from '../character/character.service';

const SEED_GROW_TIME = 30 * 1000;

@Injectable()
export class PlotService {
  constructor(private characterService: CharacterService) {
  }

  async plant(character: Character) {
    if (character.seedReadyDate != null) {
      return {
        message: 'Character is already growing a tree',
        character
      };
    }

    if (character.bag?.seeds > 0) {
      const updatedCharacter: Character = {
        ...character,
        bag: {
          ...character?.bag,
          seeds: character.bag.seeds - 1,
        },
        seedReadyDate: new Date().valueOf() + SEED_GROW_TIME,
      };
      await this.characterService.update(updatedCharacter);
      return {
        character: updatedCharacter,
        message: `That will take ${SEED_GROW_TIME / 1000} seconds to grow`,
      };
    } else {
      return {
        character,
        message: 'Not enough seeds',
      };
    }
  }

  async water(character: Character) {
    if (character.seedReadyDate == null) {
      return {
        message: 'Character is not growing a tree',
        character
      };
    }

    const timeLeft = Math.ceil(character.seedReadyDate - new Date().valueOf());
    const bonusTime = Math.floor(timeLeft / 2000);

    if (bonusTime < 1) {
      return {
        message: 'No need to water this. It\'s almost ready'
      }
    }

    const updatedCharacter: Character = {
      ...character,
      bag: {
        ...character?.bag,
        water: character.bag.water - 1,
      },
      seedReadyDate: character.seedReadyDate - (bonusTime * 1000),
    };
    await this.characterService.update(updatedCharacter);
    return {
      character: updatedCharacter,
      message: `Watering saved ${bonusTime} seconds`,
    };
  }

  async harvest(character: Character) {
    if (character.seedReadyDate == null) {
      return {
        message: 'Character is not growing a tree',
        character
      };
    }

    const timeLeft = Math.ceil(
      (character.seedReadyDate - new Date().valueOf()) / 1000
    );
    if (timeLeft > 0) {
      return {
        character: character,
        message: `${timeLeft} seconds remaining`,
      };
    }

    const numApples = Math.ceil(Math.random() * 5);

    const updatedCharacter: Character = {
      ...character,
      bag: {
        ...character?.bag,
        apples: (character.bag.apples || 0) + numApples,
      },
      seedReadyDate: null,
    };
    await this.characterService.update(updatedCharacter);
    return {
      character: updatedCharacter,
      message: `${numApples} apples grown`,
    };
  }
}
