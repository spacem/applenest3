import { Character } from '@apple-nest-3/apple-nest-interfaces';
import { Injectable } from '@nestjs/common';
import { CharacterService } from '../character/character.service';

const BUCKET_PRICE = 10;

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

  async buyBucket(character: Character) {
    if (character.bag?.money > BUCKET_PRICE) {
      const updatedCharacter: Character = {
        ...character,
        bag: {
          ...character?.bag,
          money: character?.bag?.money - BUCKET_PRICE,
          buckets: (character?.bag?.buckets || 0) + 1
        },
      };
      await this.characterService.update(updatedCharacter);
      return {
        character: updatedCharacter,
        message: `Purchased one bucket`,
      };
    } else {
      return {
        character,
        message: `You do not have enough money. They cost ${BUCKET_PRICE}.`,
      };
    }
  }
}
