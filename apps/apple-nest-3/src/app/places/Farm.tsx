import { Component } from 'react';
import { Quest } from '@apple-nest-3/apple-nest-interfaces';
import { Place } from '../interfaces/place';
import { PlaceProps } from '../interfaces/place-props';

export class Farm extends Component<PlaceProps, never> {
  render() {
    const extraPlaces = [];

    if (this.props.character.questNumber) {
      if (this.props.character.questNumber >= Quest.GrowApple) {
        extraPlaces.push(
          <button
            key="plot"
            onClick={() => this.props.onChangePlace(Place.Plot)}
          >
            Plot
          </button>
        );
      }
    }

    return (
      <>
        <h2>Farm</h2>
        <button onClick={() => this.props.onChangePlace(Place.Farmer)}>
          Farmer
        </button>
        {extraPlaces}
        <button onClick={() => this.props.onChangePlace(Place.Town)}>
          Town
        </button>
      </>
    );
  }
}
