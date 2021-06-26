import { ChangeEvent, KeyboardEvent, Component } from 'react';
import { Link } from 'react-router-dom';
import { History } from 'history';
import { Character } from 'apple-nest-interfaces';
import { CharacterWebservice } from '../api/CharacterWebService';
import { Saving } from '../components/Saving';
import { ErrorMessage } from '../components/ErrorMessage';

interface TownState {
}

interface TownProps {
    history: History;
}

export class Town extends Component<TownProps, TownState> {

    constructor(props: TownProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return <>
        <Link to="/select-character">Switch Character</Link>
        </>
    }
}
