const express = require('express');
const router = express.Router();

const {
  registrarIncidencia,
  listarIncidencia,
  buscarIncidencia,
  cambiarEstado,
  eliminarIncidencia,
  obtenerEstadisticas,
  obtenerClasificacion
} = require('../controllers/incidenciasController');

router.post('/incidencias', registrarIncidencia);

router.get('/incidencias', listarIncidencia)

router.get('/incidencias/:id', buscarIncidencia);

router.put('.incidencias/:id/estado', cambiarEstado);

router.delete('.incidencias/:id', eliminarIncidencia);

router.get('/estadisticas', obtenerEstadisticas);

router.get('/incidencias/:id/clasificacion', obtenerClasificacion);


module.exports = router;