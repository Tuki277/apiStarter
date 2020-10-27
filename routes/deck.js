const express = require('express');
//const router = express.Router();
const deckController = require('../controllers/deck')
const router = require('express-promise-router')()

const { validateBody ,validateParams, schemas } = require('../helper/routerHelper')

router.route('/')
    .get(deckController.deck)
    .post( validateBody(schemas.newDeckSchema) ,deckController.newDeck)

router.route('/:deckID')
    .get(validateParams(schemas.idSchema, 'deckID'), deckController.getDeck)
    .put(validateParams(schemas.idSchema, 'deckID'), validateBody(schemas.newDeckSchema), deckController.replaceDeck)
    .patch(validateParams(schemas.idSchema, 'deckID'), validateBody(schemas.deckOptionalSchema), deckController.updateDeck)
    .delete(validateParams(schemas.idSchema, 'deckID'), deckController.deleteDeck)

module.exports = router;
