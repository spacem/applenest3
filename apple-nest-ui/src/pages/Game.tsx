import { Component } from 'react';
import { Link } from 'react-router-dom';
import { History } from 'history';
import { Town } from '../places/Town';
import { Character } from 'apple-nest-interfaces';
import { CharacterWebservice } from '../api/CharacterWebService';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { Place } from '../interfaces/place';
import { EventPlanner } from '../places/EventPlanner';
import { Farmer } from '../places/Farmer';
import { Farm } from '../places/Farm';
import { BagContents } from '../components/BagContents';
import { Plot } from '../places/Plot';

interface GameState {
    place: Place;
    character: Character | null;
    loading: boolean;
    error: any;
}

interface GameProps {
    history: History;
    characterId: string;
}

export class Game extends Component<GameProps, GameState> {

    constructor(props: GameProps) {
        super(props);
        this.state = {
            place: Place.Town,
            character: null,
            loading: true,
            error: null
        };
    }
    
    async componentDidMount() {
        await this.load();
    }

    private async load() {
        try {
            this.setState({
                character: null,
                loading: true,
                error: null,
                place: this.state.place
            });

            const characterWebService = new CharacterWebservice();
            const character = await characterWebService.getCharacter(this.props.characterId);
            this.updateCharacter(character);
        } catch (err) {
            this.setState({
                character: null,
                loading: false,
                error: err,
                place: this.state.place
            });
        }
    }

    updateCharacter(character: Character) {
        this.setState({
            character,
            loading: false,
            error: null,
            place: this.state.place
        });
    }

    getPlace() {
        if(this.state.character) {
            switch(this.state.place) {
                case Place.EventPlanner:
                    return <EventPlanner
                        character={this.state.character}
                        onUpdateCharacter={c => this.updateCharacter(c)}
                        onChangePlace={place => this.handleChangePlace(place)}>
                    </EventPlanner>
                case Place.Farmer:
                    return <Farmer
                        character={this.state.character}
                        onUpdateCharacter={c => this.updateCharacter(c)}
                        onChangePlace={place => this.handleChangePlace(place)}>
                    </Farmer>
                case Place.Plot:
                    return <Plot
                        character={this.state.character}
                        onUpdateCharacter={c => this.updateCharacter(c)}
                        onChangePlace={place => this.handleChangePlace(place)}>
                    </Plot>
                case Place.Farm:
                    return <Farm
                        character={this.state.character}
                        onUpdateCharacter={c => this.updateCharacter(c)}
                        onChangePlace={place => this.handleChangePlace(place)}>
                    </Farm>
                default:
                    return <Town
                        character={this.state.character}
                        onUpdateCharacter={c => this.updateCharacter(c)}
                        onChangePlace={place => this.handleChangePlace(place)}>
                    </Town>
            }
        } else {
            return null;
        }
    }

    handleChangePlace(newPlace: Place) {
        const newState = { ...this.state };
        newState.place = newPlace;
        this.setState(newState);
    }

    render() {
        return <Loading loading={this.state.loading}>
            <div>
                Character: {this.state.character?.name}
            </div>
            <div>
                <Link to="/select-character">Switch Character</Link>
            </div>
            <div>
                <ErrorMessage error={this.state.error}></ErrorMessage>
            </div>
            <div>
                <BagContents bag={this.state.character?.bag} />
            </div>
            <div>
                {this.getPlace()}
            </div>
        </Loading>
    }
}
