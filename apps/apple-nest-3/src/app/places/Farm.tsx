import { Component } from 'react';
import { Quest } from '@apple-nest-3/apple-nest-interfaces';
import { PlaceProps } from '../interfaces/place-props';
import { Link } from 'react-router-dom';

export class Farm extends Component<PlaceProps, never> {
  render() {
    const extraPlaces = [];

    if (this.props.character.questNumber) {
      if (this.props.character.questNumber >= Quest.GrowApple) {
        extraPlaces.push(
          <Link key="plot" to="plot">Plot</Link>
        );
      }
    }

    return (
      <>
        <h2>Farm</h2>
        <Link to="farmer">Farmer</Link>
        {extraPlaces}
        <Link to="town">Town</Link>
      </>
    );
  }
}
