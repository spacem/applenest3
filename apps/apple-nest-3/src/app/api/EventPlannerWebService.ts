import {
  ActionBody,
  ActionResponse,
  ActionType,
  Character,
} from '@apple-nest-3/apple-nest-interfaces';
import { Webservice } from './WebService';

export class EventPlannerWebservice extends Webservice {
  constructor() {
    super('/event-planner');
  }

  giveReward(character: Character): Promise<ActionResponse> {
    const body: ActionBody = {
      type: ActionType.Reward,
      characterId: character.id,
    };
    return this.post(`/action`, body);
  }

  completeQuest(character: Character): Promise<ActionResponse> {
    const body: ActionBody = {
      type: ActionType.Quest,
      characterId: character.id,
    };
    return this.post(`/action`, body);
  }
}
