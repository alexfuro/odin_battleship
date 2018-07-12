const domControl = (() => {
  const createLegend = (className) => {
    const ulist = document.createElement('ul');
    ulist.classList.add(className);
    for (let i = 0; i < 10; i += 1) {
      const elem = document.createElement('li');
      elem.innerHTML = i;
      ulist.appendChild(elem);
    }
    return ulist;
  };
  const createGrid = (context) => {
    const grid = document.createElement('div');
    grid.classList.add(context);
    grid.id = `${context}Board`;
    for (let i = 0; i < 100; i += 1) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.id = `${context}-${i}`;
      if (context === 'shipSelect') {
        square.innerHTML = i;
      }
      grid.appendChild(square);
    }
    return grid;
  };
  const renderBoards = (players) => {
    const container = document.getElementById('container');
    players.forEach((player) => {
      const domBoard = createGrid(player.name);
      container.appendChild(domBoard);
    });
    return true;
  };
  const renderFleet = (context, fleet) => {
    const board = document.getElementById(`${context}Board`);
    fleet.forEach((member) => {
      for (let i = 0; i < member.ship.length; i += 1) {
        let posId;
        if (member.pos.rotate) {
          posId = member.pos.x * 10 + member.pos.y + i;
        } else {
          posId = member.pos.x * 10 + (10 * i) + member.pos.y;
        }
        board.childNodes[posId].classList.add('ship');
      }
    });
    return true;
  };
  const renderMoves = (context, gameBoard) => {
    const board = document.getElementById(`${context}Board`);
    gameBoard.hits.forEach((hit) => {
      const hitPos = hit[0] * 10 + hit[1];
      board.childNodes[hitPos].classList.add('hit');
    });
    gameBoard.misses.forEach((miss) => {
      const missPos = miss[0] * 10 + miss[1];
      board.childNodes[missPos].classList.add('miss');
    });
    return true;
  };
  const showShipPlacer = () => {
    const shipPlacement = document.getElementById('shipPlacement');
    const grid = createGrid('shipSelect');
    shipPlacement.appendChild(grid);
  };
  const hideSetup = () => {
    const shipPlacement = document.getElementById('shipPlacement');
    shipPlacement.classList.add('hide');
  };
  const getShipPlacements = () => {
    const shipsPos = document.querySelectorAll('.shipInput');
    const rotations = document.querySelectorAll('.shipRotate');
    const placements = [];
    for (let i = 0; i < shipsPos.length; i += 1) {
      const x = Math.floor(shipsPos[i].value / 10);
      const y = Math.floor(shipsPos[i].value % 10);
      const rotated =  rotations[i].checked
      const shipPlace = { coor: [x, y],  rotate: rotated };
      placements.push(shipPlace);
    }
    return placements;
  };
  const showWinner = (winner) => {
    const container = document.getElementById('container');
    const modal = document.createElement('div');
    const msg = document.createElement('p');
    msg.innerHTML = `${winner} won!`;
    modal.appendChild(msg);
    container.appendChild(modal);
  };
  const showShipError = () => {
    const shipPlacement = document.getElementById('shipPlacement');
    const prevMsg = document.getElementById('invalidPlacement');
    if (prevMsg === null) {
      const errorMsg = document.createElement('p');
      errorMsg.id = 'invalidPlacement';
      errorMsg.innerHTML = 'Error those ship coordinates are valid. Try again.';
      shipPlacement.appendChild(errorMsg);
    }
  };
  return {
    renderBoards,
    renderFleet,
    renderMoves,
    showWinner,
    showShipPlacer,
    getShipPlacements,
    hideSetup,
    showShipError,
  };
})();

module.exports = domControl;
