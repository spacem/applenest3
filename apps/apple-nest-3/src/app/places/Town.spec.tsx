import { render } from '@testing-library/react';
import { Town } from './Town';
import { Character, Quest } from '@spacems/apple-nest-3-character';
import { BrowserRouter } from 'react-router-dom';

describe('Town', () => {
  it('Does not have farm link before quest', async () => {
    const character: Character = {
      name: 'asd',
      userId: '123'
    };
    const { getByText } = render(<BrowserRouter><Town character={character}></Town></BrowserRouter>);
    expect(() => getByText('Farm')).toThrow();
  });

  it('Has farm link after quest', async () => {
    const character: Character = {
      name: 'asd',
      userId: '123',
      questNumber: Quest.BuySeed
    };
    const { getByText } = render(<BrowserRouter><Town character={character}></Town></BrowserRouter>);
    const elemnt = getByText('Farm');
    expect(elemnt).toBeTruthy();
  });
});
