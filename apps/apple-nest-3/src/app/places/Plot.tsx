import { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '../components/ErrorMessage';
import { Saving } from '../components/Saving';
import { PlaceProps } from '../interfaces/place-props';
import './places.scss';
import { useActions } from './useActions';
import { Action } from './Action';
import { PlaceHeader } from './PlaceHeader';
import { places } from './places';

const getSeconds = (seedReadyDate?: number) =>
  Math.max(Math.floor(((seedReadyDate || 0) - new Date().valueOf()) / 1000), 0);

export function Plot({ character }: PlaceProps) {
  const [seconds, setSeconds] = useState(getSeconds(character.seedReadyDate));

  let initialMessage = '';
  if (character.seedReadyDate == null && !character.bag?.seeds) {
    initialMessage = 'If you had seeds you could plant them here.';
  }
  const { doAction, message, error, loading } = useActions(character);

  useEffect(() => {
    const newValue = getSeconds(character.seedReadyDate);
    if(newValue > 0) {
      setSeconds(newValue);
      setTimeout(() => setSeconds(getSeconds(character.seedReadyDate)), 1000);
    } else {
      setSeconds(0);
    }
  }, [seconds, character.seedReadyDate]);

  const actions: ReactElement[] = [];
  if (character.seedReadyDate != null) {
    if (seconds < 1 && seconds != null) {
      actions.push(
        <Action
          action="custom"
          icon="apples.jpg"
          onClick={() => doAction('harvestCrop')}
          title="Harvest Crop"
          key="Harvest Crop"
        />
      );
    } else {
      actions.push(
        <Action
          action="custom"
          icon="water.jpg"
          onClick={() => doAction('waterCrop')}
          title="Water Plant"
          key="Water Plant"
        />
      );
    }
  } else if (character.bag?.seeds) {
    actions.push(
      <Action
        action="custom"
        icon="seeds.jpg"
        onClick={() => doAction('plantSeed')}
        title="Plant Seed"
        key="Plant Seed"
      />
    );
  }

  return (
    <>
      <PlaceHeader place={places.plot} />
      <div>{message || initialMessage}</div>
      {seconds > 0 && `Apples will be ready in ${seconds} seconds`}
      <Saving saving={loading}>
        <div>
          <ErrorMessage error={error}></ErrorMessage>
        </div>
        <div className="place-actions">{actions}</div>
      </Saving>
    </>
  );
}
