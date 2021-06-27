import { ActionResponse, Character } from 'apple-nest-interfaces';
import { Webservice } from './WebService';

export class EventPlannerWebservice extends Webservice {
  constructor() {
    super('/event-planner');
  }

  giveReward(character: Character): Promise<ActionResponse> {
    return this.post(`/give-reward/${character.uuid}`);
  }

  completeQuest(character: Character): Promise<ActionResponse> {
    return this.post(`/complete-quest/${character.uuid}`);
  }
}