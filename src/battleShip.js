const ship = require('./ship');
const gameBoard = require('./gameBoard');
const player = require('./player');
const domControl = require('./domControl');

const battleShip = () => {
  const players = [player('playerOne'), player('playerTwo')];
  const gameBoards = [gameBoard(), gameBoard()];
  const makeFleet = () => {
    const destroyer = ship('destroyer', 2);
    const sub = ship('submarine', 3);
    const cruiser = ship('cruiser', 3);
    const battle = ship('battleship', 4);
    const carrier = ship('carrier', 5);
    return [destroyer, sub, cruiser, battle, carrier];
  };
  const initPlayerBoard = (customPos = []) => {
    const fleet = makeFleet();
    const fleetPos = customPos;
    if (fleetPos.length === 0) {
      fleetPos.push({ coor: [0, 0], rotate: false });
      fleetPos.push({ coor: [6, 0], rotate: false });
      fleetPos.push({ coor: [0, 9], rotate: false });
      fleetPos.push({ coor: [0, 2], rotate: true });
      fleetPos.push({ coor: [4, 3], rotate: true });
    }
    for (let i = 0; i < fleet.length; i += 1) {
      gameBoards[0].place(fleetPos[i].coor, fleet[i], fleetPos[i].rotate);
    }
  };
  const randomPlacement = () => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    const sideWays = Math.floor(Math.random() * 2);
    if (sideWays === 0) {
      return { coor: [x, y], rotate: false };
    }
    return { coor: [x, y], rotate: true };
  };
  const initCompBoard = () => {
    const fleet = makeFleet();
    let shipPos;
    let placed;
    for (let i = 0; i < fleet.length; i += 1) {
      do {
        shipPos = randomPlacement();
        placed = gameBoards[1].place(shipPos.coor, fleet[i], shipPos.rotate);
      } while (!placed);
    }
  };
  const gameOver = () => {
    if (gameBoards[0].sunkFleet() || gameBoards[1].sunkFleet()) {
      return true;
    }
    return false;
  };
  const winner = () => {
    if (gameBoards[0].sunkFleet()) {
      return players[1].name;
    }
    if (gameBoards[1].sunkFleet()) {
      return players[0].name;
    }
    return false;
  };
  return {
    players, gameBoards, initPlayerBoard, initCompBoard, gameOver, winner,
  };
};

module.exports = battleShip;
