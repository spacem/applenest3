import './App.scss';
import { AppleNestRouter } from './AppleNestRouter';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";

function App() {
  const client = new ApolloClient({
    uri: 'http://localhost:3333/graphql',
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
