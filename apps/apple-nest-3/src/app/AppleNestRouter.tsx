import { Switch, Route, Router, useParams } from 'react-router-dom';
import { SelectCharacter } from './pages/SelectCharacter';
import { createBrowserHistory } from 'history';
import { CreateCharacter } from './pages/CreateCharacter';
import { Home } from './pages/Home';
import { Game } from './pages/Game';
import { History } from 'history';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function GameWrapper(params: { history: History }) {
  // must be a better way to do this
  // game is a class so cannot call useParams
  const { characterId } = useParams<{ characterId: string }>();
  return <Game characterId={characterId} history={params.history} />;
}

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
          <SelectCharacter userId="userId" history={history} />
        </Route>
        <Route path="/create-character">
          <CreateCharacter userId="userId" history={history} />
        </Route>
        <Route path="/game/:characterId">
          <GameWrapper history={history} />
        </Route>
        <Route path="/">
          <Home onCreate={() => createUser()} userId={userId}></Home>
        </Route>
      </Switch>
    </Router>
  );
}
