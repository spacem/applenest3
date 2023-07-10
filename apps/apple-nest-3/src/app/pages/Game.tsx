import { Link, match, Redirect, Route, useParams } from 'react-router-dom';
import { Character, easyEnemies, hardEnemies } from '@apple-nest-3/apple-nest-interfaces';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { Place } from '../interfaces/place';
import { PlaceLayout } from '../places/PlaceLayout';
import { BagContents } from '../components/BagContents';
import { Plot } from '../places/Plot';
import { gql, useQuery } from '@apollo/client';
import { places } from '../places/places';
import { useState } from 'react';
import { ExplorePlace } from '../places/ExplorePlace';
import { useActions } from '../places/useActions';

const GET_CHARACTER = gql`
  query Character($id: ID!) {
    character(id: $id) {
      _id,
      name,
      icon,
      bag {
        money,
        apples,
        seeds,
        water,
        buckets,
        weapon,
        shield,
        tickets
      },
      seedReadyDate,
      questNumber
    }
  }
`;

type screenMode = 'normal' | 'info' | 'help';

export function Game(params: {match: match}) {
  const [screenMode, setScreenMode] = useState('normal');
  const { characterId, place } = useParams<{ characterId: string, place: Place }>();
  const { loading, error, data } = useQuery<{ character: Character}>(GET_CHARACTER, {
    variables: { id: characterId },
  });

  const { doAction, message: outcomeMessage, error: questError, loading: questLoading } = useActions(data?.character);

  const help = () => {
    setScreenMode('help');
    doAction('acceptQuest');
  };

  return (
    <Loading loading={loading || questLoading}>
      {data?.character != null && <>
      {screenMode === 'help' &&
      <div>
        <button onClick={() => setScreenMode('normal')}>&lt; Back To Game</button>
        <div>
        {outcomeMessage}
        </div>
      </div>
      }
      {screenMode === 'info' &&
      <div>
        <button onClick={() => setScreenMode('normal')}>&lt; Back To Game</button>
        <div>{data?.character?.name}</div>
        <div><img alt="Character Icon" src={`assets/character${data?.character?.icon}.jpg`} /></div>
        <div>
          <BagContents bag={data?.character?.bag} />
        </div>
        <div className="place-actions">
          <Link to="/select-character">Switch Character</Link>
        </div>
      </div>
      }
      <div>
        <ErrorMessage error={error}></ErrorMessage>
      </div>
      <div className={ screenMode !== 'normal' ? 'hidden' : ''}>
        <button onClick={() => setScreenMode('info')}>Character Info</button>
        <button onClick={() => help()}>Need Help?</button>
        <Route path="/game/:characterId">
          <Redirect to={`${params.match.url}/town`}></Redirect>
        </Route>
        <Route path={`${params.match.url}/plot`}>
          <Plot character={data?.character}></Plot>
        </Route>
        <Route path={`${params.match.url}/forest`}>
          <ExplorePlace character={data?.character} place={places.forest} enemies={hardEnemies}></ExplorePlace>
        </Route>
        <Route path={`${params.match.url}/fields`}>
          <ExplorePlace character={data?.character} place={places.fields} enemies={easyEnemies}></ExplorePlace>
        </Route>
        <Route path={`${params.match.url}/farmer`}>
          <PlaceLayout character={data?.character} place={places.farmer}></PlaceLayout>
        </Route>
        <Route path={`${params.match.url}/farm`}>
          <PlaceLayout character={data?.character} place={places.farm}></PlaceLayout>
        </Route>
        <Route path={`${params.match.url}/town`}>
          <PlaceLayout character={data?.character} place={places.town}></PlaceLayout>
        </Route>
        <Route path={`${params.match.url}/well`}>
          <PlaceLayout character={data?.character} place={places.well}  />
        </Route>
        <Route path={`${params.match.url}/event-planner`}>
          <PlaceLayout character={data?.character} place={places.planner}  />
        </Route>
        <Route path={`${params.match.url}/city`}>
          <PlaceLayout character={data?.character} place={places.city}  />
        </Route>
        <Route path={`${params.match.url}/market`}>
          <PlaceLayout character={data?.character} place={places.market}  />
        </Route>
        <Route path={`${params.match.url}/blacksmith`}>
          <PlaceLayout character={data?.character} place={places.blacksmith}  />
        </Route>
      </div>
      </>
      }
    </Loading>
  );
}
