import { render } from '@testing-library/react';
import { Character, Quest } from '@apple-nest-3/apple-nest-interfaces';
import { BrowserRouter } from 'react-router-dom';
import { Farm } from './Farm';

describe('Town', () => {
  it('Does not have plot link before quest', async () => {
    const character: Character = {
      name: 'asd',
      userId: '123'
    };
    const { getByText } = render(<BrowserRouter><Farm character={character}></Farm></BrowserRouter>);
    expect(() => getByText('Plot')).toThrow();
  });

  it('Has plot link after quest', async () => {
    const character: Character = {
      name: 'asd',
      userId: '123',
      questNumber: Quest.GrowApple
    };
    const { getByText } = render(<BrowserRouter><Farm character={character}></Farm></BrowserRouter>);
    const elemnt = getByText('Plot');
    expect(elemnt).toBeTruthy();
  });
});
