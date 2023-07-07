import { HttpException, HttpStatus } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EventPlannerService } from '../event-planner/event-planner.service';
import { FarmerService } from '../farmer/farmer.service';
import { PlotService } from '../plot/plot.service';
import { CharacterService } from './character.service';
import { MarketService } from '../market/market.service';

@Resolver('Character')
export class CharacterResolver {
  constructor(
    private characterService: CharacterService,
    private eventPlannerService: EventPlannerService,
    private farmerService: FarmerService,
    private marketService: MarketService,
    private plotService: PlotService) {}

  @Query("character")
  async getCharacter(@Args('id') id: string) {
    const character = this.characterService.fetchById(id);
    if (character) {
      return character;
    } else {
      throw new HttpException(`Invalid character id ${id}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Query("characters")
  async characters(@Args('userId') userId: string) {
    return this.characterService.fetchForUser(userId);
  }

  @Mutation("createCharacter")
  async createCharacter(@Args('userId') userId: string, @Args('name') name: string) {
    const characters = await this.characterService.fetchForUser(userId);
    if (characters?.find((c) => c.name === name)) {
      throw new Error('Character exists');
    }
    return await this.characterService.create(userId, name);
  }

  @Mutation('collectReward')
  async collectReward(@Args('characterId') id: string) {
    const character = await this.getCharacter(id);
    return await this.eventPlannerService.giveReward(
      character,
      new Date().valueOf()
    );
  }

  /**
   * @deprecated('');
   */
  @Mutation('completeQuest')
  async completeQuest(@Args('characterId') id: string) {
    const character = await this.getCharacter(id);
    return this.eventPlannerService.completeQuest(character);
  }
  
  @Mutation('buySeeds')
  async buySeeds(@Args('characterId') id: string, @Args('numSeeds') numSeeds: number) {
    const character = await this.getCharacter(id);
    return this.farmerService.buySeeds(character, numSeeds);
  }

  @Mutation('plantSeed')
  async plantSeed(@Args('characterId') id: string) {
    const character = await this.getCharacter(id);
    return this.plotService.plant(character);
  }

  @Mutation('harvestCrop')
  async harvestCrop(@Args('characterId') id: string) {
    const character = await this.getCharacter(id);
    return this.plotService.harvest(character);
  }

  @Mutation('performAction')
  async performAction(@Args('characterId') id: string, @Args('action') action: string) {
    const character = await this.getCharacter(id);
    switch (action) {
      case 'completeQuest':
        return this.eventPlannerService.completeQuest(character);
      case 'collectReward':
        return await this.eventPlannerService.giveReward(
          character,
          new Date().valueOf()
        );
      case 'sell':
        return await this.marketService.sell(character);
      default:
        return {
          character,
          message: `Invalid Action ${action}`,
        };
    }
  }
}
