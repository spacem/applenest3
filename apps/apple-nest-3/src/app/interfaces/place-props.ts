import { Character } from '@apple-nest-3/apple-nest-interfaces';
import { Place } from './place';

export interface PlaceProps {
  onChangePlace: (place: Place) => void;
  onUpdateCharacter?: (character: Character) => void;
  character: Character;
}
