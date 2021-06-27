import { CharacterService } from '../character/character.service';
import { Character } from 'apple-nest-interfaces';
import { EventPlannerController } from './event-planner.controller';

describe('EventPlannerController', () => {
  let controller: EventPlannerController;
  let characterService: CharacterService;

  beforeEach(async () => {
    characterService = new CharacterService({} as any);
    controller = new EventPlannerController(characterService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('gives reward', async () => {
    const testCharacter: Character = {
      uuid: '123',
      name: 'test',
      lastRewardDate: 123,
      bag: {
        money: 22
      }
    }

    jest.spyOn(characterService, 'fetchById').mockImplementation(() => Promise.resolve(testCharacter));
    jest.spyOn(characterService, 'update').mockImplementation(c => Promise.resolve(c));
    
    const newCharacter = await controller.giveReward('test');
    expect(newCharacter.bag.money).toBe(23);
  });
});
