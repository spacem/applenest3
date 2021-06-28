import { Character } from 'apple-nest-interfaces';
import { CharacterService } from '../character/character.service';
import { EventPlannerService } from './event-planner.service';

describe('EventPlannerService', () => {
  let service: EventPlannerService;
  let characterService: CharacterService;

  beforeEach(async () => {
    characterService = new CharacterService({} as any);
    service = new EventPlannerService(characterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('gives reward when no bag', async () => {
    const testCharacter: Character = {
      uuid: '123',
      name: 'test'
    }

    jest.spyOn(characterService, 'update').mockImplementation(c => Promise.resolve(c));
    const result = await service.giveReward(testCharacter, 99999999);
    expect(result.character.bag.money).toBe(1);
  });

  it('gives reward when no time', async () => {
    const testCharacter: Character = {
      uuid: '123',
      name: 'test',
      bag: {
        money: 22
      }
    }

    jest.spyOn(characterService, 'update').mockImplementation(c => Promise.resolve(c));
    const result = await service.giveReward(testCharacter, 0);
    expect(result.character.bag.money).toBe(23);
  });

  it('gives reward when time past due', async () => {
    const testCharacter: Character = {
      lastRewardDate: 1,
      uuid: '123',
      name: 'test',
      bag: {
        money: 22
      }
    }

    jest.spyOn(characterService, 'update').mockImplementation(c => Promise.resolve(c));
    const result = await service.giveReward(testCharacter, 99999999);
    expect(result.character.bag.money).toBe(23);
  });

  it('does not give when time not up', async () => {
    const testCharacter: Character = {
      lastRewardDate: 1,
      uuid: '123',
      name: 'test',
      bag: {
        money: 22
      }
    }

    jest.spyOn(characterService, 'update').mockImplementation(c => Promise.resolve(c));
    const result = await service.giveReward(testCharacter, 1);
    expect(result.character.bag.money).toBe(22);
  });
});
