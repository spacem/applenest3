import { Injectable } from '@nestjs/common';
import { Character, Quest } from '@apple-nest-3/apple-nest-interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { CHARACTER_COLLECTION } from '../store/character.schema';
import { Document, Model } from 'mongoose';

@Injectable()
export class QuestService {

  isQuestComplete(character: Character) {
    switch (character.questNumber || Quest.GetMoney) {
      case Quest.GetMoney:
        return character?.bag?.money > 0;
      case Quest.BuySeed:
        return character?.bag?.seeds > 0;
      case Quest.GrowApple:
        return character?.bag?.apples > 0;
      default:
        return false;
    }
  }

  getNextQuestNumber(character) {
    if (this.isQuestComplete(character)) {
      return character.questNumber ? character.questNumber + 1 : 2
    } else {
      return character.questNumber;
    }
  }
}
