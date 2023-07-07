import { PlaceConfig } from './PlaceConfig';

export const places: {[key:string]: PlaceConfig} = {
  well: {
    title: 'Wishing Well',
    image: 'wishing_well.jpg',
    initialText: 'Looks like people have been wishing here.',
    actions: [
      {
        title: 'Take Money From The Well',
        action: 'collectReward',
      },
      {
        title: 'Back To Town',
        action: 'nav',
        param: 'town',
      },
    ],
  },
  planner: {
    title: 'Event Planner',
    image: 'event_planner.jpg',
    initialText: 'Hello I am the event planner. Do you want a quest?',
    actions: [
      {
        title: 'Accept Quest',
        action: 'acceptQuest',
      },
      {
        title: 'Back To Town',
        action: 'nav',
        param: 'town',
      },
    ],
  },
  market: {
    title: 'Market',
    image: 'market.jpg',
    initialText: 'Should easy to sell apples here',
    actions: [
      {
        title: 'Sell Apples',
        action: 'sell',
      },
      {
        title: 'Back To City',
        action: 'nav',
        param: 'town',
      },
    ],
  },
  city: {
    title: 'City',
    image: 'city.jpg',
    initialText: '',
    actions: [
      {
        title: 'Visit Markets',
        action: 'nav',
        param: 'market',
      },
      {
        title: 'Back To Town',
        action: 'nav',
        param: 'town',
      },
    ],
  }
};
