import { HttpException, HttpStatus } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EventPlannerService } from '../npcs/event-planner.service';
import { FarmerService } from '../farmer/farmer.service';
import { PlotService } from '../plot/plot.service';
import { CharacterService } from './character.service';
import { MarketService } from '../market/market.service';
import { WellService } from '../npcs/well.service';
import { BlacksmithService } from '../npcs/blacksmith.service';

@Resolver('Character')
export class CharacterResolver {
  constructor(
    private characterService: CharacterService,
    private eventPlannerService: EventPlannerService,
    private wellService: WellService,
    private farmerService: FarmerService,
    private marketService: MarketService,
    private plotService: PlotService,
    private blacksmithService: BlacksmithService
  ) {}

  @Query('character')
  async getCharacter(@Args('id') id: string) {
    const character = this.characterService.fetchById(id);
    if (character) {
      return character;
    } else {
      throw new HttpException(
        `Invalid character id ${id}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Query('characters')
  async characters(@Args('userId') userId: string) {
    return this.characterService.fetchForUser(userId);
  }

  @Mutation('createCharacter')
  async createCharacter(
    @Args('userId') userId: string,
    @Args('name') name: string,
    @Args('icon') icon: string
  ) {
    const characters = await this.characterService.fetchForUser(userId);
    if (characters?.find((c) => c.name === name)) {
      throw new Error('Character exists');
    }
    return await this.characterService.create(userId, name, icon);
  }

  @Mutation('performAction')
  async performAction(
    @Args('characterId') id: string,
    @Args('action') action: string,
    @Args('param') param: string
  ) {
    const character = await this.getCharacter(id);
    switch (action) {
      case 'completeQuest':
        return this.eventPlannerService.completeQuest(character);
      case 'collectReward':
        return await this.wellService.giveReward(
          character,
          new Date().valueOf()
        );
      case 'sell':
        return await this.marketService.sell(character);
      case 'collectWater':
        return await this.wellService.collectWater(character);
      case 'buyBucket':
        return await this.marketService.buyBucket(character);

      case 'plantSeed':
        return this.plotService.plant(character);

      case 'harvestCrop':
        return this.plotService.harvest(character);

      case 'waterCrop':
        return this.plotService.water(character);

      case 'buySeeds':
        return this.farmerService.buySeeds(character, Number(param));

      case 'buyWeapon':
        return this.blacksmithService.buyWeapon(character);

      case 'buyShield':
        return this.blacksmithService.buyShield(character);

      default:
        return {
          character,
          message: `Invalid Action ${action}`,
        };
    }
  }
}
