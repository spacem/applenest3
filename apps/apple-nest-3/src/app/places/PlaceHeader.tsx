import { PlaceProps } from '../interfaces/place-props';
import { Link } from 'react-router-dom';
import './places.scss';
import { PlaceConfig } from './PlaceConfig';
import { places } from './places';
import { Quest } from '@apple-nest-3/apple-nest-interfaces';

export interface PlaceHeaderProps {
  place: PlaceConfig;
  questNumber?: Quest;
}

const PlaceNavLink = ({ place, prefix, suffix }: { place: string, prefix?: string, suffix?: string }) => (
  <Link to={place}>
    <img alt="icon" src={`assets/${places[place].image}`} />
    {prefix}{places[place]?.title}{suffix}
  </Link>
);

export function PlaceHeader({
  place: { left, right, up, down, title, image },
  questNumber,
}: PlaceHeaderProps) {
  const isUnlocked = (level?: number) => (questNumber || 0) >= (level || 0);

  const leftPlace = isUnlocked(left?.level) && left?.place;
  const rightPlace = isUnlocked(right?.level) && right?.place;
  const upPlace = isUnlocked(up?.level) && up?.place;
  const downPlace = isUnlocked(down?.level) && down?.place;

  return (
    <>
      <h2>{title}</h2>
      {upPlace && rightPlace &&
      <div>
        <div className="place-images">
            <div className="place-nav place-nav-up" key={upPlace}>
              <PlaceNavLink place={upPlace} suffix={'˄'} />
            </div>
        </div>
      </div>}
      <div className="place-images">
        <div className="place-nav place-nav-left">
          {leftPlace && (
            <PlaceNavLink place={leftPlace} prefix={'<'} />
          )}
          {downPlace && !leftPlace && (
            <PlaceNavLink place={downPlace} prefix={'˅'} />
          )}
          {!leftPlace && !downPlace && <div className="place-nav-spacer">&nbsp;</div>}
        </div>
        <img alt="icon" src={`assets/${image}`} />
        <div className="place-nav place-nav-right">
          {rightPlace && (
            <PlaceNavLink place={rightPlace} suffix={'>'} />
          )}
          {upPlace && !rightPlace && (
            <PlaceNavLink place={upPlace} suffix={'˄'} />
          )}
          {!rightPlace && !upPlace && <div className="place-nav-spacer">&nbsp;</div>}
        </div>
      </div>
      {downPlace && leftPlace &&
      <div>
        <div className="place-images">
            <div className="place-nav place-nav-down" key={downPlace}>
              <PlaceNavLink place={downPlace} prefix={'˅'} />
            </div>
        </div>
      </div>}
    </>
  );
}
