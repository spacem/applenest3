import { HttpException, HttpStatus } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EventPlannerService } from '../event-planner/event-planner.service';
import { CharacterService } from './character.service';

@Resolver('Character')
export class CharacterResolver {
  constructor(
    private characterService: CharacterService,
    private eventPlannerService: EventPlannerService) {}

  @Query("character")
  async character(@Args('id') id: string) {
    const character = this.characterService.fetchById(id);
    if (character) {
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

  @Mutation('collectReward')
  async collectReward(@Args('id') id: string) {
    const character = await this.characterService.fetchById(id);
    if (!character) {
      throw new HttpException(`Invalid character id ${id}`, HttpStatus.BAD_REQUEST);
    }
    return await this.eventPlannerService.giveReward(
      character,
      new Date().valueOf()
    );
  }

  @Mutation('completeQuest')
  async completeQuest(@Args('id') id: string) {
    const character = await this.characterService.fetchById(id);
    if (!character) {
      throw new HttpException(`Invalid character id ${id}`, HttpStatus.BAD_REQUEST);
    }
    return this.eventPlannerService.completeQuest(character);
  }
}
