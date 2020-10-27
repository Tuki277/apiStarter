const express = require('express');
// const router = express.Router();
const indexController = require('../controllers/index')
const router = require('express-promise-router')()

const { validateBody ,validateParams, schemas } = require('../helper/routerHelper')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.route('/users')
    .get(indexController.index)
    .post(validateBody(schemas.userSchema) ,indexController.newUser)

router.route('/users/:id')
    .get(validateParams(schemas.idSchema, 'id') ,indexController.getUser)
    .put(validateParams(schemas.idSchema, 'id'), validateBody(schemas.userSchema), indexController.replaceUser)
    .patch(validateParams(schemas.idSchema, 'id'), validateBody(schemas.userOption), indexController.updateUser)

router.route('/users/:id/decks')
    .get(validateParams(schemas.idSchema, 'id'), indexController.getUserDecks)
    .post(validateParams(schemas.idSchema, 'id'), validateBody(schemas.decksSchema), indexController.newUserDeck)

module.exports = router;
