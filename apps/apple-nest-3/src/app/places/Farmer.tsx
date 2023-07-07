import { Component, useState } from 'react';
import { ErrorMessage } from '../components/ErrorMessage';
import { Saving } from '../components/Saving';
import { PlaceProps } from '../interfaces/place-props';
import { gql, useMutation } from '@apollo/client';
import { Character } from '@apple-nest-3/apple-nest-interfaces';
import { Link } from 'react-router-dom';

const BUY_SEEDS = gql`
  mutation Character($characterId: ID!, $numSeeds: Int) {
    buySeeds(characterId: $characterId, numSeeds: $numSeeds) {
      message,
      character {
        _id,
        questNumber,
        bag {
          money,
          apples,
          seeds
        }
      }
    }
  }
`;

export function Farmer(props: PlaceProps) {
  const [message, setMessage] = useState('You can buy seeds from me.');
  const [buySeeds, { loading, error }] = useMutation<{ buySeeds: { message: string, character: Character }}>(BUY_SEEDS);

  async function doBuySeeds(numSeeds: number) {
    const result = await buySeeds({ variables: { characterId: props.character._id, numSeeds } });
    if (result.data?.buySeeds.message) {
      setMessage(result.data?.buySeeds.message);
    }
  }

  return (
    <>
      <h2>Farmer</h2>
      <img alt="Farmer" src="assets/farmer.jpg" height="100%"></img>
      <div>Hello. I am the farmer!</div>
      <div>{message}</div>
      <Saving saving={loading}>
        <div>
          <ErrorMessage error={error}></ErrorMessage>
        </div>
        <div>
          <button onClick={() => doBuySeeds(1)}>
            Buy One Seed
          </button>
          <button onClick={() => doBuySeeds(10)}>
            Buy 10x Seeds
          </button>
          <button onClick={() => doBuySeeds(100)}>
            Buy 100x Seeds
          </button>
        </div>
        <div>
          <Link to="farm">Back To Farm</Link>
        </div>
      </Saving>
    </>
  );
}
