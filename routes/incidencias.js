const express = require('express');
const router = express.Router();
const { registrarIncidencia } = require('../controllers/incidenciasController');

router.post('/', registrarIncidencia);

module.exports = router;