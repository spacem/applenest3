import { Character } from 'apple-nest-interfaces';
import { Place } from './place';

export interface PlaceProps {
  onChangePlace: (place: Place) => void;
  onUpdateCharacter: (character: Character) => void;
  character: Character;
}