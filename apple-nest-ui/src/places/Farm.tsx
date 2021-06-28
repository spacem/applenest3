import { Component } from 'react';
import { Place } from '../interfaces/place';
import { PlaceProps } from '../interfaces/place-props';

export class Farm extends Component<PlaceProps, {}> {

    constructor(props: PlaceProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return <>
        <h2>Farm</h2>
        <button onClick={() => this.props.onChangePlace(Place.Farmer)}>Farmer</button>
        <button onClick={() => this.props.onChangePlace(Place.Town)}>Town</button>
        </>
    }
}
