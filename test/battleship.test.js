const battleShip = require('.././src/battleShip');
const gameBoard = require('.././src/gameBoard');

test('has two players', () => {
  const game = battleShip(['player', 'computer']);
  expect(game.players.length).toEqual(2);
});

test('has two boards', () => {
  const players = ['player', 'computer'];
  const gameBoards = ['board 1', 'board 2'];
  const game = battleShip(players, gameBoards);
  expect(game.gameBoards.length).toEqual(2);
});

test('places player fleet', () => {
  const players = ['player', 'computer'];
  const gameBoards = [gameBoard(), gameBoard()];
  const game = battleShip(players, gameBoards);
  game.initPlayerBoard();
  expect(game.gameBoards[0].fleet[0].pos).toEqual({ x: 0, y: 0, rotate: false });
  expect(game.gameBoards[0].fleet[1].pos).toEqual({ x: 6, y: 0, rotate: false });
  expect(game.gameBoards[0].fleet[2].pos).toEqual({ x: 0, y: 9, rotate: false });
  expect(game.gameBoards[0].fleet[3].pos).toEqual({ x: 0, y: 2, rotate: true });
  expect(game.gameBoards[0].fleet[4].pos).toEqual({ x: 4, y: 3, rotate: true });
});

test('places player fleet with custom coordinates', () => {
  const players = ['player', 'computer'];
  const gameBoards = [gameBoard(), gameBoard()];
  const game = battleShip(players, gameBoards);
  const fleetPos = [
    { coor: [9, 0], rotate: true },
    { coor: [7, 3], rotate: false },
    { coor: [6, 5], rotate: true },
    { coor: [4, 3], rotate: true },
    { coor: [1, 1], rotate: false }
  ];
  game.initPlayerBoard(fleetPos);
  expect(game.gameBoards[0].fleet[0].pos).toEqual({ x: 9, y: 0, rotate: true });
  expect(game.gameBoards[0].fleet[1].pos).toEqual({ x: 7, y: 3, rotate: false });
  expect(game.gameBoards[0].fleet[2].pos).toEqual({ x: 6, y: 5, rotate: true });
  expect(game.gameBoards[0].fleet[3].pos).toEqual({ x: 4, y: 3, rotate: true });
  expect(game.gameBoards[0].fleet[4].pos).toEqual({ x: 1, y: 1, rotate: false });
});

test(('places comp fleet'), () => {
  const players = ['player', 'computer'];
  const gameBoards = [gameBoard(), gameBoard()];
  const game = battleShip(players, gameBoards);
  game.initCompBoard();
  expect(game.gameBoards[1].fleet.length).toEqual(5);
});

test('can tell if a game is ongoing', () => {
  const players = ['player', 'computer'];
  const gameBoards = [gameBoard(), gameBoard()];
  const game = battleShip(players, gameBoards);
  game.initPlayerBoard();
  game.initCompBoard();
  expect(game.gameOver()).toBeFalsy();
});

test('determine a winner', () => {
  const players = [{ name: 'player' }, { name: 'computer' }];
  const gameBoards = [gameBoard(), gameBoard()];
  const game = battleShip(players, gameBoards);
  game.initPlayerBoard();
  game.initCompBoard();
  game.gameBoards[0].receiveAttack([0, 0]);
  game.gameBoards[0].receiveAttack([1, 0]);
  game.gameBoards[0].receiveAttack([6, 0]);
  game.gameBoards[0].receiveAttack([7, 0]);
  game.gameBoards[0].receiveAttack([8, 0]);
  game.gameBoards[0].receiveAttack([0, 9]);
  game.gameBoards[0].receiveAttack([1, 9]);
  game.gameBoards[0].receiveAttack([2, 9]);
  game.gameBoards[0].receiveAttack([0, 2]);
  game.gameBoards[0].receiveAttack([0, 3]);
  game.gameBoards[0].receiveAttack([0, 4]);
  game.gameBoards[0].receiveAttack([0, 5]);
  game.gameBoards[0].receiveAttack([4, 3]);
  game.gameBoards[0].receiveAttack([4, 4]);
  game.gameBoards[0].receiveAttack([4, 5]);
  game.gameBoards[0].receiveAttack([4, 6]);
  game.gameBoards[0].receiveAttack([4, 7]);
  expect(game.gameOver()).toBeTruthy();
  expect(game.winner()).toBe('computer');
});
