import { ActionType, Character } from '@apple-nest-3/apple-nest-interfaces';
import { CharacterService } from '../character/character.service';
import { FarmerController } from './farmer.controller';
import { FarmerService } from './farmer.service';

describe('FarmerController', () => {
  let controller: FarmerController;
  let characterService: CharacterService;

  beforeEach(async () => {
    characterService = new CharacterService({} as any);
    controller = new FarmerController(characterService, new FarmerService(characterService));
  });

  it('takes money and gives seeds', async () => {
    const testCharacter: Character = {
      name: 'n',
      _id: 'u',
      userId: '123',
      bag: {
        money: 22,
      },
    };

    jest
      .spyOn(characterService, 'update')
      .mockImplementation(() => Promise.resolve());
    jest
      .spyOn(characterService, 'fetchById')
      .mockImplementation(() => Promise.resolve(testCharacter));
    const result = await controller.action({
      characterId: 'u',
      quantity: 2,
      type: ActionType.BuySeeds,
    });
    expect(result.character.bag.money).toBe(20);
    expect(result.character.bag.seeds).toBe(2);
  });
});
