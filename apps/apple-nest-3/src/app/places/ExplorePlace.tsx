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
import { BattleCreature } from '../battle/battle-creature';

export interface ExplorePlaceProps extends PlaceProps {
  place: PlaceConfig;
  enemies: BattleCreature[];
}

export function ExplorePlace({ character, place, enemies }: ExplorePlaceProps) {

  const [enemy] = useState(enemies[Math.floor(Math.random()*enemies.length)]);
  const { hp, enemyHp, message, nextStage } = useBattle(character, enemy);

  const { doAction, message: saveMessage, error, loading } = useActions(character);

  return (
    <>
      <h2>{place?.title}</h2>
      <img alt="icon" src={`assets/${place.image}`} height="100%"></img>
      <Saving saving={loading}>
        <div>
          <ErrorMessage error={error}></ErrorMessage>
        </div>
        {hp > 0 && enemyHp > 0 &&<div className="actions">
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
        </div>}
        {hp <= 0 && <div>
          {message}
          <h4>You are defeated and cannot stay here.</h4>
        </div>}
        {enemyHp <= 0 && <div>
          {message}
          <h4>You won!</h4>
        </div>}
        <div className="place-actions">
          <Action title="Back To Farm" action="nav" param="farm" icon="farm.jpg" />
        </div>
      </Saving>
    </>
  );
}
