const matches = [
  {
    id: '1',
    division: '1',
    date: new Date('2015-01-15').getTime(),
    duration: '25:00',
    matches: [
      {
        locals: ['1', '2'],
        visitors: ['3', '4'],
        result: [1, 3],
      },
      {
        locals: ['1', '3'],
        visitors: ['2', '4'],
        result: [1, 3],
      },
      {
        locals: ['1', '4'],
        visitors: ['3', '2'],
        result: [1, 3],
      },
    ],
  },
  {
    id: '2',
    division: '2',
    date: new Date('2015-02-15').getTime(),
    duration: '25:00',
    matches: [
      {
        locals: ['5', '6'],
        visitors: ['7', '8'],
        result: [1, 3],
      },
      {
        locals: ['5', '7'],
        visitors: ['6', '8'],
        result: [1, 3],
      },
      {
        locals: ['5', '8'],
        visitors: ['7', '6'],
        result: [1, 3],
      },
    ],
  },
  {
    id: '3',
    division: '3',
    date: new Date('2016-01-15').getTime(),
    duration: '25:00',
    matches: [
      {
        locals: ['1', '2'],
        visitors: ['3', '4'],
        result: [1, 3],
      },
      {
        locals: ['1', '3'],
        visitors: ['2', '4'],
        result: [1, 3],
      },
      {
        locals: ['1', '4'],
        visitors: ['3', '2'],
        result: [1, 3],
      },
    ],
  },
  {
    id: '4',
    division: '4',
    date: new Date('2016-02-15').getTime(),
    duration: '25:00',
    matches: [
      {
        locals: ['5', '6'],
        visitors: ['7', '8'],
        result: [1, 3],
      },
      {
        locals: ['5', '7'],
        visitors: ['6', '8'],
        result: [1, 3],
      },
      {
        locals: ['5', '8'],
        visitors: ['7', '6'],
        result: [1, 3],
      },
    ],
  },
  {
    id: '5',
    division: '5',
    date: new Date('2017-01-15').getTime(),
    duration: '25:00',
    matches: [
      {
        locals: ['1', '2'],
        visitors: ['3', '4'],
        result: [1, 3],
      },
      {
        locals: ['1', '3'],
        visitors: ['2', '4'],
        result: [1, 3],
      },
      {
        locals: ['1', '4'],
        visitors: ['3', '2'],
        result: [1, 3],
      },
    ],
  },
  {
    id: '6',
    division: '6',
    date: new Date('2017-02-15').getTime(),
    duration: '25:00',
    matches: [
      {
        locals: ['5', '6'],
        visitors: ['7', '8'],
        result: [1, 3],
      },
      {
        locals: ['5', '7'],
        visitors: ['6', '8'],
        result: [1, 3],
      },
      {
        locals: ['5', '8'],
        visitors: ['7', '6'],
        result: [1, 3],
      },
    ],
  },
  {
    id: '7',
    division: '7',
    date: new Date('2018-01-15').getTime(),
    duration: '25:00',
    matches: [
      {
        locals: ['1', '2'],
        visitors: ['3', '4'],
        result: [1, 3],
      },
      {
        locals: ['1', '3'],
        visitors: ['2', '4'],
        result: [1, 3],
      },
      {
        locals: ['1', '4'],
        visitors: ['3', '2'],
        result: [1, 3],
      },
    ],
  },
  {
    id: '8',
    division: '8',
    date: new Date('2018-02-15').getTime(),
    duration: '25:00',
    matches: [
      {
        locals: ['5', '6'],
        visitors: ['7', '8'],
        result: [1, 3],
      },
      {
        locals: ['5', '7'],
        visitors: ['6', '8'],
        result: [1, 3],
      },
      {
        locals: ['5', '8'],
        visitors: ['7', '6'],
        result: [1, 3],
      },
    ],
  },
  {
    id: '9',
    division: '9',
    date: new Date('2019-01-15').getTime(),
    duration: '25:00',
    matches: [
      {
        locals: ['1', '2'],
        visitors: ['3', '4'],
        result: [1, 3],
      },
      {
        locals: ['1', '3'],
        visitors: ['2', '4'],
        result: [1, 3],
      },
      {
        locals: ['1', '4'],
        visitors: ['3', '2'],
        result: [1, 3],
      },
    ],
  },
  {
    id: '10',
    division: '10',
    date: new Date('2019-02-15').getTime(),
    duration: '25:00',
    matches: [
      {
        locals: ['5', '6'],
        visitors: ['7', '8'],
        result: [1, 3],
      },
      {
        locals: ['5', '7'],
        visitors: ['6', '8'],
        result: [1, 3],
      },
      {
        locals: ['5', '8'],
        visitors: ['7', '6'],
        result: [1, 3],
      },
    ],
  },
];

export default matches;
