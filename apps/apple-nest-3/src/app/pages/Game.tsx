import { Link, match, Redirect, Route, useParams } from 'react-router-dom';
import { Town } from '../places/Town';
import { Character } from '@spacems/apple-nest-3-character';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { Place } from '../interfaces/place';
import { EventPlanner } from '../places/EventPlanner';
import { Farmer } from '../places/Farmer';
import { Farm } from '../places/Farm';
import { BagContents } from '../components/BagContents';
import { Plot } from '../places/Plot';
import { gql, useQuery } from '@apollo/client';

const GET_CHARACTER = gql`
  query Character($id: ID!) {
    character(id: $id) {
      _id,
      name,
      bag {
        money,
        apples,
        seeds
      },
      seedReadyDate,
      questNumber
    }
  }
`;


export function Game(params: {match: match}) {
  const { characterId } = useParams<{ characterId: string, place: Place }>();
  const { loading, error, data } = useQuery<{ character: Character}>(GET_CHARACTER, {
    variables: { id: characterId },
  });
  return (
    <Loading loading={loading}>
      {data?.character != null && <>
      <div>Character: {data?.character?.name}</div>
      <div>
        <Link to="/select-character">Switch Character</Link>
      </div>
      <div>
        <ErrorMessage error={error}></ErrorMessage>
      </div>
      <div>
        <BagContents bag={data?.character?.bag} />
      </div>
      <div>
        <Route path="/game/:characterId">
          <Redirect to={`${params.match.url}/town`}></Redirect>
        </Route>
        <Route path={`${params.match.url}/event-planner`}>
          <EventPlanner character={data?.character}></EventPlanner>
        </Route>
        <Route path={`${params.match.url}/farmer`}>
          <Farmer character={data?.character}></Farmer>
        </Route>
        <Route path={`${params.match.url}/plot`}>
          <Plot character={data?.character}></Plot>
        </Route>
        <Route path={`${params.match.url}/farm`}>
          <Farm character={data?.character}></Farm>
        </Route>
        <Route path={`${params.match.url}/town`}>
          <Town character={data?.character}></Town>
        </Route>
      </div>
      </>
      }
    </Loading>
  );
}
