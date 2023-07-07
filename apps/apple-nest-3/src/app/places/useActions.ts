import { useState } from 'react';
import { Character, Quest } from '@apple-nest-3/apple-nest-interfaces';
import { gql, useMutation } from '@apollo/client';
import { questText } from './EventPlanner';

export const PERFORM_ACTION = gql`
  mutation PerformAction($characterId: ID!, $action: String!) {
    performAction(characterId: $characterId, action: $action) {
      message,
      character {
        _id,
        questNumber,
        bag {
          money,
          apples,
          seeds
        }
      }
    }
  }
`;

export function useActions(character: Character) {
  const [message, setMessage] = useState<string>();

  const [performAction, { loading, error }] =
    useMutation<{ performAction: { message: string; character: Character } }>(
      PERFORM_ACTION
    );

  const callAction = async (action: string) => {
    const { data } = await performAction({ variables: { characterId: character._id, action }})
    setMessage(data?.performAction.message);
  }

  function doQuest() {
    const quest = character.questNumber || Quest.GetMoney;
    setMessage(questText[quest] || 'There are no more quests at this time');
  }

  const doAction = async (call: string) => {
    switch (call) {
      case 'acceptQuest':
        return doQuest();
      default:
        return callAction(call);
    }
  };

  return {
    doAction,
    loading,
    error,
    message
  };
}