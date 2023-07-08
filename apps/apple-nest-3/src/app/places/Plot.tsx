import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '../components/ErrorMessage';
import { Saving } from '../components/Saving';
import { PlaceProps } from '../interfaces/place-props';
import './places.scss';
import { useActions } from './useActions';
import { Action } from './Action';

export function Plot(props: PlaceProps) {

  let initialMessage = '';
  if (props.character.seedReadyDate == null && !props.character.bag?.seeds) {
    initialMessage = 'If you had seeds you could plant them here.';
  }
  const { doAction, message, error, loading } = useActions(props.character);

  const actions: ReactElement[] = [];
  if (props.character.seedReadyDate != null) {
    actions.push(<Action action="custom" icon="apples.jpg" onClick={async () => doAction('harvestCrop') } title="Harvest Crop" />);
    if (props.character.bag?.water) {
      actions.push(<Action action="custom" icon="water.jpg" onClick={async () => doAction('waterCrop')} title="Water Plant" />);
    }
  } else if (props.character.bag?.seeds) {
    actions.push(<Action action="custom" icon="seeds.jpg" onClick={async () => doAction('plantSeed') } title="Plant Seed" />);
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
        <div className="place-actions">
          {actions}
          <Action title="Back To Farm" action="nav" param="farm" icon="farm.jpg" />
        </div>
      </Saving>
    </>
  );
}
