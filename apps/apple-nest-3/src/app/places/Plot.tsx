import { Component } from 'react';
import { PlotWebservice } from '../api/PlotWebService';
import { ErrorMessage } from '../components/ErrorMessage';
import { Saving } from '../components/Saving';
import { Place } from '../interfaces/place';
import { PlaceProps } from '../interfaces/place-props';

interface PlotState {
  saving?: boolean;
  error?: any;
  message?: string;
}

export class Plot extends Component<PlaceProps, PlotState> {
  constructor(props: PlaceProps) {
    super(props);

    if (
      this.props.character.seedReadyDate == null &&
      !this.props.character.bag?.seeds
    ) {
      this.state = {
        saving: false,
        error: null,
        message: 'If you had seeds you could plant them here.',
      };
    } else {
      this.state = {
        saving: false,
        error: null,
        message: '',
      };
    }
  }

  async plantSeed() {
    try {
      this.setState({ saving: true, error: null });
      const webService = new PlotWebservice();
      const { character: updatedCharacter, message } =
        await webService.plantSeed(this.props.character);
      this.props.onUpdateCharacter(updatedCharacter);
      this.setState({ message, saving: false });
    } catch (err) {
      this.setState({ error: err, saving: false });
    }
  }

  async harvestCrop() {
    try {
      this.setState({ saving: true, error: null });
      const webService = new PlotWebservice();
      const { character: updatedCharacter, message } =
        await webService.harvestCrop(this.props.character);
      this.props.onUpdateCharacter(updatedCharacter);
      this.setState({ message, saving: false });
    } catch (err) {
      this.setState({ error: err, saving: false });
    }
  }

  render() {
    let action;
    if (this.props.character.seedReadyDate != null) {
      action = <button onClick={() => this.harvestCrop()}>Harvest Crop</button>;
    } else if (this.props.character.bag?.seeds) {
      action = <button onClick={() => this.plantSeed()}>Plant Seed</button>;
    }

    return (
      <>
        <h2>Plot</h2>
        <div>{this.state.message}</div>
        <Saving saving={this.state.saving}>
          <div>
            <ErrorMessage error={this.state.error}></ErrorMessage>
          </div>
          <div>{action}</div>
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
