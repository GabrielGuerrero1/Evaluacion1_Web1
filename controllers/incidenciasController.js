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

function cambiarEstado(req, res) {
  const id = Number(req.params.id);
  const { estado } = req.body;

  const incidencia = incidencias.find(incidencia => incidencia.id === id);

  if (!incidencia) {
    return res.status(404).json({ mensaje: "Incidencia no encontrada" });
  }

  switch (estado) {
    case "Pendiente":
    case "En Proceso":
    case "Resuelta":
    case "Cancelada":
      incidencia.estado = estado;

      return res.status(200).json({
        mensaje: "Estado actualizado correctamente",
        incidencia
      });

    default:
      return res.status(400).json({
        mensaje: "Estado inválido"
      });
  }
}

function eliminarIncidencia(req, res) {
  const id = Number(req.params.id);

  const indice = incidencias.findIndex(incidencia => incidencia.id === id);

  if (indice === -1) {
    return res.status(404).json({
      mensaje: "Incidencia no encontrada"
    });
  }

  incidencias.splice(indice, 1);

  return res.status(200).json({
    mensaje: "Incidencia eliminada correctamente"
  });
}

module.exports = {
  registrarIncidencia,
  cambiarEstado,
  eliminarIncidencia
};