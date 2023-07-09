import { Quest } from '@apple-nest-3/apple-nest-interfaces';

export const questText: string[] = [];
questText[Quest.GetMoney] =
  'Before doing anything you need to get some money.';
questText[Quest.BuySeed] =
  'Now buy a seed from the famer. Go back to town to get to the farm.';
questText[Quest.GrowApple] =
  'Use the seek to grow an apple. Go back to the farm and use the plot.';
questText[Quest.BuyBucket] =
  'Next I think you should buy yourself a bucket.';
questText[Quest.GetWater] =
  'Now you have a bucket, why not collect some water?';
questText[Quest.GetArms] =
  'It is time to fight. Equip yourself with a sword and shield';
questText[Quest.GetTicket] =
  'Visit the fields of the farm and battle some easy opponents';
questText[Quest.Fight] =
  'Try harder battles in the forest near town';
