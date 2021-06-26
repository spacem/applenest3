import { ChangeEvent, KeyboardEvent, Component } from 'react';
import { Link } from 'react-router-dom';
import { History } from 'history';
import { Character } from 'apple-nest-interfaces';
import { CharacterWebservice } from '../api/CharacterWebService';
import { Saving } from '../components/Saving';
import { ErrorMessage } from '../components/ErrorMessage';

interface CreateCharacterState {
    name: string;
    saving: boolean;
    error: any;
}

interface CreateCharacterProps {
    history: History;
}

export class CreateCharacter extends Component<CreateCharacterProps, CreateCharacterState> {

    constructor(props: CreateCharacterProps) {
        super(props);
        this.state = {
            name: '',
            saving: false,
            error: null
        };
    }

    async createCharacter() {
        const character: Partial<Character> = {
            name: this.state.name
        };

        const webService = new CharacterWebservice();
        try {
            this.setState({
                name: this.state.name,
                saving: true,
                error: null,
            });
            await webService.createCharacter(character);
            this.props.history.push('/select-character');
        } catch(err) {
            this.setState({
                name: this.state.name,
                saving: false,
                error: err,
            });
        }
    }

    handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            name: event.target.value
        });
    }

    handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            this.createCharacter();
        }
    }

    render() {
        return <Saving saving={this.state.saving}>
            <h2>Create Character</h2>
            <div>
                <input onKeyPress={event => this.handleKeyPress(event)} placeholder="Character Name" onChange={event => this.handleInputChange(event)} />
            </div>
            <div>
                <button onClick={() => this.createCharacter()}>Create Character</button>
                <Link to="/select-character">Cancel</Link>
            </div>
            <div>
                <ErrorMessage error={this.state.error}></ErrorMessage>
            </div>
        </Saving>
    }
}
