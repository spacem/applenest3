import { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '../components/ErrorMessage';
import { Saving } from '../components/Saving';
import { PlaceProps } from '../interfaces/place-props';
import './places.scss';
import { useActions } from './useActions';
import { Action } from './Action';
import { PlaceConfig } from './PlaceConfig';
import { useBattle } from '../battle/useBattle';
import { BattleCreature } from '@apple-nest-3/apple-nest-interfaces';

export interface ExplorePlaceProps extends PlaceProps {
  place: PlaceConfig;
  enemies: BattleCreature[];
}

export function ExplorePlace({ character, place, enemies }: ExplorePlaceProps) {

  const [enemy] = useState(enemies[Math.floor(Math.random()*enemies.length)]);
  const { hp, enemyHp, message, nextStage } = useBattle(character, enemy);

  const { doAction, message: outcomeMessage, error, loading } = useActions(character);

  const battle = () => {
    doAction('battle', enemy.name);
  };

  return (
    <>
      <h2>{place?.title}</h2>
      <img alt="icon" src={`assets/${place.image}`} height="100%"></img>
      <Saving saving={loading}>
        <div>
          <ErrorMessage error={error}></ErrorMessage>
        </div>
        {hp > 0 && enemyHp > 0 && !outcomeMessage && <div className="actions">
          <div className="hp-bar" style={{width: `${hp}%`}}>
            {hp > 40 && `HP`}
          </div>
          <div className="enemy-hp-bar" style={{width: `${enemyHp}%`}}>
            {enemyHp > 40 && `Enemy`}
          </div>
          <div>
            {message}
          </div>
          <button onClick={nextStage}>Continue</button>
          <button onClick={battle}>View Outcome</button>
        </div>}
        {hp <= 0 && !outcomeMessage && <div>
          {message}
          <h4>You are defeated and cannot stay here.</h4>
          <button onClick={battle}>View Outcome</button>
        </div>}
        {enemyHp <= 0 && !outcomeMessage && <div>
          {message}
          <h4>You won!</h4>
          <button onClick={battle}>View Outcome</button>
        </div>}
        {outcomeMessage}
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
