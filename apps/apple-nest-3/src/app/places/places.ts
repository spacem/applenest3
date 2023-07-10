import { PlaceConfig } from './PlaceConfig';

export const places: { [key: string]: PlaceConfig } = {
  well: {
    title: 'Well',
    image: 'wishing_well.jpg',
    initialText: 'Looks like people have been wishing here.',
    down: {
      place: 'town',
    },
    actions: [
      {
        title: 'Take Money',
        action: 'collectReward',
        icon: 'money.jpg',
      },
      {
        title: 'Take Water',
        action: 'collectWater',
        icon: 'water.jpg',
      },
    ],
  },
  planner: {
    title: 'Helper',
    image: 'event_planner.jpg',
    initialText: '',
    left: {
      place: 'town',
    },
    actions: [
      {
        title: 'Ask for help?',
        action: 'acceptQuest',
        icon: 'event_planner.jpg',
      },
    ],
  },
  market: {
    title: 'Market',
    image: 'market.jpg',
    initialText: '',
    left: {
      place: 'city',
    },
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
    ],
  },
  city: {
    title: 'City',
    image: 'city.jpg',
    initialText: '',
    left: {
      place: 'town',
    },
    right: {
      place: 'market',
    },
    down: {
      place: 'blacksmith',
      level: 5
    },
  },
  town: {
    title: 'Town',
    image: 'town.jpg',
    initialText: '',
    left: {
      place: 'farm',
      level: 2,
    },
    right: {
      place: 'city',
      level: 4,
    },
    up: {
      place: 'well'
    },
    down: {
      place: 'forest',
      level: 8
    },
  },
  farm: {
    title: 'Farm',
    image: 'farm.jpg',
    initialText: '',
    right: {
      place: 'town',
    },
    left: {
      place: 'plot',
      level: 3,
    },
    up: { place: 'farmer' },
    down: { place: 'fields', level: 7 },
  },
  farmer: {
    title: 'Farmer',
    image: 'farmer.jpg',
    initialText: 'Hello. I am the farmer! You can buy seeds from me.',
    down: {
      place: 'farm',
    },
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
    ],
  },
  blacksmith: {
    title: 'Smith',
    image: 'blacksmith.jpg',
    initialText: 'Need stronger weapons, more armour?',
    up: {
      place: 'city',
    },
    actions: [
      {
        title: 'Buy/Upgrade Weapon',
        action: 'buyWeapon',
        icon: 'weapon.jpg',
      },
      {
        title: 'Buy/Upgrade Shield',
        action: 'buyShield',
        icon: 'shield.jpg',
      },
    ],
  },
  fields: {
    title: 'Fields',
    image: 'fields.jpg',
    initialText: '',
    up: {
      place: 'farm',
    },
    actions: [],
  },
  forest: {
    title: 'Forest',
    image: 'forest.jpg',
    initialText: '',
    up: {
      place: 'town',
    },
    actions: [],
  },
  plot: {
    title: 'Plot',
    image: 'plot.jpg',
    initialText: '',
    actions: [],
    right: {
      place: 'farm',
    },
  },
};
