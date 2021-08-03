import { render } from '@testing-library/react';
import { Plot } from './Plot';
import { Character } from '@apple-nest-3/apple-nest-interfaces';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';

describe('Plot', () => {
  it('Does not have harvest link when no plants', async () => {
    const character: Character = {
      name: 'asd',
      userId: '123'
    };
    const { getByText } = render(<MockedProvider><BrowserRouter><Plot character={character}></Plot></BrowserRouter></MockedProvider>);
    expect(() => getByText('Harvest Crop')).toThrow();
  });

  it('Has harvest link when seeds are planted', async () => {
    const character: Character = {
      name: 'asd',
      userId: '123',
      seedReadyDate: 1
    };
    const { getByText } = render(<MockedProvider><BrowserRouter><Plot character={character}></Plot></BrowserRouter></MockedProvider>);
    const elemnt = getByText('Harvest Crop');
    expect(elemnt).toBeTruthy();
  });

  it('Does not have plant link when no seeds', async () => {
    const character: Character = {
      name: 'asd',
      userId: '123'
    };
    const { getByText } = render(<MockedProvider><BrowserRouter><Plot character={character}></Plot></BrowserRouter></MockedProvider>);
    expect(() => getByText('Plant Seed')).toThrow();
  });

  it('Does not have plant link when seeds are planted', async () => {
    const character: Character = {
      name: 'asd',
      userId: '123',
      seedReadyDate: 1,
      bag: {
        seeds: 1
      }
    };
    const { getByText } = render(<MockedProvider><BrowserRouter><Plot character={character}></Plot></BrowserRouter></MockedProvider>);
    expect(() => getByText('Plant Seed')).toThrow();
  });

  it('Has plant link when has seeds', async () => {
    const character: Character = {
      name: 'asd',
      userId: '123',
      bag: {
        seeds: 1
      }
    };
    const { getByText } = render(<MockedProvider><BrowserRouter><Plot character={character}></Plot></BrowserRouter></MockedProvider>);
    const elemnt = getByText('Plant Seed');
    expect(elemnt).toBeTruthy();
  });
});
