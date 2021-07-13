import { HttpException } from '@nestjs/common';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';

describe('CharacterController', () => {
  let controller: CharacterController;
  let characterService: CharacterService;

  beforeEach(async () => {
    characterService = new CharacterService({} as any);
    controller = new CharacterController(characterService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('no error when not exists', async () => {
    const existing = {
      uuid: 'test',
      name: 'test name2',
    };
    jest
      .spyOn(characterService, 'fetchAll')
      .mockImplementation(() => Promise.resolve([existing]));
    jest
      .spyOn(characterService, 'create')
      .mockImplementation(() => Promise.resolve(null));
    await controller.create({ name: 'test name' });
  });

  it('fails to create when exists', async () => {
    const existing = {
      uuid: 'test',
      name: 'test name',
    };
    jest
      .spyOn(characterService, 'fetchAll')
      .mockImplementation(() => Promise.resolve([existing]));
    jest
      .spyOn(characterService, 'create')
      .mockImplementation(() => Promise.resolve(null));
    await expect(controller.create({ name: 'test name' })).rejects.toThrow(
      HttpException
    );
  });
});
