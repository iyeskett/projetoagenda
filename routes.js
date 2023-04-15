const express = require('express');
const routes = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');

const { loginRequired } = require('./src/middlewares/middleware');

// Rotas da home
routes.get('/', homeController.index);

// Rotas de login
routes.get('/login', loginController.index);
routes.post('/login/register', loginController.register);
routes.post('/login/login', loginController.login);
routes.get('/login/logout', loginController.logout);

// Rotas de contato
routes.get('/contato', loginRequired, contatoController.index);
routes.get('/contato/:id', loginRequired, contatoController.editIndex);
routes.post('/contato/register', loginRequired, contatoController.register);
routes.post('/contato/edit/:id', loginRequired, contatoController.edit);
routes.get('/contato/delete/:id', loginRequired, contatoController.delete);

module.exports = routes;