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
        icon: 'water.jpg',
        level: 5,
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
    initialText: 'Hello! Do you need help to know what to do next?',
    actions: [
      {
        title: 'Ask what to do?',
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
    title: 'Markets',
    image: 'market.jpg',
    initialText: '',
    left: {
      place: 'city'
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
      }
    ],
  },
  city: {
    title: 'City',
    image: 'city.jpg',
    initialText: '',
    left: {
      place: 'town'
    },
    right: {
      place: 'market'
    },
    actions: [
      {
        title: 'Visit Blacksmith',
        action: 'nav',
        param: 'blacksmith',
        icon: 'blacksmith.jpg',
        level: 5,
      },
    ],
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
      level: 4
    },
    actions: [
      {
        title: 'Get Help From The Quest NPC',
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
      {
        title: 'Explore The Forest',
        action: 'nav',
        param: 'forest',
        icon: 'forest.jpg',
        level: 8
      },
    ],
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
    actions: [
      {
        title: 'Talk To The Farmer',
        action: 'nav',
        param: 'farmer',
        icon: 'farmer.jpg',
      },  
      {
        title: 'Explore The Fields',
        action: 'nav',
        param: 'fields',
        icon: 'fields.jpg',
        level: 7
      }
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
        title: 'Go Back To Farm',
        action: 'nav',
        param: 'farm',
        icon: 'farm.jpg',
      },
    ]
  },
  blacksmith: {
    title: 'Blacksmith',
    image: 'blacksmith.jpg',
    initialText: 'Need stronger weapons, more armour?',
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
      {
        title: 'Go Back To The City',
        action: 'nav',
        param: 'city',
        icon: 'city.jpg',
      },
    ]
  },
  fields: {
    title: 'Fields',
    image: 'fields.jpg',
    initialText: '',
    actions: [
      {
        title: 'Return To The Farm',
        action: 'nav',
        param: 'farm',
        icon: 'farm.jpg',
      },
    ]
  },
  forest: {
    title: 'Forest',
    image: 'forest.jpg',
    initialText: '',
    actions: [
      {
        title: 'Return To The Town',
        action: 'nav',
        param: 'town',
        icon: 'town.jpg',
      },
    ]
  },
  plot: {
    title: 'Plot',
    image: 'plot.jpg',
    initialText: '',
    actions: [],
    right: {
      place: 'farm'
    }
  }
};
