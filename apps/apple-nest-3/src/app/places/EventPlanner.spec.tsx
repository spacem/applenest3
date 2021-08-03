import { render, fireEvent, act, getByText, waitFor } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { COLLECT_REWARD, EventPlanner, questText } from './EventPlanner';
import { MockedProvider } from '@apollo/client/testing';
import { createMemoryHistory } from 'history'
import { Character, Quest } from '@apple-nest-3/apple-nest-interfaces';

describe('EventPlanner', () => {
  it('Shows do quest and reward at start', async () => {
    const character: Character = {
      name: 'asd',
      userId: '123'
    };
    const { getByText } = render(<MockedProvider><BrowserRouter><EventPlanner character={character} /></BrowserRouter></MockedProvider>);
    expect(getByText('Collect Reward')).toBeTruthy();
    expect(getByText('Do Quest')).toBeTruthy();
  });

  it('Shows message after collecting reward', async () => {
    const mocks = [
      {
        request: {
          query: COLLECT_REWARD,
          variables: { characterId: '321' }
        },
        result: {
          data: {
            collectReward: {
              message: 'test reward collected',
              character: {
                _id: 'aa1',
                name: 'test1'
              }
            }
          },
        },
      },
    ];

    const character: Character = {
      _id: '321',
      name: 'asd',
      userId: '123'
    };
    const { getByText } = render(<MockedProvider mocks={mocks}><BrowserRouter><EventPlanner character={character} /></BrowserRouter></MockedProvider>);
    const button = getByText('Collect Reward');
    await waitFor(async () => {
      fireEvent.click(button);
      await new Promise(resolve => setTimeout(resolve, 0)); // wait for response
    });
    expect(getByText('test reward collected')).toBeTruthy();
  });

  it('Shows correct quest text when prompting', async () => {
    const character: Character = {
      _id: '321',
      name: 'asd',
      userId: '123',
      questNumber: Quest.BuySeed
    };

    const { getByText } = render(<MockedProvider><BrowserRouter><EventPlanner character={character} /></BrowserRouter></MockedProvider>);

    const button = getByText('Do Quest');
    await waitFor(async () => {
      fireEvent.click(button);
      await new Promise(resolve => setTimeout(resolve, 0)); // wait for response
    });

    expect(getByText(questText[Quest.BuySeed])).toBeTruthy();
  });
});