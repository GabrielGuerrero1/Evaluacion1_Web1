const express = require('express');
const router = express.Router();

const {
  registrarIncidencia,
  listarIncidencias,
  buscarIncidencias,
  cambiarEstado,
  eliminarIncidencia,
  obtenerEstadisticas,
  obtenerClasificacion
} = require('../controllers/incidenciasController');

router.get('/', listarIncidencias);

router.get('/estadisticas', obtenerEstadisticas);

router.get('/:id/clasificacion', obtenerClasificacion);

router.get('/:id', buscarIncidencias);

router.post('/', registrarIncidencia);

router.get('/incidencias', listarIncidencias)

router.get('/incidencias/:id', buscarIncidencias);

router.put('.incidencias/:id/estado', cambiarEstado);

router.delete('.incidencias/:id', eliminarIncidencia);

module.exports = router;