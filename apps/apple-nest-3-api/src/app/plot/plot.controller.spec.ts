import { CharacterService } from '../character/character.service';
import { PlotController } from './plot.controller';

describe('PlotController', () => {
  let controller: PlotController;
  let characterService: CharacterService;

  beforeEach(async () => {
    characterService = new CharacterService({} as any);
    controller = new PlotController(characterService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
