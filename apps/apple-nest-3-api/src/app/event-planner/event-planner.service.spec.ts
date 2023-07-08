import { Character } from '@apple-nest-3/apple-nest-interfaces';
import { CharacterService } from '../character/character.service';
import { EventPlannerService } from './event-planner.service';

describe('EventPlannerService', () => {
  let service: EventPlannerService;
  let characterService: CharacterService;

  beforeEach(async () => {
    characterService = new CharacterService({} as any, {} as any);
    service = new EventPlannerService(characterService, {} as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('gives reward when no bag', async () => {
    const testCharacter: Character = {
      _id: '123',
      name: 'test',
      userId: '456'
    };

    jest
      .spyOn(characterService, 'update')
      .mockImplementation(() => Promise.resolve());
    const result = await service.giveReward(testCharacter, 99999999);
    expect(result.character.bag.money).toBe(1);
  });

  it('gives reward when no time', async () => {
    const testCharacter: Character = {
      _id: '123',
      userId: '456',
      name: 'test',
      bag: {
        money: 22,
      },
    };

    jest
      .spyOn(characterService, 'update')
      .mockImplementation(() => Promise.resolve());
    const result = await service.giveReward(testCharacter, 0);
    expect(result.character.bag.money).toBe(23);
  });

  it('gives reward when time past due', async () => {
    const testCharacter: Character = {
      lastRewardDate: 1,
      _id: '123',
      userId: '456',
      name: 'test',
      bag: {
        money: 22,
      },
    };

    jest
      .spyOn(characterService, 'update')
      .mockImplementation(() => Promise.resolve());
    const result = await service.giveReward(testCharacter, 99999999);
    expect(result.character.bag.money).toBe(23);
  });

  it('does not give when time not up', async () => {
    const testCharacter: Character = {
      lastRewardDate: 1,
      _id: '123',
      userId: '456',
      name: 'test',
      bag: {
        money: 22,
      },
    };

    jest
      .spyOn(characterService, 'update')
      .mockImplementation(() => Promise.resolve());
    const result = await service.giveReward(testCharacter, 1);
    expect(result.character.bag.money).toBe(22);
  });
});
