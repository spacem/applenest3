import { Character } from '@apple-nest-3/apple-nest-interfaces';
import { Injectable } from '@nestjs/common';
import { CharacterService } from '../character/character.service';

@Injectable()
export class MarketService {
  constructor(private characterService: CharacterService) {
  }

  async sell(character: Character) {
    if (character.bag?.apples > 0) {
      const profit = Math.floor(character.bag?.apples * (Math.random() + 1.5) * 10);
      const updatedCharacter: Character = {
        ...character,
        bag: {
          ...character?.bag,
          money: character.bag.money + profit,
          apples: 0,
        },
      };
      await this.characterService.update(updatedCharacter);
      return {
        character: updatedCharacter,
        message: `Sold for ${profit}`,
      };
    } else {
      return {
        character,
        message: 'You do not have anything to sell',
      };
    }
  }
}
