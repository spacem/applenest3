import './App.scss';
import { AppleNestRouter } from './AppleNestRouter';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import { environment } from '../environments/environment';

function App() {
  const client = new ApolloClient({
    uri: environment.graphUri,
    cache: new InMemoryCache()
  });

  return (
      <div className="App">
        <header className="App-header">
          <ApolloProvider client={client}>
            <AppleNestRouter />
          </ApolloProvider>
        </header>
      </div>
  );
}

export default App;
