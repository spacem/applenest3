import { Character } from '@apple-nest-3/apple-nest-interfaces';
import { Injectable } from '@nestjs/common';
import { CharacterService } from '../character/character.service';
import { EventPlannerService } from '../event-planner/event-planner.service';

@Injectable()
export class FarmerService {
  constructor(private characterService: CharacterService) {
  }

  async buySeeds(character: Character, numSeeds: number) {
    if (character.bag?.money >= numSeeds) {
      const updatedCharacter: Character = {
        ...character,
        bag: {
          ...character?.bag,
          money: character.bag.money - numSeeds,
          seeds: (character.bag.seeds || 0) + numSeeds,
        },
      };
      await this.characterService.update(updatedCharacter);
      return {
        character: updatedCharacter,
        message: 'Here are your seeds',
      };
    } else {
      return {
        character,
        message: 'Not enough money',
      };
    }
  }
}
