import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Character } from '@apple-nest-3/apple-nest-interfaces';
import { CharacterWebservice } from '../api/CharacterWebService';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { History } from 'history';
import './SelectCharacter.scss';

interface SelectCharacterProps {
  history: History;
}

interface SelectCharacterState {
  characters: Character[];
  loading: boolean;
  error?: Error;
}

export class SelectCharacter extends Component<
  SelectCharacterProps,
  SelectCharacterState
> {
  constructor(props: SelectCharacterProps) {
    super(props);
    this.state = {
      characters: [],
      loading: true,
    };
  }

  async componentDidMount() {
    await this.load();
  }

  private async load() {
    try {
      this.setState({
        characters: [],
        loading: true,
      });

      const characterWebService = new CharacterWebservice();
      const characters = await characterWebService.getCharacters();
      this.setState({
        characters,
        loading: false,
      });
    } catch (err) {
      this.setState({
        characters: [],
        loading: false,
        error: err,
      });
    }
  }

  selectCharacter(c: Character) {
    this.props.history.push(`/game/${c.uuid}`);
  }

  render() {
    const characters = this.state.characters.map((c) => {
      return (
        <button key={c.uuid} onClick={() => this.selectCharacter(c)}>
          {c.name}
        </button>
      );
    });

    return (
      <Loading loading={this.state.loading}>
        <ErrorMessage error={this.state.error} />
        <h2>Select Character</h2>
        <div className="character-list">{characters}</div>
        <div className="actions">
          <Link to="/create-character">Create Character</Link>
          <Link to="/">Sign Out</Link>
        </div>
      </Loading>
    );
  }
}
