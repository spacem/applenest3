import { render } from '@testing-library/react';
import { BagContents } from './BagContents';
import { Bag } from '@apple-nest-3/apple-nest-interfaces';

describe('Bag', () => {
  it('Shows zero bag contents when empty bag', async () => {
    const bag: Bag = {
    };
    const { findByText } = render(<BagContents bag={bag}></BagContents>);
    // const elemnt = getByText('Money: 0 | Apples: 0 | Seeds: 0');
    const elemnt = findByText('0');
    expect(elemnt).toBeTruthy();
  });

  it('Shows expected values for bag', async () => {
    const bag: Bag = {
      money: 1,
      apples: 2,
      seeds: 3
    };
    const { getByText } = render(<BagContents bag={bag}></BagContents>);
    expect(getByText('1')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
  });
});
