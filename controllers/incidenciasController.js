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

function listarIncidencias(req, res) {
  return res.status(200).json(incidencias);
}

function buscarIncidencias(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ mensaje: "El id debe ser un número" });
  }

  const incidencia = incidencias.find(i => i.id === id);

  if (!incidencia) {
    return res.status(404).json({ mensaje: "Incidencia no encontrada" });
  }

  return res.status(200).json(incidencia);
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
      return res.status(400).json({ mensaje: "Estado inválido" });
  }
}

function eliminarIncidencia(req, res) {
  const id = Number(req.params.id);

  const indice = incidencias.findIndex(incidencia => incidencia.id === id);

  if (indice === -1) {
    return res.status(404).json({ mensaje: "Incidencia no encontrada" });
  }

  incidencias.splice(indice, 1);

  return res.status(200).json({ mensaje: "Incidencia eliminada correctamente" });
}

function obtenerEstadisticas(req, res) {
  const estadisticas = incidencias.reduce(
    (acc, incidencia) => {
      acc.totalIncidencias++;

      switch (incidencia.estado) {
        case "Pendiente":
          acc.pendientes++;
          break;
        case "En Proceso":
          acc.enProceso++;
          break;
        case "Resuelta":
          acc.resueltas++;
          break;
        case "Cancelada":
          acc.canceladas++;
          break;
        default:
          break;
      }

      return acc;
    },
    {
      totalIncidencias: 0,
      pendientes: 0,
      enProceso: 0,
      resueltas: 0,
      canceladas: 0
    }
  );

  return res.status(200).json(estadisticas);
}

function obtenerClasificacion(req, res) {
  const id = Number(req.params.id);

  const incidencia = incidencias.find(inc => inc.id === id);

  if (!incidencia) {
    return res.status(404).json({ mensaje: "Incidencia no encontrada" });
  }

  let clasificacion;

  switch (incidencia.prioridad) {
    case "Alta":
      clasificacion = "Crítica";
      break;
    case "Media":
      clasificacion = "Importante";
      break;
    case "Baja":
      clasificacion = "Normal";
      break;
    default:
      clasificacion = "No definida";
  }

  return res.status(200).json({
    id: incidencia.id,
    "clasificación": clasificacion
  });
}

module.exports = {
  registrarIncidencia,
  listarIncidencias,
  buscarIncidencias,
  cambiarEstado,
  eliminarIncidencia,
  obtenerEstadisticas,
  obtenerClasificacion
};