import { Component } from 'react';
import { EventPlannerWebservice } from '../api/EventPlannerWebService';
import { ErrorMessage } from '../components/ErrorMessage';
import { Saving } from '../components/Saving';
import { Place } from '../interfaces/place';
import { PlaceProps } from '../interfaces/place-props';

interface EventPlannerState {
  saving: boolean;
  error: any
}

export class EventPlanner extends Component<PlaceProps, EventPlannerState> {

    constructor(props: PlaceProps) {
        super(props);
        this.state = {
          saving: false,
          error: null
        };
    }

    doQuest() {
    }

    async collectReward() {
      try {
        this.setState({ saving: true, error: null });
        const webService = new EventPlannerWebservice();
        const updatedCharacter = await webService.giveReward(this.props.character);
        this.props.onUpdateCharacter(updatedCharacter);
        this.setState({ saving: false, error: null });
      } catch (err) {
        this.setState({ saving: false, error: err });
      }
    }

    render() {
        return <>
        <h2>Event Planner</h2>
        <div>
          Hello I am the event planner.
        </div>
        <Saving saving={this.state.saving}>
          <div>
            <ErrorMessage error={this.state.error}></ErrorMessage>
          </div>
          <div>
            <button onClick={() => this.doQuest()}>Do Quest</button>
            <button onClick={() => this.collectReward()}>Collect Reward</button>
          </div>
          <div>
            <button onClick={() => this.props.onChangePlace(Place.Town)}>Back To Town</button>
          </div>
        </Saving>
        </>
    }
}
