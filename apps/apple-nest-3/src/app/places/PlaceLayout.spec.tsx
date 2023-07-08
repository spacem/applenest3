import {
  render,
  fireEvent,
  act,
  getByText,
  waitFor,
} from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { Character, Quest } from '@apple-nest-3/apple-nest-interfaces';
import { PlaceLayout } from './PlaceLayout';
import { PlaceConfig } from './PlaceConfig';
import { PERFORM_ACTION } from './useActions';
import { questText } from './EventPlanner';

describe('PlaceLayout', () => {
  const testPlace: PlaceConfig = {
    image: '',
    initialText: '',
    title: '',
    actions: [
      {
        title: 'Collect Reward',
        action: 'test',
      },
      {
        title: 'Accept Quest',
        action: 'acceptQuest',
      },
    ],
  };

  it('Shows actions', async () => {
    const character: Character = {
      name: 'asd',
      userId: '123',
    };
    const { getByText } = render(
      <MockedProvider>
        <BrowserRouter>
          <PlaceLayout character={character} place={testPlace} />
        </BrowserRouter>
      </MockedProvider>
    );
    expect(getByText('Collect Reward')).toBeTruthy();
    expect(getByText('Accept Quest')).toBeTruthy();
  });

  it('Shows message after collecting reward', async () => {
    const mocks = [
      {
        request: {
          query: PERFORM_ACTION,
          variables: { characterId: '321', action: 'test' },
        },
        result: {
          data: {
            performAction: {
              message: 'test reward collected',
              character: {
                _id: 'aa1',
                name: 'test1',
              },
            },
          },
        },
      },
    ];

    const character: Character = {
      _id: '321',
      name: 'asd',
      userId: '123',
    };
    const { getByText } = render(
      <MockedProvider mocks={mocks}>
        <BrowserRouter>
          <PlaceLayout character={character} place={testPlace} />
        </BrowserRouter>
      </MockedProvider>
    );
    const button = getByText('Collect Reward');
    await waitFor(async () => {
      fireEvent.click(button);
      await new Promise((resolve) => setTimeout(resolve, 0)); // wait for response
    });
    expect(getByText('test reward collected')).toBeTruthy();
  });

  it('Shows correct quest text when prompting', async () => {
    const character: Character = {
      _id: '321',
      name: 'asd',
      userId: '123',
      questNumber: Quest.BuySeed,
    };

    const { getByText } = render(
      <MockedProvider>
        <BrowserRouter>
          <PlaceLayout character={character} place={testPlace} />
        </BrowserRouter>
      </MockedProvider>
    );

    const button = getByText('Accept Quest');
    await waitFor(async () => {
      fireEvent.click(button);
      await new Promise((resolve) => setTimeout(resolve, 0)); // wait for response
    });

    expect(getByText(questText[Quest.BuySeed])).toBeTruthy();
  });
});
