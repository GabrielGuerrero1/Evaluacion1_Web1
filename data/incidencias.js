const incidencias = [];
let nextId = 1;

function getNextId() {
  return nextId++;
}

module.exports = { incidencias, getNextId };