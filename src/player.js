const player = (name) => {
  const moves = [];
  const attack = (coor) => {
    if (moves.some(move => move[0] === coor[0]
        && move[1] === coor[1])) {
      return false;
    }
    if (coor[0] >= 0 && coor[0] <= 9 && coor[1] >= 0 && coor[1] <= 9) {
      moves.push(coor);
      return coor;
    }
    return false;
  };
  const randomMove = () => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return attack([x, y]);
  };
  return { name, attack, randomMove };
};

module.exports = player;
