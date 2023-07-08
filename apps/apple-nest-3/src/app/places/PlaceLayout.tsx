import { ErrorMessage } from '../components/ErrorMessage';
import { Saving } from '../components/Saving';
import { PlaceProps } from '../interfaces/place-props';
import { Link } from 'react-router-dom';
import './places.scss';
import { useActions } from './useActions';
import { PlaceConfig } from './PlaceConfig';
import { Action } from './Action';

export interface PlaceLayoutProps extends PlaceProps {
  place: PlaceConfig;
}

export function PlaceLayout({ place, character }: PlaceLayoutProps) {
  const { doAction, message, error, loading } = useActions(character);
  return (
    <>
      <h2>{place?.title}</h2>
      <img alt="icon" src={`assets/${place.image}`} height="100%"></img>
      <div>{message || place.initialText}</div>
      <Saving saving={loading}>
        <div>
          <ErrorMessage error={error}></ErrorMessage>
        </div>
        <div className="place-actions">
          {place.actions
            .filter((a) => (character?.questNumber || 0) >= (a.level || 0))
            .map(({ title, action, param, icon }) => (
              <div key={title}>
                <Action
                  title={title}
                  action={action}
                  param={param}
                  icon={icon}
                  onClick={() => doAction(action, param)}
                />
              </div>
            ))}
        </div>
      </Saving>
    </>
  );
}
