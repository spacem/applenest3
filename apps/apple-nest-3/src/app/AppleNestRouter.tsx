import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { SelectCharacter } from './pages/SelectCharacter';
import { CreateCharacter } from './pages/CreateCharacter';
import { Home } from './pages/Home';
import { Game } from './pages/Game';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DeletePlayer } from './pages/DeletePlayer';

const USER_ID_KEY = 'APPLE_NEST_USERID';
const storedUserId = localStorage.getItem(USER_ID_KEY);

export function AppleNestRouter() {
  const [userId, setUserId] = useState(storedUserId);

  function setUser(userId: string | null) {
    if (userId) {
      localStorage.setItem(USER_ID_KEY, userId);
    } else {
      localStorage.removeItem(USER_ID_KEY);
    }
    setUserId(userId);
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/select-character">
          <SelectCharacter userId={userId} />
        </Route>
        <Route path="/create-character">
          <CreateCharacter userId={userId} cancelLink="/select-character" />
        </Route>
        <Route path="/game/:characterId" component={Game}>
        </Route>
        <Route path="/returning-player">
          <DeletePlayer userId={userId} onDelete={() => setUser(null)}></DeletePlayer>
        </Route>
        <Route path="/">
          <Home onCreate={() => setUser(uuidv4())} userId={userId}></Home>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
