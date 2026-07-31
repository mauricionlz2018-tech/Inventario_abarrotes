const express = require('express');
const path = require('path');
const { sequelize, probarConexion } = require('./database');
require('./modelos/relaciones'); // importante para registrar las asociaciones

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'frontend', 'vistas'));

app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/productos', require('./rutas/productos'));
// app.use('/categorias', require('./rutas/categorias'));

app.get('/', (req, res) => {
  res.render('index', { titulo: 'Gestión de Inventario - Abarrotes' });
});

probarConexion()
  .then(() => sequelize.sync())
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
  })
  .catch(err => console.error(err));