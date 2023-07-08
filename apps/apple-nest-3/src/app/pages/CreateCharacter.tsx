import { Link, useHistory } from 'react-router-dom';
import { Saving } from '../components/Saving';
import { ErrorMessage } from '../components/ErrorMessage';
import { gql, useMutation } from '@apollo/client';
import { Character } from '@apple-nest-3/apple-nest-interfaces';
import { useState } from 'react';

export const ADD_CHARACTER = gql`
  mutation Character($userId: String!, $name: String!, $icon: String!) {
    createCharacter(userId: $userId, name: $name, icon: $icon) {
      _id
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

  const [iconImage, setIconImage] = useState('');

  const [addCharacter, { loading, error }] = useMutation<{
    createCharacter: Character;
  }>(ADD_CHARACTER, {
    update: (cache, added) =>
      cache.modify({
        fields: {
          characters: (existingCharacters = []) => {
            const newFragment = cache.writeFragment({
              data: added.data?.createCharacter,
              fragment: gql`
                fragment NewCharacter on Character {
                  _id
                  name
                  userId
                }
              `,
            });
            return [...existingCharacters, newFragment];
          },
        },
      }),
    onCompleted: () => {
      history.push('/select-character');
    },
  });

  async function doAddCharacter() {
    await addCharacter({ variables: { userId: userId, name: input?.value, icon: iconImage } });
  }

  return (
    <Saving saving={loading}>
      {iconImage ? (
        <div>
          <h2>Create Character</h2>
          <img
            alt={`Icon ${iconImage}`}
            src={`assets/character${iconImage}.jpg`}
          ></img>
          <div>
            <input
              type="text"
              ref={(node) => (input = node)}
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
        </div>
      ) : (
        <div>
          <h2>Select Icon</h2>
          <div className="character-picker">
            {[...Array(6)].map((_, index) => (
              <button key={index} onClick={() => setIconImage(index.toString())}>
                <img
                  alt={`Icon ${index}`}
                  src={`assets/character${index}.jpg`}
                ></img>
              </button>
            ))}
          </div>
          <div>
            <Link to={cancelLink}>Cancel</Link>
          </div>
        </div>
      )}
      <div>
        <ErrorMessage error={error}></ErrorMessage>
      </div>
    </Saving>
  );
}
