import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoreService } from './store/store.service';
import { CharacterController } from './character/character.controller';
import { CharacterService } from './character/character.service';
import { EventPlannerController } from './event-planner/event-planner.controller';
import { EventPlannerService } from './event-planner/event-planner.service';

@Module({
  imports: [],
  controllers: [AppController, CharacterController, EventPlannerController],
  providers: [AppService, StoreService, CharacterService, EventPlannerService],
})
export class AppModule {}
