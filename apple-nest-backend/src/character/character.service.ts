import { Injectable } from '@nestjs/common';
import { StoreService } from '../store/store.service';
import { Character } from 'apple-nest-interfaces';
import { v4 as uuidv4 } from 'uuid';

const CHARACTERS_KEY = 'characters';

@Injectable()
export class CharacterService {
  constructor(private store: StoreService) {}

  async fetchAll() {
    const characters: Character[] = await this.store.load(CHARACTERS_KEY);
    if (!characters) {
      return [];
    } else {
      return characters;
    }
  }

  async fetchById(id: string) {
    const characters = await this.fetchAll();
    return characters?.find(c => c.uuid === id);
  }

  async create(characterName: string) {
    const character: Character = {
      name: characterName,
      uuid: uuidv4()
    };
    let characters = await this.fetchAll();
    if (!characters) {
      characters = [];
    }
    characters.push(character);
    await this.store.save(CHARACTERS_KEY, characters);
    return character;
  }

  async update(character: Character) {
    let characters = await this.fetchAll();
    if (!characters) {
      characters = [];
    }

    const existing = characters.find(c => c.uuid === character.uuid);
    const index = characters.indexOf(existing);
    if(index >= 0) {
      characters[index] = character;
    } else {
      throw new Error('Character not found');
    }
    
    await this.store.save(CHARACTERS_KEY, characters);
    return character;
  }
}
