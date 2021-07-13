import { Component } from 'react';
import { EventPlannerWebservice } from '../api/EventPlannerWebService';
import { ErrorMessage } from '../components/ErrorMessage';
import { Saving } from '../components/Saving';
import { Place } from '../interfaces/place';
import { PlaceProps } from '../interfaces/place-props';
import { Quest } from '@apple-nest-3/apple-nest-interfaces';

interface EventPlannerState {
  saving?: boolean;
  error?: any;
  message?: string;
  doingQuest?: boolean;
}

const questText: string[] = [];
questText[Quest.GetMoney] =
  'Your first quest is to get some money. Perhaps from a reward?';
questText[Quest.BuySeed] =
  'Your next quest is to get a seed from the famer. Go back to town to get to the farm.';
questText[Quest.GrowApple] =
  'Now you need to grow an apple. Go back to the farm and use the plot.';

export class EventPlanner extends Component<PlaceProps, EventPlannerState> {
  constructor(props: PlaceProps) {
    super(props);
    this.state = {
      saving: false,
      error: null,
      message: 'Do you want a quest?',
    };
  }

  doQuest() {
    const quest = this.props.character.questNumber || Quest.GetMoney;
    this.setState({
      doingQuest: questText[quest] != null,
      message: questText[quest] || 'There are no more quests at this time',
    });
  }

  async completeQuest() {
    try {
      this.setState({ saving: true, error: null });
      const webService = new EventPlannerWebservice();
      const { character: updatedCharacter, message } =
        await webService.completeQuest(this.props.character);
      this.props.onUpdateCharacter(updatedCharacter);
      this.setState({ message, saving: false, doingQuest: false });
    } catch (err) {
      this.setState({ error: err, saving: false });
    }
  }

  acceptQuest() {
    this.setState({
      doingQuest: false,
      message: 'Come back when the quest is completed',
    });
  }

  async collectReward() {
    try {
      this.setState({ saving: true, error: null });
      const webService = new EventPlannerWebservice();
      const { character: updatedCharacter, message } =
        await webService.giveReward(this.props.character);
      this.props.onUpdateCharacter(updatedCharacter);
      this.setState({ message, saving: false });
    } catch (err) {
      this.setState({ error: err, saving: false });
    }
  }

  render() {
    return (
      <>
        <h2>Event Planner</h2>
        <div>Hello I am the event planner.</div>
        <div>{this.state.message}</div>
        <Saving saving={this.state.saving}>
          <div>
            <ErrorMessage error={this.state.error}></ErrorMessage>
          </div>
          {(() => {
            if (this.state.doingQuest) {
              return (
                <div>
                  <button onClick={() => this.acceptQuest()}>
                    Accept Quest
                  </button>
                  <button onClick={() => this.completeQuest()}>
                    Complete Quest
                  </button>
                </div>
              );
            } else {
              return (
                <div>
                  <button onClick={() => this.doQuest()}>Do Quest</button>
                  <button onClick={() => this.collectReward()}>
                    Collect Reward
                  </button>
                </div>
              );
            }
          })()}
          <div>
            <button onClick={() => this.props.onChangePlace(Place.Town)}>
              Back To Town
            </button>
          </div>
        </Saving>
      </>
    );
  }
}
