const express = require('express');
const router = express.Router();

const {
  registrarIncidencia,
  cambiarEstado,
  eliminarIncidencia,
  obtenerEstadisticas,
  obtenerClasificacion
} = require('../controllers/incidenciasController');

router.post('/', registrarIncidencia);

router.put('/:id/estado', cambiarEstado);

router.delete('/:id', eliminarIncidencia);

router.get('/estadisticas', obtenerEstadisticas);

router.get('/:id/clasificacion', obtenerClasificacion);

module.exports = router;