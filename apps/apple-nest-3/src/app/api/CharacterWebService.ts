import { Character } from '@apple-nest-3/apple-nest-interfaces';
import { Webservice } from './WebService';

export class CharacterWebservice extends Webservice {
  constructor() {
    super('/character');
  }

  createCharacter(character: Partial<Character>) {
    return this.post('/', character);
  }

  getCharacters() {
    return this.get('/');
  }

  getCharacter(characterId: string) {
    return this.get(`/${characterId}`);
  }
}
