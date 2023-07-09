import { PlaceProps } from '../interfaces/place-props';
import { Link } from 'react-router-dom';
import './places.scss';
import { PlaceConfig } from './PlaceConfig';
import { places } from './places';

export interface PlaceHeaderProps {
  place: PlaceConfig;
}

export function PlaceHeader({ place }: PlaceHeaderProps) {
  const left = place.left?.place ? places[place.left.place] : undefined;
  const right = place.right?.place ? places[place.right.place] : undefined;
  return (
    <>
      <h2>{place?.title}</h2>
      <div className="place-images">
        <div className="place-nav place-nav-left">
          {left && place.left?.place && (
            <Link to={place.left.place}>
              <img alt="icon" src={`assets/${left.image}`} />
              &lt; {left?.title}
            </Link>
          )}
          {!left && <div className="place-nav-spacer">&nbsp;</div>}
        </div>
        <img alt="icon" src={`assets/${place.image}`} />
        <div className="place-nav place-nav-right">
          {right && place.right?.place && (
            <Link to={place.right.place}>
              <img alt="icon" src={`assets/${right.image}`} />
              {right?.title} &gt;
            </Link>
          )}
          {!right && <div className="place-nav-spacer">&nbsp;</div>}
        </div>
      </div>
    </>
  );
}
