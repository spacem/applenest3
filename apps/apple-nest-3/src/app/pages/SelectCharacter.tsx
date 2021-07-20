import { Component, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Character } from '@apple-nest-3/apple-nest-interfaces';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { History } from 'history';
import './SelectCharacter.scss';
import {
  useQuery,
  gql,
  useLazyQuery
} from "@apollo/client";

interface SelectCharacterProps {
  history: History;
}

const GET_CHARACTERS = gql`
  query Character {
    characters {
      id,
      name
    }
  }
`;

export function SelectCharacter(props: SelectCharacterProps) {
  // const { loading, error, data } = useQuery<{ characters: Character[]}>(GET_CHARACTERS);
  const [getCharacters, { loading, error, data }] = useLazyQuery<{ characters: Character[]}>(GET_CHARACTERS);

  let isMounted = true;
  useEffect(() => {
    if (isMounted) {
      getCharacters();
    }
    return () => {
      // problem with useQuery and react router and this workaround stops errors
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isMounted = false;
    };
  }, []);

  const characters = data?.characters.map((c) => {
    return (
      <button key={c.id} onClick={() => props.history.push(`/game/${c.id}`)}>
        {c.name}
      </button>
    );
  });

  return (
    <Loading loading={loading}>
      <ErrorMessage error={error} />
      <h2>Select Character</h2>
      <div className="character-list">{characters}</div>
      <div className="actions">
        <Link to="/create-character">Create Character</Link>
        <Link to="/">Sign Out</Link>
      </div>
    </Loading>
  );
}
