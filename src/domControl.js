const domControl = (() => {
  const createGrid = (context) => {
    const grid = document.createElement('div');
    grid.classList.add(context);
    grid.id = `${context}Board`;
    for (let i = 0; i < 100; i += 1) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.id = `${context}-${i}`;
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
  return { renderBoards, renderFleet, renderMoves };
})();

module.exports = domControl;
