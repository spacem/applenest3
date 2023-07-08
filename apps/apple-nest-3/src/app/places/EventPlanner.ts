import { Quest } from '@apple-nest-3/apple-nest-interfaces';

export const questText: string[] = [];
questText[Quest.GetMoney] =
  'Your first quest is to get some money. Perhaps from a reward?';
questText[Quest.BuySeed] =
  'Your next quest is to get a seed from the famer. Go back to town to get to the farm.';
questText[Quest.GrowApple] =
  'Now you need to grow an apple. Go back to the farm and use the plot.';
questText[Quest.BuyBucket] =
  'Next I think you should buy yourself a bucket.';
questText[Quest.GetWater] =
  'Now you have a bucket, why not collect some water?';