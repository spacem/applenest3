import { useState } from 'react';
import { ErrorMessage } from '../components/ErrorMessage';
import { Saving } from '../components/Saving';
import { Place } from '../interfaces/place';
import { PlaceProps } from '../interfaces/place-props';
import { Character, Quest } from '@apple-nest-3/apple-nest-interfaces';
import { gql, useMutation } from '@apollo/client';

interface EventPlannerState {
  message?: string;
  doingQuest?: boolean;
}

const COMPLETE_QUEST = gql`
  mutation Character($characterId: ID!) {
    completeQuest(characterId: $characterId) {
      message,
      character {
        _id,
        name,
        questNumber
      }
    }
  }
`;

const COLLECT_REWARD = gql`
  mutation Character($characterId: ID!) {
    collectReward(characterId: $characterId) {
      message,
      character {
        _id,
        name,
        bag {
          money,
          apples,
          seeds
        }
      }
    }
  }
`;

const questText: string[] = [];
questText[Quest.GetMoney] =
  'Your first quest is to get some money. Perhaps from a reward?';
questText[Quest.BuySeed] =
  'Your next quest is to get a seed from the famer. Go back to town to get to the farm.';
questText[Quest.GrowApple] =
  'Now you need to grow an apple. Go back to the farm and use the plot.';

export function EventPlanner(props: PlaceProps) {
  const initialState: EventPlannerState = {
    doingQuest: false,
    message: 'Do you want a quest?'
  };
  const [state, setState] = useState(initialState);

  const [completeQuest, { loading: loadingQuest, error: questError }] = useMutation<{ completeQuest: { message: string, character: Character }}>(COMPLETE_QUEST);
  const [collectReward, { loading: loadingReward, error: rewardError }] = useMutation<{ collectReward: { message: string, character: Character }}>(COLLECT_REWARD);

  function doQuest() {
    const quest = props.character.questNumber || Quest.GetMoney;
    setState({
      doingQuest: questText[quest] != null,
      message: questText[quest] || 'There are no more quests at this time',
    });
  }

  function acceptQuest() {
    setState({
      doingQuest: false,
      message: 'Come back when the quest is completed',
    });
  }

  return (
    <>
      <h2>Event Planner</h2>
      <div>Hello I am the event planner.</div>
      <div>{state.message}</div>
      <Saving saving={loadingQuest || loadingReward}>
        <div>
          <ErrorMessage error={questError}></ErrorMessage>
          <ErrorMessage error={rewardError}></ErrorMessage>
        </div>
        {(() => {
          if (state.doingQuest) {
            return (
              <div>
                <button onClick={() => acceptQuest()}>
                  Accept Quest
                </button>
                <button onClick={async () => {
                  const result = await completeQuest({ variables: { characterId: props.character._id }})
                  setState({
                    doingQuest: false,
                    message: result.data?.completeQuest.message
                  });
                }}>
                  Complete Quest
                </button>
              </div>
            );
          } else {
            return (
              <div>
                <button onClick={() => doQuest()}>Do Quest</button>
                <button onClick={async () => {
                  const result = await collectReward({ variables: { characterId: props.character._id }})
                  setState({
                    doingQuest: false,
                    message: result.data?.collectReward.message
                  });
                }}>
                  Collect Reward
                </button>
              </div>
            );
          }
        })()}
        <div>
          <button onClick={() => props.onChangePlace(Place.Town)}>
            Back To Town
          </button>
        </div>
      </Saving>
    </>
  );
}
