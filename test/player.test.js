const player = require('../src/player');

test('players can have a name', () => {
  const player1 = player('player 1');
  expect(player1.name).toEqual('player 1');
});

test('players can make a atttack', () => {
  const player1 = player('p1');
  expect(player1.attack([1, 2])).toBeTruthy();
});

test('players cannot make an invalid move', () => {
  const player1 = player('p1');
  expect(player1.attack([-1, 2])).toBeFalsy();
});

test('players cannot make the same attack more than once', () => {
  const player1 = player('p1');
  expect(player1.attack([1, 2])).toBeTruthy();
  expect(player1.attack([1, 2])).toBeFalsy();
});

test('player can generate a valid random attack', () => {
  const player2 = player('computer');
  expect(player2.randomMove()).toBeTruthy();
})
