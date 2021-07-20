import { gql, useMutation } from '@apollo/client';
import { Character } from '@apple-nest-3/apple-nest-interfaces';
import { Component, useState } from 'react';
import { PlotWebservice } from '../api/PlotWebService';
import { ErrorMessage } from '../components/ErrorMessage';
import { Saving } from '../components/Saving';
import { Place } from '../interfaces/place';
import { PlaceProps } from '../interfaces/place-props';


const PLANT_SEED = gql`
  mutation Character($characterId: ID!) {
    plantSeed(characterId: $characterId) {
      message,
      character {
        id,
        name,
        seedReadyDate,
        bag {
          money,
          apples,
          seeds
        }
      }
    }
  }
`;

const HARVEST_CROP = gql`
  mutation Character($characterId: ID!) {
    harvestCrop(characterId: $characterId) {
      message,
      character {
        id,
        name,
        seedReadyDate,
        bag {
          money,
          apples,
          seeds
        }
      }
    }
  }
`;

export function Plot(props: PlaceProps) {

  let initialMessage = '';
  if (props.character.seedReadyDate == null && !props.character.bag?.seeds) {
    initialMessage = 'If you had seeds you could plant them here.';
  }
  const [message, setMessage] = useState(initialMessage);

  const [plantSeed, { loading: loadingPlant, error: plantError }] = useMutation<{ plantSeed: { message: string, character: Character }}>(PLANT_SEED);
  const [harvestCrop, { loading: loadingHarvest, error: harvestError }] = useMutation<{ harvestCrop: { message: string, character: Character }}>(HARVEST_CROP);

  async function doPlantSeed() {
    const result = await plantSeed({ variables: { characterId: props.character.id } });
    if (result.data?.plantSeed.message) {
      setMessage(result.data?.plantSeed.message);
    }
  }

  async function doHarvestCrop() {
    const result = await harvestCrop({ variables: { characterId: props.character.id } });
    if (result.data?.harvestCrop.message) {
      setMessage(result.data?.harvestCrop.message);
    }
  }

  let action;
  if (props.character.seedReadyDate != null) {
    action = <button onClick={async () => doHarvestCrop() }>Harvest Crop</button>;
  } else if (props.character.bag?.seeds) {
    action = <button onClick={async () => doPlantSeed() }>Plant Seed</button>;
  }

  return (
    <>
      <h2>Plot</h2>
      <div>{message}</div>
      <Saving saving={loadingPlant || loadingHarvest}>
        <div>
          <ErrorMessage error={plantError}></ErrorMessage>
          <ErrorMessage error={harvestError}></ErrorMessage>
        </div>
        <div>
        {action}
        </div>
        <div>
          <button onClick={() => props.onChangePlace(Place.Farm)}>
            Back To Farm
          </button>
        </div>
      </Saving>
    </>
  );
}
