import { Link, useHistory } from 'react-router-dom';
import { Saving } from '../components/Saving';
import { ErrorMessage } from '../components/ErrorMessage';
import { gql, useMutation } from '@apollo/client';
import { Character } from '@apple-nest-3/apple-nest-interfaces';

export const ADD_CHARACTER = gql`
  mutation Character($userId: String!, $name: String!) {
    createCharacter(userId: $userId, name: $name) {
      _id,
      name,
      userId
    }
  }
`;

interface CreateCharacterProps {
  userId: string | null;
  cancelLink: string;
}

export function CreateCharacter({ userId, cancelLink }: CreateCharacterProps) {
  const history = useHistory();
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
      history.push('/select-character');
    }
  });

  async function doAddCharacter() {
    await addCharacter({ variables: { userId: userId, name: input?.value }});
  }

  return (
    <Saving saving={loading}>
      <h2>Create Character</h2>
      <img alt="Create Character" src="assets/create_character.jpg" height="100%"></img>
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
        <Link to={cancelLink}>Cancel</Link>
      </div>
      <div>
        <ErrorMessage error={error}></ErrorMessage>
      </div>
    </Saving>
  );
}
