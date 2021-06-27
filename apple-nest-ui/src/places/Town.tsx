import { Component } from 'react';
import { Place } from '../interfaces/place';
import { PlaceProps } from '../interfaces/place-props';

export class Town extends Component<PlaceProps, {}> {

    constructor(props: PlaceProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return <>
        <h2>Town</h2>
        <button onClick={() => this.props.onChangePlace(Place.EventPlanner)}>Event Planner</button>
        </>
    }
}
