require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const path = require('path');
const { probarConexion } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'frontend', 'vistas'));

app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/productos', require('./rutas/productos'));
// app.use('/categorias', require('./rutas/categorias'));

// Ruta raíz
app.get('/', (req, res) => {
  res.render('index', { titulo: 'Gestión de Inventario - Abarrotes' });
});

// Arranque
probarConexion()
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
  })
  .catch(err => console.error(err));