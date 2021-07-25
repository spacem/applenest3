import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { Home } from './Home';
import { createMemoryHistory } from 'history'

describe('Home and logged in', () => {
  it('Renders when user', () => {
    const { baseElement } = render(<BrowserRouter><Home onCreate={() => null} userId={'1234'} /></BrowserRouter>);
    expect(baseElement).toBeTruthy();
  });

  it('Renders correct buttons when user', () => {
    const { getByText } = render(<BrowserRouter><Home onCreate={() => null} userId={'1234'} /></BrowserRouter>);
    expect(getByText('Sign In')).toBeTruthy();
    expect(getByText('Switch User')).toBeTruthy();
  });

  it('Navigates to select character when signing in', () => {
    const history = createMemoryHistory()
    const pushSpy = jest.spyOn(history, 'push');

    const { getByText } = render(<Router history={history}><Home onCreate={() => null} userId={'1234'} /></Router>);
    fireEvent.click(getByText('Sign In'));
    
    expect(pushSpy).toBeCalledWith('/select-character');
  });

  it('Navigates to returning player when switch user', () => {
    const history = createMemoryHistory()
    const pushSpy = jest.spyOn(history, 'push');

    const { getByText } = render(<Router history={history}><Home onCreate={() => null} userId={'1234'} /></Router>);
    fireEvent.click(getByText('Switch User'));
    
    expect(pushSpy).toBeCalledWith('/returning-player');
  });
});


describe('Home and not logged in', () => {
  it('Renders when no user', () => {
    const { baseElement } = render(<BrowserRouter><Home onCreate={() => null} userId={null} /></BrowserRouter>);
    expect(baseElement).toBeTruthy();
  });

  it('Renders correct buttons when no user', () => {
    const { getByText } = render(<BrowserRouter><Home onCreate={() => null} userId={null} /></BrowserRouter>);
    expect(getByText('New Player')).toBeTruthy();
    expect(getByText('Returning Player')).toBeTruthy();
  });

  it('Navigates to returning player when returning player', () => {
    const history = createMemoryHistory()
    const pushSpy = jest.spyOn(history, 'push');

    const { getByText } = render(<Router history={history}><Home onCreate={() => null} userId={null} /></Router>);
    fireEvent.click(getByText('Returning Player'));
    
    expect(pushSpy).toBeCalledWith('/returning-player');
  });
});
