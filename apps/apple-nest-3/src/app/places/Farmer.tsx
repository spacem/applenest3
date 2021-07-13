import { Component } from 'react';
import { ErrorMessage } from '../components/ErrorMessage';
import { Saving } from '../components/Saving';
import { Place } from '../interfaces/place';
import { PlaceProps } from '../interfaces/place-props';
import { FarmerWebservice } from '../api/FarmerWebService';

interface FarmerState {
  saving?: boolean;
  error?: Error;
  message?: string;
}

export class Farmer extends Component<PlaceProps, FarmerState> {
  constructor(props: PlaceProps) {
    super(props);
    this.state = {
      saving: false,
      message: 'You can buy seeds from me.',
    };
  }

  async buySeed(numSeeds: number) {
    try {
      this.setState({ saving: true });
      const webService = new FarmerWebservice();
      const { character: updatedCharacter, message } =
        await webService.buySeeds(this.props.character, numSeeds);
      this.props.onUpdateCharacter(updatedCharacter);
      this.setState({ message, saving: false });
    } catch (err) {
      this.setState({ error: err, saving: false });
    }
  }

  render() {
    return (
      <>
        <h2>Farmer</h2>
        <div>Hello. I am the farmer!</div>
        <div>{this.state.message}</div>
        <Saving saving={this.state.saving}>
          <div>
            <ErrorMessage error={this.state.error}></ErrorMessage>
          </div>
          <div>
            <button onClick={() => this.buySeed(1)}>Buy One Seed</button>
            <button onClick={() => this.buySeed(10)}>Buy 10x Seeds</button>
            <button onClick={() => this.buySeed(100)}>Buy 100x Seeds</button>
          </div>
          <div>
            <button onClick={() => this.props.onChangePlace(Place.Farm)}>
              Back To Farm
            </button>
          </div>
        </Saving>
      </>
    );
  }
}
