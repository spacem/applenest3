import { Character } from 'apple-nest-interfaces';
import { Webservice } from './WebService';

export class EventPlannerWebservice extends Webservice {
  constructor() {
    super('/event-planner');
  }

  giveReward(character: Character) {
    return this.post(`/give-reward/${character.uuid}`);
  }
}