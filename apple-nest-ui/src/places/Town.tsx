import { Component } from 'react';
import { Quest } from 'apple-nest-interfaces';
import { Place } from '../interfaces/place';
import { PlaceProps } from '../interfaces/place-props';

export class Town extends Component<PlaceProps, {}> {

    constructor(props: PlaceProps) {
        super(props);
        this.state = {
        };
    }

    render() {

        const places = [
        ];

        if (this.props.character.questNumber) {
            if (this.props.character.questNumber >= Quest.BuySeed) {
                places.push(<button key={Place.Farm} onClick={() => this.props.onChangePlace(Place.Farm)}>Farm</button>);
            }   
        }

        return <>
        <h2>Town</h2>
        <button onClick={() => this.props.onChangePlace(Place.EventPlanner)}>Event Planner</button>
        {places}
        </>
    }
}
