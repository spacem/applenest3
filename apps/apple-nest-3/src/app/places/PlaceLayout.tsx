import { ErrorMessage } from '../components/ErrorMessage';
import { Saving } from '../components/Saving';
import { PlaceProps } from '../interfaces/place-props';
import { Link } from 'react-router-dom';
import './places.scss';
import { useActions } from './useActions';
import { PlaceConfig } from './PlaceConfig';

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
              <div>
                {action === 'nav' && param ? (
                  <Link key={title} to={param}>
                    {icon && <img alt="icon" src={`assets/${icon}`} />}
                    <span>{title}</span>
                  </Link>
                ) : (
                  <button key={title} onClick={() => doAction(action)}>
                    {icon && <img alt="icon" src={`assets/${icon}`} />}
                    <span>{title}</span>
                  </button>
                )}
              </div>
            ))}
        </div>
      </Saving>
    </>
  );
}
