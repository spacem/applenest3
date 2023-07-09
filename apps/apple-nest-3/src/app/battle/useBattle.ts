import { useState } from 'react';
import { BattleCreature, Character } from '@apple-nest-3/apple-nest-interfaces';

export function useBattle({ bag }: Character, creature: BattleCreature) {  
  const [numTurns, setNumTurns] = useState(0);
  const [yourTurn, setYourTurn] = useState(false);
  const [hp, setHp] = useState(100);
  const [message, setMessage] = useState(creature.battleStart);
  const [enemyHp, setEnemyHp] = useState(100);

  const doEnemyAttack = () => {
    const damage = creature.weapon * 10;
    const absorbedDamage = Math.min((bag?.shield || 0), damage)
    const actualDamage = (damage - absorbedDamage);
    const newHp = hp - actualDamage;
    setHp(newHp);
    setMessage(`The ${creature.name} deals ${actualDamage} damage.`)
  }

  const attackEnemy = () => {
    const damage = (bag?.weapon || 0) * 10;
    const absorbedDamage = Math.min(creature.shield, damage)
    const actualDamage = (damage - absorbedDamage);
    const newHp = enemyHp - actualDamage;
    setEnemyHp(newHp);
    setMessage(`You attack the ${creature.name} dealing ${actualDamage} damage.`);
  }

  const nextStage = () => {
    if (numTurns >= 8) {
      setMessage('This is taking too long, the enemy ran away');
      setHp(0);
    } else if (yourTurn) {
      attackEnemy();
    } else {
      doEnemyAttack();
    }
    setYourTurn(!yourTurn);
    setNumTurns(numTurns + 1);
  };

  return { message, hp, enemyHp, nextStage };
}
