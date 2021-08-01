import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ADD_CHARACTER, CreateCharacter } from './CreateCharacter';
import { MockedProvider } from '@apollo/client/testing';

describe('CreateCharacter', () => {
  it('Creates character with name and id', async () => {
    let addedCharacter = false;
    const mocks = [
      {
        request: {
          query: ADD_CHARACTER,
          variables: { name: 'new char name', userId: '123' }
        },
        result: () => {
          addedCharacter = true;
          return { data: {} };
        },
      },
    ];

    const { getByRole, getByPlaceholderText } = render(<MockedProvider mocks={mocks}><BrowserRouter><CreateCharacter userId={'123'} /></BrowserRouter></MockedProvider>);
    await waitFor(async () => {
      fireEvent.change(getByPlaceholderText('Character Name'), {target: {value: 'new char name'}});
      fireEvent.click(getByRole('button', { name: 'Create Character' }));
      await new Promise(resolve => setTimeout(resolve, 0)); // wait for response
    });

    expect(addedCharacter).toEqual(true);
  });
});