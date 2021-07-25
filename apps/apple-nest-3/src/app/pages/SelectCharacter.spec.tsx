import { render, fireEvent, act, getByText, waitFor } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { GET_CHARACTERS, SelectCharacter } from './SelectCharacter';
import { MockedProvider } from '@apollo/client/testing';
import { createMemoryHistory } from 'history'

describe('SelectCharacter', () => {
  it('Shows error when no user', async () => {
    const { getByText } = render(<MockedProvider><BrowserRouter><SelectCharacter userId={null} /></BrowserRouter></MockedProvider>);
    await waitFor(() => {
      expect(getByText('Not signed in')).toBeTruthy();
    });
  });

  it('renders when no characters', async () => {
    const mocks = [
      {
        request: {
          query: GET_CHARACTERS
        },
        result: {
          characters: {
            data: []
          },
        },
      },
    ];

    const { getByText } = render(<MockedProvider><BrowserRouter><SelectCharacter userId={'123'} /></BrowserRouter></MockedProvider>);
    await waitFor(() => {
      expect(getByText('Create Character')).toBeTruthy();
      expect(getByText('Sign Out')).toBeTruthy();
    });
  });

  it('renders character buttons', async () => {
    const mocks = [
      {
        request: {
          query: GET_CHARACTERS,
          variables: { userId: '123' }
        },
        result: {
          data: {
            characters: [{
              _id: 'aa1',
              name: 'test1',
            },
            {
              _id: 'aa2',
              name: 'test2',
            }]
          },
        },
      },
    ];

    const { getByText } = render(<MockedProvider mocks={mocks}><BrowserRouter><SelectCharacter userId={'123'} /></BrowserRouter></MockedProvider>);
    await waitFor(() => {
      expect(getByText('test1')).toBeTruthy();
      expect(getByText('test2')).toBeTruthy();
      expect(getByText('Create Character')).toBeTruthy();
      expect(getByText('Sign Out')).toBeTruthy();
    });
  });

  it('goes to game when clicking character button', async () => {
    const history = createMemoryHistory()
    const pushSpy = jest.spyOn(history, 'push');

    const mocks = [
      {
        request: {
          query: GET_CHARACTERS,
          variables: { userId: '123' }
        },
        result: {
          data: {
            characters: [{
              _id: 'aa1',
              name: 'test1',
            }]
          },
        },
      },
    ];

    const { getByText } = render(<MockedProvider mocks={mocks}><Router history={history}><SelectCharacter userId={'123'} /></Router></MockedProvider>);
    await waitFor(() => {
      fireEvent.click(getByText('test1'));
      expect(pushSpy).toBeCalledWith('/game/aa1');
    });
  });
});
