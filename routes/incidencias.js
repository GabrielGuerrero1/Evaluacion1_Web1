const express = require('express');
const router = express.Router();
const {
  registrarIncidencia,
  cambiarEstado,
  eliminarIncidencia
} = require('../controllers/incidenciasController');

router.post('/', registrarIncidencia);

router.put('/:id/estado', cambiarEstado);

router.delete('/:id', eliminarIncidencia);

module.exports = router;