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

  it('no error when not exists', () => {
    const existing = {
      uuid: 'test',
      name: 'test name2'
    };
    jest.spyOn(characterService, 'fetchAll').mockImplementation(() => Promise.resolve([existing]));
    jest.spyOn(characterService, 'create').mockImplementation(() => Promise.resolve(null));
    expect(controller.create({ name: 'test name' })).rejects.toThrow(HttpException);
  });

  it('fails to create when exists', () => {
    const existing = {
      uuid: 'test',
      name: 'test name'
    };
    jest.spyOn(characterService, 'fetchAll').mockImplementation(() => Promise.resolve([existing]));
    jest.spyOn(characterService, 'create').mockImplementation(() => Promise.resolve(null));
    expect(controller.create({ name: 'test name' })).rejects.toThrow(HttpException);
  });
});
