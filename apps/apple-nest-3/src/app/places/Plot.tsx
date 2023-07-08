import { gql, useMutation } from '@apollo/client';
import { Character } from '@apple-nest-3/apple-nest-interfaces';
import { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '../components/ErrorMessage';
import { Saving } from '../components/Saving';
import { PlaceProps } from '../interfaces/place-props';
import './places.scss';
import { useActions } from './useActions';

export function Plot(props: PlaceProps) {

  let initialMessage = '';
  if (props.character.seedReadyDate == null && !props.character.bag?.seeds) {
    initialMessage = 'If you had seeds you could plant them here.';
  }
  const { doAction, message, error, loading } = useActions(props.character);

  const actions: ReactElement[] = [];
  if (props.character.seedReadyDate != null) {
    actions.push(<button onClick={async () => doAction('harvestCrop') }>Harvest Crop</button>);
    if (props.character.bag?.water) {
      actions.push(<button onClick={async () => doAction('waterCrop') }>Water Plant</button>);
    }
  } else if (props.character.bag?.seeds) {
    actions.push(<button onClick={async () => doAction('plantSeed') }>Plant Seed</button>);
  }

  return (
    <>
      <h2>Plot</h2>
      <img alt="Plot" src="assets/plot.jpg" height="100%"></img>
      <div>{message || initialMessage}</div>
      <Saving saving={loading}>
        <div>
          <ErrorMessage error={error}></ErrorMessage>
        </div>
        <div>
        {actions}
        </div>
        <div>
          <Link to="farm">Back To Farm</Link>
        </div>
      </Saving>
    </>
  );
}
