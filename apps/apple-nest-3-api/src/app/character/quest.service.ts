import { Injectable } from '@nestjs/common';
import { Character, Quest } from '@apple-nest-3/apple-nest-interfaces';

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
      case Quest.GetWater:
        return character?.bag?.water > 0;
      case Quest.BuyBucket:
        return character?.bag?.buckets > 0;
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
