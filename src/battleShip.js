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
  const getPlayerAttack = (event) => {
    const attackSquare = parseInt(event.target.id.match(/[0-9]{1,}/), 10);
    const attackX = Math.floor(attackSquare / 10);
    const attackY = attackSquare % 10;
    return [attackX, attackY];
  };
  const attackListener = () => {
    const enemyBoard = document.getElementById(`${players[1].name}Board`);
    enemyBoard.onclick = (event) => {
      const playerAttack = getPlayerAttack(event);
      const validAttack = players[0].attack(playerAttack);
      if (validAttack && !gameOver()) {
        gameBoards[1].receiveAttack(validAttack);
        domControl.renderMoves(players[1].name, gameBoards[1]);
        let compMove;
        do {
          compMove = players[1].randomMove();
        } while (!compMove);
        gameBoards[0].receiveAttack(compMove);
        domControl.renderMoves(players[0].name, gameBoards[0]);
        if (gameOver()) {
          const winnerName = winner();
          domControl.showWinner(winnerName);
        }
      }
      return true;
    };
  };
  const play = () => {
    const placeShipBtn = document.getElementById('placeShipsBtn');
    let customPos;
    domControl.showShipPlacer();
    placeShipBtn.onclick = (event) => {
      event.preventDefault();
      customPos = domControl.getShipPlacements()
      domControl.hideSetup();
      initPlayerBoard(customPos);
      initCompBoard();
      domControl.renderBoards(players);
      domControl.renderFleet(players[0].name, gameBoards[0].fleet);
      attackListener();
    };
  };
  return {
    players, gameBoards, initPlayerBoard, initCompBoard, gameOver, winner, play
  };
};

module.exports = battleShip;
