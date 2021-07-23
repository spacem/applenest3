import { Switch, Route, Router, useParams, Redirect } from 'react-router-dom';
import { SelectCharacter } from './pages/SelectCharacter';
import { createBrowserHistory } from 'history';
import { CreateCharacter } from './pages/CreateCharacter';
import { Home } from './pages/Home';
import { Game } from './pages/Game';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const USER_ID_KEY = 'APPLE_NEST_USERID';
const storedUserId = localStorage.getItem(USER_ID_KEY);

export function AppleNestRouter() {
  const [userId, setUserId] = useState(storedUserId);

  function createUser() {
    const userId = uuidv4()
    localStorage.setItem(USER_ID_KEY, userId);
    setUserId(userId);
  }

  const history = createBrowserHistory();
  return (
    <Router history={history}>
      <Switch>
        <Route path="/select-character">
          {userId != null ? <SelectCharacter userId={userId} history={history} /> : <Redirect to="/" /> }
        </Route>
        <Route path="/create-character">
          {userId != null ? <CreateCharacter userId={userId} history={history} /> : <Redirect to="/" /> }
        </Route>
        <Route path="/game/:characterId" component={Game}>
        </Route>
        <Route path="/">
          <Home onCreate={() => createUser()} userId={userId}></Home>
        </Route>
      </Switch>
    </Router>
  );
}
