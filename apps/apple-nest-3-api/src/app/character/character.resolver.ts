import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CharacterService } from './character.service';

@Resolver('Character')
export class CharacterResolver {
  constructor(private characterService: CharacterService) {}

  @Query("character")
  async character(@Args('id') id: string) {
    const character = this.characterService.fetchById(id);
    if (character) {
      console.log('got character');
      return character;
    }
  }

  @Query("characters")
  async characters() {
    return this.characterService.fetchAll();
  }

  @Mutation("createCharacter")
  async createCharacter(@Args('name') name: string) {
    const characters = await this.characterService.fetchAll();
    if (characters?.find((c) => c.name === name)) {
      throw new Error('Character exists');
    }
    return await this.characterService.create(name);
  }
}
