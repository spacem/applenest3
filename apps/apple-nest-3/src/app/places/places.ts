import { PlaceConfig } from './PlaceConfig';

export const places: {[key:string]: PlaceConfig} = {
  well: {
    title: 'Wishing Well',
    image: 'wishing_well.jpg',
    initialText: 'Looks like people have been wishing here.',
    left: {
      place: 'town'
    },
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
      },
    ],
  },
  planner: {
    title: 'Helper',
    image: 'event_planner.jpg',
    initialText: '',
    left: {
      place: 'town'
    },
    actions: [
      {
        title: 'Ask for help?',
        action: 'acceptQuest',
        icon: 'event_planner.jpg'
      },
    ],
  },
  market: {
    title: 'Market',
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
        title: 'Get Help',
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
    left: {
      place: 'farm'
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
      }
    ]
  },
  blacksmith: {
    title: 'Blacksmith',
    image: 'blacksmith.jpg',
    initialText: 'Need stronger weapons, more armour?',
    left: {
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
