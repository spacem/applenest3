import { ActionResponse, Character } from 'apple-nest-interfaces';
import { Webservice } from './WebService';

export class FarmerWebservice extends Webservice {
  constructor() {
    super('/farmer');
  }

  buySeeds(character: Character, numSeeds: number): Promise<ActionResponse> {
    return this.post(`/buy-seeds/${character.uuid}/${numSeeds}`);
  }
}
