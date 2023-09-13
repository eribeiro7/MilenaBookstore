const express = require('express');
const router = express.Router();

const UserController = require('./src/controllers/UserController');
const CountryController = require('./src/controllers/CountryController');
const AuthorController = require('./src/controllers/AuthorController');
const BookController = require('./src/controllers/BookController');

//Rotas para os users
router.get('/users', UserController.all);
router.get('/user/:id', UserController.find);
//router.get('/user/:id',UserController.checkToken, UserController.find);
router.post('/user', UserController.store);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.destroy);
router.post('/findByUsername', UserController.findByUsername);
router.post('/auth/login', UserController.login);

//Rotas para os países
router.get('/countries', CountryController.all);
router.get('/country/:id', CountryController.find);
router.post('/country', CountryController.store);
router.put('/country/:id', CountryController.update);
router.delete('/country/:id', CountryController.destroy);

//Rotas para os autores
router.get('/authors', AuthorController.all);
router.get('/author/:id', AuthorController.find);
router.post('/author', AuthorController.store);
router.put('/author/:id', AuthorController.update);
router.delete('/author/:id', AuthorController.destroy);

//Rotas para os autores
router.get('/books', BookController.all);
router.get('/book/:id', BookController.find);
router.post('/book', BookController.store);
router.put('/book/:id', BookController.update);
router.delete('/book/:id', BookController.destroy);

module.exports = router;