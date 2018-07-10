const ship = require('../src/ship');

test('creates ship objects with name and length', () => {
  const testShip = ship('test ship 1', 4);
  expect(testShip.name).toEqual('test ship 1');
  expect(testShip.length).toEqual(4);
});

test('ship can be hit at a specific spot', () => {
  const testShip = ship('test ship 2', 3);
  expect(testShip.hit(2)).toBeTruthy();
});

test('ship cannot be hit at the same spot', () => {
  const testShip = ship('test ship 3', 3);
  testShip.hit(1);
  expect(testShip.hit(1)).toBeFalsy();
});

test('ship cannot be hit at a spot it does not have', () => {
  const testShip = ship('test ship 4', 3);
  expect(testShip.hit(5)).toBeFalsy();
});

test('ship can be sunk if every hitbox is hit', () => {
  const testShip = ship('test ship 5', 2);
  testShip.hit(0);
  testShip.hit(1);
  expect(testShip.isSunk()).toBeTruthy();
});

test('ship cannot be sunk if some hitboxes are hit', () => {
  const testShip = ship('test ship 6', 3);
  testShip.hit(0);
  testShip.hit(1);
  expect(testShip.isSunk()).toBeFalsy();
});
