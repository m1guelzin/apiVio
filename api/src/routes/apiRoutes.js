const router = require('express').Router()

const userController = require("../controllers/userController")
const orgController = require("../controllers/orgController");
const eventoController = require('../controllers/eventoController');

//Rotas userController
router.post('/user', userController.createUser);
//router.post('user/login', userController.postLogin);
router.get('/user', userController.getAllUsers);
//router.get('/user/:cpf', userController.getxUserById); 
router.put('/user', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

//Rotas orgController
router.post('/organizador', orgController.createOrganizador);
router.get('/organizador', orgController.getAllOrganizadores);
router.put('/organizador', orgController.updateOrganizador);
router.delete('/organizador/:id', orgController.deleteOrganizador);

//Rotas eventoController
router.post('/evento', eventoController.createEvento);
router.get('/evento', eventoController.getAllEventos);
router.put('/evento', eventoController.updateEvento);
router.delete('/evento/:id', eventoController.deleteEvento);

module.exports = router