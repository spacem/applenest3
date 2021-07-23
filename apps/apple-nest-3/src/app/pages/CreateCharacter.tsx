import { Link } from 'react-router-dom';
import { History } from 'history';
import { Saving } from '../components/Saving';
import { ErrorMessage } from '../components/ErrorMessage';
import { gql, useMutation } from '@apollo/client';
import { Character } from '@apple-nest-3/apple-nest-interfaces';

const ADD_CHARACTER = gql`
  mutation Character($userId: String!, $name: String!) {
    createCharacter(userId: $userId, name: $name) {
      _id,
      name,
      userId
    }
  }
`;

interface CreateCharacterProps {
  history: History;
  userId: string;
}

export function CreateCharacter(props: CreateCharacterProps) {

  let input: HTMLInputElement | null;

  const [addCharacter, { loading, error }] = useMutation<{ createCharacter: Character }>(ADD_CHARACTER, {
    update: (cache, added) => cache.modify({
        fields: {
          characters: (existingCharacters = []) => {
            const newFragment = cache.writeFragment({
              data: added.data?.createCharacter,
              fragment: gql`
                fragment NewCharacter on Character {
                  _id,
                  name,
                  userId
                }`
            });
            return [...existingCharacters, newFragment];
          }
        }
    }),
    onCompleted: () => {
      props.history.push('/select-character');
    }
  });

  async function doAddCharacter() {
    await addCharacter({ variables: { userId: props.userId, name: input?.value }});
  }

  return (
    <Saving saving={loading}>
      <h2>Create Character</h2>
      <div>
        <input
          ref={node => input = node }
          onKeyPress={async (event) => {
            if (event.key === 'Enter') {
              doAddCharacter();
            }
          }}
          placeholder="Character Name"
        />
      </div>
      <div>
        <button onClick={async () => doAddCharacter()}>
          Create Character
        </button>
        <Link to="/select-character">Cancel</Link>
      </div>
      <div>
        <ErrorMessage error={error}></ErrorMessage>
      </div>
    </Saving>
  );
}
