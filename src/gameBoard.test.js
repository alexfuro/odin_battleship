const gameBoard = require('./gameBoard');
const ship = require('./ship');

test('has a fleet', () => {
  const newBoard = gameBoard();
  const testShip = ship('test 1', 3);
  expect(newBoard.fleet).toBeTruthy();
});

test('can place a ship given a set of coordinates', () => {
  const newBoard = gameBoard();
  const testShip = ship('test 1', 3);
  expect(newBoard.place([0, 0], testShip)).toBeTruthy();
});

test('cannot place a ship outside board with invalid coordinates', () => {
  const newBoard = gameBoard();
  const testShip = ship('test 2', 3);
  expect(newBoard.place([2, 10], testShip)).toBeFalsy();
});

test('cannot place a ship outside board vertically', () => {
  const newBoard = gameBoard();
  const testShip = ship('test 3', 3);
  expect(newBoard.place([8, 0], testShip)).toBeFalsy();
});

test('can place a ship sideways on board', () => {
  const newBoard = gameBoard();
  const testShip = ship('test 4', 3);
  const rotate = true;
  expect(newBoard.place([8, 0], testShip, rotate)).toBeTruthy();
});

test('cannot place a ship outside board horizontally', () => {
  const newBoard = gameBoard();
  const testShip = ship('test 5', 3);
  const rotate = true;
  expect(newBoard.place([8, 8], testShip, rotate)).toBeFalsy();
});

test('cannot place a ship on top of another', () => {
  const newBoard = gameBoard();
  const testShip1 = ship('test 6', 3);
  expect(newBoard.place([0, 0], testShip1)).toBeTruthy();
  const testShip2 = ship('test 7', 2);
  expect(newBoard.place([1, 0], testShip2)).toBeFalsy();
});

test('can receive attack coordinates and attack a ship', () => {
  const newBoard = gameBoard();
  const testShip = ship('test 8', 3);
  newBoard.place([0, 0], testShip);
  expect(newBoard.receiveAttack([1, 0])).toBeTruthy();
});
test('can record missed attacks', () => {
  const newBoard = gameBoard();
  const testShip = ship('test 9', 3);
  newBoard.place([0, 0], testShip);
  newBoard.receiveAttack([6, 0]);
  expect(newBoard.misses).toEqual([[6, 0]]);
});

test('can determine if a fleet has sunk', () => {
  const newBoard = gameBoard();
  const testShip1 = ship('test 10', 3);
  newBoard.place([0, 0], testShip1);
  const testShip2 = ship('test 11', 2);
  newBoard.place([0, 1], testShip2, true);
  //attack ships until sunk
  newBoard.receiveAttack([0, 0]);
  newBoard.receiveAttack([1, 0]);
  newBoard.receiveAttack([2, 0]);
  newBoard.receiveAttack([0, 1]);
  newBoard.receiveAttack([1, 1]);
  expect(newBoard.sunkFleet()).toBeTruthy();
});
