import { FunctionComponent } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { SelectCharacter } from './pages/SelectCharacter';
import { createBrowserHistory } from 'history';
import { CreateCharacter } from './pages/CreateCharacter';
import { Town } from './pages/Town';
import { Home } from './pages/Home';

export const AppleNestRouter: FunctionComponent<{}> = props => {
    const history = createBrowserHistory();
    return <Router history={history}>
        <Switch>
            <Route path="/select-character">
                <SelectCharacter history={history} />
            </Route>
            <Route path="/create-character">
                <CreateCharacter history={history} />
            </Route>
            <Route path="/town">
                <Town history={history} />
            </Route>
            <Route path="/">
                <Home></Home>
            </Route>
        </Switch>
    </Router>
}
