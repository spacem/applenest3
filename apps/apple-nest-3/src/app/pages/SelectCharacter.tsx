import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Character } from '@apple-nest-3/apple-nest-interfaces';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import './SelectCharacter.scss';
import {
  useQuery,
  gql,
  useLazyQuery
} from "@apollo/client";
import { CreateCharacter } from './CreateCharacter';

interface SelectCharacterProps {
  userId: string | null;
}

export const GET_CHARACTERS = gql`
  query Character($userId: String) {
    characters(userId: $userId) {
      _id,
      name,
      icon,
    }
  }
`;

export function SelectCharacter(props: SelectCharacterProps) {
  const history = useHistory();
  // const { loading, error, data } = useQuery<{ characters: Character[]}>(GET_CHARACTERS);
  const [getCharacters, { loading, error, data }] = useLazyQuery<{ characters: Character[]}>(GET_CHARACTERS, {
    variables: { userId: props.userId }
  });

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

  if(!props.userId) {
    return <div>Not signed in<Link to="/">Retry</Link></div>
  }
  if (data?.characters?.length === 0) {
    return <CreateCharacter userId={props.userId} cancelLink="/"></CreateCharacter>
  }

  const characters = data?.characters.map((c) => {
    return (
      <button key={c._id} onClick={() => history.push(`/game/${c._id}`)}>
        <img src={`assets/character${c.icon}.jpg`} alt="Character Icon" />
        <div>{c.name}</div>
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
