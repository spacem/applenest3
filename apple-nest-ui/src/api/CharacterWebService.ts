import { Character } from '../../../apple-nest-interfaces/src';
import { Webservice } from './WebService';

export class CharacterWebservice extends Webservice {

  constructor() {
    super('/character');
  }

  createCharacter(character: Partial<Character>) {
    return this.post('/create', character);
  }

  getCharacters() {
    return this.get('/');
  }
}