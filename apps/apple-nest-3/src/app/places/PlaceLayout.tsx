import { ErrorMessage } from '../components/ErrorMessage';
import { Saving } from '../components/Saving';
import { PlaceProps } from '../interfaces/place-props';
import { Link } from 'react-router-dom';
import './places.scss';
import { places } from './places';
import { useActions } from './useActions';

interface EventPlannerState {
  message?: string;
  doingQuest?: boolean;
}

export function PlaceLayout(props: PlaceProps) {
  const initialState: EventPlannerState = {
    doingQuest: false,
  };

  const place = places[props.place || ''];

  const { doAction, message, error, loading } = useActions(props.character);
  return (
    <>
      <h2>{place?.title}</h2>
      <img
        alt="icon"
        src={`assets/${place.image}`}
        height="100%"
      ></img>
      <div>{message || place.initialText}</div>
      <Saving saving={loading}>
        <div>
          <ErrorMessage error={error}></ErrorMessage>
        </div>
        <div>
          {place.actions.map(({ title, action, param }) =>
            action === 'nav' && param ? (
              <Link key={title} to={param}>{title}</Link>
            ) : (
              <button key={title} onClick={() => doAction(action)}>{title}</button>
            )
          )}
        </div>
      </Saving>
    </>
  );
}
