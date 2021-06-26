import { HttpException, HttpStatus } from '@nestjs/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Character } from 'apple-nest-interfaces'
import { StoreService } from 'src/store/store.service';
import { v4 as uuidv4 } from 'uuid';

const CHARACTERS_KEY = 'characters';

@Controller('character')
export class CharacterController {
  constructor(private store: StoreService) {}

  @Get()
  async get() {
    const characters = await this.store.load(CHARACTERS_KEY);
    if (!characters) {
      return [];
    } else {
      return characters;
    }
  }

  @Post('/create')
  async create(@Body() character: Character) {
    if (!character.name) {
      throw new HttpException('Character must have a name', HttpStatus.BAD_REQUEST);
    }

    let characters: Character[] = await this.store.load(CHARACTERS_KEY);
    if (!characters) {
      characters = [];
    }

    if (characters.find(c => c.name === character.name)) {
      throw new HttpException('Character exists', HttpStatus.BAD_REQUEST);
    }

    character.uuid = uuidv4();
    characters.push(character);
    await this.store.save(CHARACTERS_KEY, characters);
  }
}
