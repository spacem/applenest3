import {
  ActionResponse,
  ActionType,
  Character,
  QtyActionBody,
} from '@apple-nest-3/apple-nest-interfaces';
import { Webservice } from './WebService';

export class FarmerWebservice extends Webservice {
  constructor() {
    super('/farmer');
  }

  buySeeds(character: Character, numSeeds: number): Promise<ActionResponse> {
    const body: QtyActionBody = {
      type: ActionType.BuySeeds,
      characterId: character.uuid,
      quantity: numSeeds,
    };
    return this.post(`/action`, body);
  }
}
