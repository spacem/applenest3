import {
  ActionBody,
  ActionResponse,
  ActionType,
  Character,
} from '@apple-nest-3/apple-nest-interfaces';
import { Webservice } from './WebService';

export class PlotWebservice extends Webservice {
  constructor() {
    super('/plot');
  }

  plantSeed(character: Character): Promise<ActionResponse> {
    const body: ActionBody = {
      type: ActionType.Plant,
      characterId: character.uuid,
    };
    return this.post(`/action`, body);
  }

  harvestCrop(character: Character): Promise<ActionResponse> {
    const body: ActionBody = {
      type: ActionType.Harvest,
      characterId: character.uuid,
    };
    return this.post(`/action`, body);
  }
}
