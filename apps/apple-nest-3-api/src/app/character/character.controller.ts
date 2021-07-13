import { HttpException, HttpStatus, Param } from '@nestjs/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Character } from '@apple-nest-3/apple-nest-interfaces';
import { CharacterService } from './character.service';

@Controller('character')
export class CharacterController {
  constructor(private characterService: CharacterService) {}

  @Get()
  get() {
    return this.characterService.fetchAll();
  }

  @Get('/:id')
  async getById(@Param('id') id) {
    const character = this.characterService.fetchById(id);
    if (!character) {
      throw new HttpException('Invalid character', HttpStatus.BAD_REQUEST);
    } else {
      return character;
    }
  }

  @Post('/')
  async create(@Body() character: Character) {
    if (!character.name) {
      throw new HttpException(
        'Character must have a name',
        HttpStatus.BAD_REQUEST
      );
    }

    const characters = await this.characterService.fetchAll();
    if (characters?.find((c) => c.name === character.name)) {
      throw new HttpException('Character exists', HttpStatus.BAD_REQUEST);
    }
    await this.characterService.create(character.name);
  }
}
