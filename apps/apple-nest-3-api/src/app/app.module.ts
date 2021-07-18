import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoreService } from './store/store.service';
import { CharacterController } from './character/character.controller';
import { CharacterService } from './character/character.service';
import { EventPlannerController } from './event-planner/event-planner.controller';
import { EventPlannerService } from './event-planner/event-planner.service';
import { FarmerController } from './farmer/farmer.controller';
import { PlotController } from './plot/plot.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { CharacterResolver } from './character/character.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql']
    })
  ],
  controllers: [
    AppController,
    CharacterController,
    EventPlannerController,
    FarmerController,
    PlotController
  ],
  providers: [AppService, StoreService, CharacterService, EventPlannerService, CharacterResolver],
})
export class AppModule {}
