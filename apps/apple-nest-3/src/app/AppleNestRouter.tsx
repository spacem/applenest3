import { Switch, Route, Router, useParams } from 'react-router-dom';
import { SelectCharacter } from './pages/SelectCharacter';
import { createBrowserHistory } from 'history';
import { CreateCharacter } from './pages/CreateCharacter';
import { Home } from './pages/Home';
import { Game } from './pages/Game';

function GameWrapper(params: any) {
  // must be a better way to do this
  const { characterId } = useParams<{ characterId: string }>();
  return <Game characterId={characterId} history={params.history} />;
}

export function AppleNestRouter() {
  const history = createBrowserHistory();
  return (
    <Router history={history}>
      <Switch>
        <Route path="/select-character">
          <SelectCharacter history={history} />
        </Route>
        <Route path="/create-character">
          <CreateCharacter history={history} />
        </Route>
        <Route path="/game/:characterId">
          <GameWrapper history={history} />
        </Route>
        <Route path="/">
          <Home></Home>
        </Route>
      </Switch>
    </Router>
  );
}
