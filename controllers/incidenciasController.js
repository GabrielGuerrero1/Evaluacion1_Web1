const { incidencias, getNextId } = require('../data/incidencias');

function registrarIncidencia(req, res) {
  const { empleado, area, descripcion, prioridad } = req.body;

  if (!empleado || !area || !descripcion || !prioridad) {
    return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
  }

  if (
    empleado.trim() === "" ||
    area.trim() === "" ||
    descripcion.trim() === "" ||
    prioridad.trim() === ""
  ) {
    return res.status(400).json({ mensaje: "No se permiten campos vacíos" });
  }

  const prioridadesValidas = ["Alta", "Media", "Baja"];
  if (!prioridadesValidas.includes(prioridad)) {
    return res.status(400).json({ mensaje: "Prioridad inválida. Debe ser Alta, Media o Baja" });
  }

  const nuevaIncidencia = {
    id: getNextId(),
    empleado: empleado.trim(),
    area: area.trim(),
    descripcion: descripcion.trim(),
    prioridad,
    estado: "Pendiente"
  };

  incidencias.push(nuevaIncidencia);

  return res.status(201).json({ mensaje: "Incidencia registrada correctamente" });
}

module.exports = { registrarIncidencia };