import { PlaceConfig } from './PlaceConfig';

export const places: {[key:string]: PlaceConfig} = {
  well: {
    title: 'Wishing Well',
    image: 'wishing_well.jpg',
    initialText: 'Looks like people have been wishing here.',
    actions: [
      {
        title: 'Take Money',
        action: 'collectReward',
        icon: 'money.jpg'
      },
      {
        title: 'Take Water',
        action: 'collectWater',
        icon: 'water.jpg'
      },
      {
        title: 'Back To Town',
        action: 'nav',
        param: 'town',
        icon: 'town.jpg'
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
        icon: 'event_planner.jpg'
      },
      {
        title: 'Back To Town',
        action: 'nav',
        param: 'town',
        icon: 'town.jpg',
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
        icon: 'apples.jpg',
      },
      {
        title: 'Buy Bucket (10)',
        action: 'buyBucket',
        icon: 'water.jpg',
      },
      {
        title: 'Back To City',
        action: 'nav',
        param: 'city',
        icon: 'city.jpg',
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
        icon: 'market.jpg'
      },
      {
        title: 'Back To Town',
        action: 'nav',
        param: 'town',
        icon: 'town.jpg'
      },
    ],
  },
  town: {
    title: 'Town',
    image: 'town.jpg',
    initialText: '',
    actions: [
      {
        title: 'Visit The Farm',
        action: 'nav',
        param: 'farm',
        icon: 'farm.jpg',
        level: 2,
      },
      {
        title: 'Go To The City',
        action: 'nav',
        param: 'city',
        icon: 'city.jpg',
        level: 3,
      },
      {
        title: 'Talk To The Quest NPC',
        action: 'nav',
        param: 'event-planner',
        icon: 'event_planner.jpg',
      },
      {
        title: 'Walk To The Wishing Well',
        action: 'nav',
        param: 'well',
        icon: 'wishing_well.jpg',
      },
    ],
  },
  farm: {
    title: 'Farm',
    image: 'farm.jpg',
    initialText: '',
    actions: [
      {
        title: 'Talk To The Farmer',
        action: 'nav',
        param: 'farmer',
        icon: 'farmer.jpg',
      },
      {
        title: 'Plant Something',
        action: 'nav',
        param: 'plot',
        icon: 'plot.jpg',
        level: 3,
      },
      {
        title: 'Go Back To Town',
        action: 'nav',
        param: 'town',
        icon: 'town.jpg',
      },
    ]
  },
  farmer: {
    title: 'Farmer',
    image: 'farmer.jpg',
    initialText: 'Hello. I am the farmer! You can buy seeds from me.',
    actions: [
      {
        title: 'Buy One Seed',
        action: 'buySeeds',
        param: '1',
        icon: 'seeds.jpg',
      },
      {
        title: 'Buy 10x Seeds',
        action: 'buySeeds',
        param: '10',
        icon: 'seeds.jpg',
        level: 3,
      },
      {
        title: 'Go Back To Town',
        action: 'nav',
        param: 'town',
        icon: 'town.jpg',
      },
    ]
  }
};
