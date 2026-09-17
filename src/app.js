const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const incidenciasRoutes = require('../routes/incidencias');
const { getNextId } = require('../data/incidencias');
app.use('/incidencias', incidenciasRoutes);

app.get('/api/incidencias/:id' , (req, res) =>{
  const id = Number(req.params.id);

  if(Number.isNaN(id) ){
    return res.status(400).json({mensaje: 'el id tiene que ser exclusivamente un numero'})
  }

  const incidencia = incidenciasRoutes.find((i) => i.id === id)

  if (!incidencia){
    return res.status(404).json({mensaje: 'Incidencia no encontrada'})
  };

  return res.status(200).json(incidencia);
  
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;