"use strict";

exports.__esModule = true;
exports.getDataForFilters = getDataForFilters;
exports.getColumnsForFilters = getColumnsForFilters;
exports.FILTERS_DATE_FORMAT = void 0;
var FILTERS_DATE_FORMAT = 'YYYY-MM-DD';
exports.FILTERS_DATE_FORMAT = FILTERS_DATE_FORMAT;

function getDataForFilters() {
  return [{
    id: 1,
    name: 'Nannie Patel',
    address: 'Jenkinsville',
    registered: '2014-01-29',
    eyeColor: {
      color: 'green'
    },
    balance: 1261.6,
    active: true
  }, {
    id: 2,
    name: 'Leanne Ware',
    address: 'Gardiner',
    registered: '2014-12-08',
    eyeColor: {
      color: 'blue'
    },
    balance: 2231.76,
    active: false
  }, {
    id: 3,
    name: 'Mathis Boone',
    address: 'Saranap',
    registered: '2015-04-11',
    eyeColor: {
      color: 'blue'
    },
    balance: 2930.58,
    active: true
  }, {
    id: 4,
    name: 'Cruz Benjamin',
    address: 'Cascades',
    registered: '2015-07-18',
    eyeColor: {
      color: 'green'
    },
    balance: 1621.93,
    active: false
  }, {
    id: 5,
    name: 'Reese David',
    address: 'Soham',
    registered: '2014-08-25',
    eyeColor: {
      color: 'green'
    },
    balance: 2998.15,
    active: true
  }, {
    id: 6,
    name: 'Ernestine Wiggins',
    address: 'Needmore',
    registered: '2014-03-13',
    eyeColor: {
      color: 'brown'
    },
    balance: 1800.03,
    active: true
  }, {
    id: 7,
    name: 'Chelsea Solomon',
    address: 'Alamo',
    registered: '2014-11-12',
    eyeColor: {
      color: 'green'
    },
    balance: 2450.68,
    active: false
  }, {
    id: 8,
    name: 'Vang Farmer',
    address: 'Canby',
    registered: '2014-01-08',
    eyeColor: {
      color: 'brown'
    },
    balance: 3869.5,
    active: false
  }, {
    id: 9,
    name: 'Mcintyre Clarke',
    address: 'Wakarusa',
    registered: '2014-06-28',
    eyeColor: {
      color: 'green'
    },
    balance: 3012.56,
    active: true
  }, {
    id: 10,
    name: 'Padilla Casey',
    address: 'Garberville',
    registered: '2015-08-16',
    eyeColor: {
      color: 'blue'
    },
    balance: 3472.56,
    active: false
  }, {
    id: 11,
    name: 'Hickman King',
    address: 'Yukon',
    registered: '2014-05-21',
    eyeColor: {
      color: 'brown'
    },
    balance: 2565.74,
    active: true
  }, {
    id: 12,
    name: 'Becky Ross',
    address: 'Layhill',
    registered: '2015-02-19',
    eyeColor: {
      color: 'brown'
    },
    balance: 2796.7,
    active: false
  }, {
    id: 13,
    name: 'Dina Randolph',
    address: 'Henrietta',
    registered: '2014-04-29',
    eyeColor: {
      color: 'blue'
    },
    balance: 3827.99,
    active: false
  }, {
    id: 14,
    name: 'Helga Mathis',
    address: 'Brownsville',
    registered: '2015-03-22',
    eyeColor: {
      color: 'brown'
    },
    balance: 3917.34,
    active: true
  }, {
    id: 15,
    name: 'Carissa Villarreal',
    address: 'Wildwood',
    registered: '2014-08-17',
    eyeColor: {
      color: 'green'
    },
    balance: 1181.55,
    active: true
  }, {
    id: 16,
    name: 'Lee Reed',
    address: 'Finderne',
    registered: '2014-02-23',
    eyeColor: {
      color: 'blue'
    },
    balance: 3623.74,
    active: true
  }, {
    id: 17,
    name: 'Bridges Sawyer',
    address: 'Bowie',
    registered: '2015-06-28',
    eyeColor: {
      color: 'green'
    },
    balance: 1792.36,
    active: false
  }, {
    id: 18,
    name: 'Gertrude Nielsen',
    address: 'Sidman',
    registered: '2015-04-18',
    eyeColor: {
      color: 'brown'
    },
    balance: 2356.96,
    active: false
  }, {
    id: 19,
    name: 'Patsy Mooney',
    address: 'Lund',
    registered: '2015-04-30',
    eyeColor: {
      color: 'blue'
    },
    balance: 1260,
    active: true
  }, {
    id: 20,
    name: 'Twila Goodman',
    address: 'Guilford',
    registered: '2014-04-05',
    eyeColor: {
      color: 'green'
    },
    balance: 3242.95,
    active: false
  }, {
    id: 21,
    name: 'Freda Robinson',
    address: 'Weeksville',
    registered: '2015-03-13',
    eyeColor: {
      color: 'brown'
    },
    balance: 3440.85,
    active: true
  }, {
    id: 22,
    name: 'Burt Cash',
    address: 'Coral',
    registered: '2014-03-14',
    eyeColor: {
      color: 'brown'
    },
    balance: 2367.56,
    active: true
  }, {
    id: 23,
    name: 'Mejia Osborne',
    address: 'Fowlerville',
    registered: '2014-05-24',
    eyeColor: {
      color: 'blue'
    },
    balance: 1852.34,
    active: false
  }, {
    id: 24,
    name: 'Greta Patterson',
    address: 'Bartonsville',
    registered: moment().add(-2, 'days').format(FILTERS_DATE_FORMAT),
    eyeColor: {
      color: 'green'
    },
    balance: 2437.58,
    active: false
  }, {
    id: 25,
    name: 'Whitley Jordan',
    address: 'Driftwood',
    registered: '2015-03-04',
    eyeColor: {
      color: 'brown'
    },
    balance: 2493.11,
    active: true
  }, {
    id: 26,
    name: 'Stanton Britt',
    address: 'Nipinnawasee',
    registered: moment().add(-1, 'days').format(FILTERS_DATE_FORMAT),
    eyeColor: {
      color: 'green'
    },
    balance: 3592.18,
    active: false
  }, {
    id: 27,
    name: 'Peterson Bowers',
    address: 'Nelson',
    registered: moment().add(-1, 'days').format(FILTERS_DATE_FORMAT),
    eyeColor: {
      color: 'green'
    },
    balance: 3710.07,
    active: false
  }, {
    id: 28,
    name: 'Ferguson Nichols',
    address: 'Rossmore',
    registered: '2014-07-11',
    eyeColor: {
      color: 'blue'
    },
    balance: 3893.67,
    active: true
  }, {
    id: 29,
    name: 'Pearson Douglas',
    address: 'Esmont',
    registered: '2015-04-30',
    eyeColor: {
      color: 'blue'
    },
    balance: 3054.16,
    active: false
  }, {
    id: 30,
    name: 'Alice Blake',
    address: 'Kimmell',
    registered: '2014-05-31',
    eyeColor: {
      color: 'blue'
    },
    balance: 1769.95,
    active: false
  }, {
    id: 31,
    name: 'Ella Owen',
    address: 'Nutrioso',
    registered: '2014-07-09',
    eyeColor: {
      color: 'brown'
    },
    balance: 3366.37,
    active: true
  }, {
    id: 32,
    name: 'Long Mathews',
    address: 'Masthope',
    registered: moment().add(-1, 'days').format(FILTERS_DATE_FORMAT),
    eyeColor: {
      color: 'green'
    },
    balance: 3379.52,
    active: false
  }, {
    id: 33,
    name: 'Molly Walton',
    address: 'Courtland',
    registered: '2015-03-20',
    eyeColor: {
      color: 'green'
    },
    balance: 1453.02,
    active: true
  }, {
    id: 34,
    name: 'Rocha Maddox',
    address: 'Machias',
    registered: moment().add(1, 'days').format(FILTERS_DATE_FORMAT),
    eyeColor: {
      color: 'green'
    },
    balance: 3365.53,
    active: false
  }, {
    id: 35,
    name: 'Craft Keith',
    address: 'Summerfield',
    registered: moment().add(-3, 'days').format(FILTERS_DATE_FORMAT),
    eyeColor: {
      color: 'blue'
    },
    balance: 3468.15,
    active: false
  }, {
    id: 36,
    name: 'Alyssa Francis',
    address: 'Nord',
    registered: moment().add(-2, 'days').format(FILTERS_DATE_FORMAT),
    eyeColor: {
      color: 'blue'
    },
    balance: 3414.37,
    active: true
  }, {
    id: 37,
    name: 'Milagros Parsons',
    address: 'Dunlo',
    registered: moment().add(2, 'days').format(FILTERS_DATE_FORMAT),
    eyeColor: {
      color: 'brown'
    },
    balance: 1230.63,
    active: false
  }, {
    id: 38,
    name: 'Heather Mcdaniel',
    address: 'Glenshaw',
    registered: '2014-12-15',
    eyeColor: {
      color: 'brown'
    },
    balance: 3259.04,
    active: true
  }, {
    id: 39,
    name: 'Everett James',
    address: 'Manitou',
    registered: moment().add(1, 'days').format(FILTERS_DATE_FORMAT),
    eyeColor: {
      color: 'blue'
    },
    balance: 3347,
    active: false
  }];
}

function getColumnsForFilters() {
  return [{
    data: 'id',
    type: 'numeric',
    title: 'ID'
  }, {
    data: 'name',
    type: 'text',
    title: 'Full name'
  }, {
    data: 'address',
    type: 'text',
    title: 'Address'
  }, {
    data: 'registered',
    type: 'date',
    title: 'Registered',
    dateFormat: FILTERS_DATE_FORMAT
  }, {
    data: 'eyeColor.color',
    type: 'dropdown',
    title: 'Eye color',
    source: ['blue', 'brown', 'green']
  }, {
    data: 'balance',
    type: 'numeric',
    title: 'Balance',
    numericFormat: {
      pattern: '0,00.00 $'
    }
  }, {
    data: 'active',
    type: 'checkbox',
    title: 'Active'
  }];
}