import { useState } from 'react';
import { Link } from 'react-router-dom';
import { History } from 'history';
import { Town } from '../places/Town';
import { Character } from '@apple-nest-3/apple-nest-interfaces';
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
      id,
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

interface GameProps {
  history: History;
  characterId: string;
}

export function Game(props: GameProps) {

  const [place, setPlace] = useState(Place.Town);
  function getPlace(character?: Character) {
    if (character) {
      switch (place) {
        case Place.EventPlanner:
          return (
            <EventPlanner
              character={character}
              onChangePlace={(place) => setPlace(place)}
            ></EventPlanner>
          );
        case Place.Farmer:
          return (
            <Farmer
              character={character}
              onChangePlace={(place) => setPlace(place)}
            ></Farmer>
          );
        case Place.Plot:
          return (
            <Plot
              character={character}
              onChangePlace={(place) => setPlace(place)}
            ></Plot>
          );
        case Place.Farm:
          return (
            <Farm
              character={character}
              onChangePlace={(place) => setPlace(place)}
            ></Farm>
          );
        default:
          return (
            <Town
              character={character}
              onChangePlace={(place) => setPlace(place)}
            ></Town>
          );
      }
    } else {
      return null;
    }
  }

  const { loading, error, data } = useQuery<{ character: Character}>(GET_CHARACTER, {
    variables: { id: props.characterId },
  });
  return (
    <Loading loading={loading}>
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
      <div>{getPlace(data?.character)}</div>
    </Loading>
  );
}
