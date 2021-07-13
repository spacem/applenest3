import { CharacterService } from '../character/character.service';
import { EventPlannerController } from './event-planner.controller';

describe('EventPlannerController', () => {
  let controller: EventPlannerController;
  let characterService: CharacterService;

  beforeEach(async () => {
    characterService = new CharacterService({} as any);
    controller = new EventPlannerController(characterService, {} as any);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
