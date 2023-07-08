import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterController } from './character/character.controller';
import { CharacterService } from './character/character.service';
import { EventPlannerController } from './event-planner/event-planner.controller';
import { EventPlannerService } from './event-planner/event-planner.service';
import { FarmerController } from './farmer/farmer.controller';
import { PlotController } from './plot/plot.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { CharacterResolver } from './character/character.resolver';
import { FarmerService } from './farmer/farmer.service';
import { PlotService } from './plot/plot.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterSchema, CHARACTER_COLLECTION } from './store/character.schema';
import { CHARACTER_TYPES } from './graphql-schemas/character.graphql';
import { environment } from '../environments/environment';
import { MarketService } from './market/market.service';
import { QuestService } from './character/quest.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typeDefs: CHARACTER_TYPES,
      path: environment.graphUri
    }),
    MongooseModule.forRoot(process.env.APPLE_NEST_MONGO_URL),
    MongooseModule.forFeature([{ name: CHARACTER_COLLECTION, schema: CharacterSchema }]),
  ],
  controllers: [
    AppController,
    CharacterController,
    EventPlannerController,
    FarmerController,
    PlotController
  ],
  providers: [
    AppService,
    CharacterService,
    EventPlannerService,
    FarmerService,
    PlotService,
    CharacterResolver,
    MarketService,
    QuestService,
  ],
})
export class AppModule {}
