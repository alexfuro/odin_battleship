const ship = (name, length) => {
  const hitboxes = new Array(length).fill(false, 0);

  const hit = (pos) => {
    if (hitboxes[pos] === false) {
      hitboxes[pos] = true;
      return true;
    }
    return false;
  };
  const isSunk = () => {
    if (hitboxes.every(box => box === true)) {
      return true;
    }
    return false;
  };
  return {
    name, length, hit, isSunk,
  };
};

module.exports = ship;
