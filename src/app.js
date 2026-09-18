const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const incidenciasRoutes = require('../routes/incidencias');

app.use('/incidencias', incidenciasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;