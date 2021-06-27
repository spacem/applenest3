import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoreService } from './store/store.service';
import { CharacterController } from './character/character.controller';
import { CharacterService } from './character/character.service';
import { EventPlannerController } from './event-planner/event-planner.controller';

@Module({
  imports: [],
  controllers: [AppController, CharacterController, EventPlannerController],
  providers: [AppService, StoreService, CharacterService],
})
export class AppModule {}
