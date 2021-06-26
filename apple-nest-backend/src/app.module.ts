import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoreService } from './store/store.service';
import { CharacterController } from './character/character.controller';

@Module({
  imports: [],
  controllers: [AppController, CharacterController],
  providers: [AppService, StoreService],
})
export class AppModule {}
