const gameBoard = () => {
  const fleet = [];
  const hits = [];
  const misses = [];

  const shipMatch = (coor) => {
    let match = [];
    for (let index = 0; index < fleet.length; index += 1) {
      const member = fleet[index];
      for (let i = 0; i < member.ship.length; i += 1) {
        if (member.pos.rotate && coor[0] === member.pos.x
            && coor[1] === member.pos.y + i) {
          match = [index, i];
        } else if (!member.pos.rotate && coor[0] === member.pos.x + i
            && coor[1] === member.pos.y) {
          match = [index, i];
        }
      }
    }
    return match;
  };
  const place = (coor, ship, rotate = false) => {
    if (coor[0] > 9 || coor[0] < 0 || coor[1] > 9 || coor[1] < 0) {
      return false;
    }
    if ((!rotate && coor[0] + ship.length - 1 > 9)
        || (rotate && coor[1] + ship.length - 1 > 9)) {
      return false;
    }
    if (shipMatch(coor).length === 0) {
      const newFleetMem = {};
      newFleetMem.pos = {
        x: coor[0],
        y: coor[1],
        rotate,
      };
      newFleetMem.ship = ship;
      fleet.push(newFleetMem);
      return true;
    }
    return false;
  };
  const receiveAttack = (coor) => {
    const strike = shipMatch(coor);
    if (strike.length !== 0) {
      const shipId = strike[0];
      const hitBox = strike[1];
      fleet[shipId].ship.hit(hitBox);
      hits.push(coor);
    } else {
      misses.push(coor);
    }
    return true;
  };
  const sunkFleet = () => fleet.every(member => member.ship.isSunk() === true);
  return {
    fleet, hits, misses, place, receiveAttack, sunkFleet,
  };
};

module.exports = gameBoard;
