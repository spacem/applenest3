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
      id: 'test',
      userId: '123',
      name: 'test name2',
    };
    jest
      .spyOn(characterService, 'fetchForUser')
      .mockImplementation(() => Promise.resolve([existing]));
    jest
      .spyOn(characterService, 'create')
      .mockImplementation(() => Promise.resolve(null));
    await controller.create({ name: 'test name', userId: '456' });
  });

  it('fails to create when exists', async () => {
    const existing = {
      id: 'test',
      userId: '123',
      name: 'test name',
    };
    jest
      .spyOn(characterService, 'fetchForUser')
      .mockImplementation(() => Promise.resolve([existing]));
    jest
      .spyOn(characterService, 'create')
      .mockImplementation(() => Promise.resolve(null));
    await expect(controller.create({ name: 'test name', userId: '456' })).rejects.toThrow(
      HttpException
    );
  });
});
