import { Component } from 'react';
import { Quest } from '@apple-nest-3/apple-nest-interfaces';
import { Place } from '../interfaces/place';
import { PlaceProps } from '../interfaces/place-props';
import { Link } from 'react-router-dom';
import './places.scss';

export class Town extends Component<PlaceProps, never> {
  render() {
    const places = [];

    if (this.props.character.questNumber) {
      if (this.props.character.questNumber >= Quest.BuySeed) {
        places.push(
          <Link key={Place.Farm} to="farm">Visit The Farm</Link>
        );
      }
    }

    if (this.props.character.questNumber) {
      if (this.props.character.questNumber >= Quest.GrowApple) {
        places.push(
          <Link key={Place.City} to="city">Go To The City</Link>
        );
      }
    }

    return (
      <>
        <h2>Town</h2>
        <img alt="town-icon" src="assets/town.jpg" height="100%"></img>
        <Link to="event-planner">Talk To The Quest NPC</Link>
        <Link to="well">Walk To The Wishing Well</Link>
        {places}
      </>
    );
  }
}