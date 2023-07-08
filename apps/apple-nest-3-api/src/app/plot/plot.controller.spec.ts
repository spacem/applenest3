import { CharacterService } from '../character/character.service';
import { PlotController } from './plot.controller';
import { PlotService } from './plot.service';

describe('PlotController', () => {
  let controller: PlotController;
  let characterService: CharacterService;

  beforeEach(async () => {
    characterService = new CharacterService({} as any, {} as any);
    controller = new PlotController(characterService, new PlotService(characterService));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
