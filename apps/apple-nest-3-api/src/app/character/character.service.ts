import { Injectable } from '@nestjs/common';
import { Character } from '@apple-nest-3/apple-nest-interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { CHARACTER_COLLECTION } from '../store/character.schema';
import { Document, Model } from 'mongoose';
import { QuestService } from './quest.service';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(CHARACTER_COLLECTION) private characterModel: Model<Character | Document>,
    private questService: QuestService
    ) {
  }

  async fetchForUser(userId: string): Promise<Character[]> {
    const results = await this.characterModel.find({userId}).lean();
    return results as Character[];
  }

  async fetchById(id: string) {
    const result = await this.characterModel.findById(id).lean();
    return result as Character;
  }

  async create(userId: string, characterName: string, icon: string): Promise<Character> {
    const character: Character = {
      userId,
      name: characterName,
      icon,
    };
    const model = new this.characterModel(character);
    const result = await model.save();
    return result as unknown as Character;
  }

  async update(character: Character) {
    character.questNumber = this.questService.getNextQuestNumber(character);
    await this.characterModel.findOneAndUpdate({ _id: character._id}, character);
  }
}
