function updatePosition(pos) {
  return pos + Math.random().toString(36).slice(-1);
}

function newPosition(prevTodoPosition, nextTodoPosition) {
  if (prevTodoPosition) {
    let newPos = updatePosition(prevTodoPosition);
    if (!nextTodoPosition || newPos < nextTodoPosition) {
      return newPos;
    }
    do {
      newPos = updatePosition(prevTodoPosition);
    } while (newPos > nextTodoPosition);
    return newPos;
  };
  if (!prevTodoPosition) {
    return nextTodoPosition.slice(0, nextTodoPosition.length - 1);
  }
}

module.exports = { newPosition };
