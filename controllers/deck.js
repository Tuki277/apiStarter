const { NotExtended } = require('http-errors')
const User = require('../models/index')
const { use } = require('../routes/users')
const Deck = require('../models/deck')
const Joi = require('@hapi/joi')

const getDeck = async (req, res, next) => {
    const deck = await Deck.findById(req.value.params.deckID)

    return res.status(200).json({deck})
}

const newDeck = async (req, res, next) => {
    // Find owner
    const owner = await User.findById(req.value.body.owner)

    // Create a new deck
    const deck = req.value.body
    delete deck.owner

    deck.owner = owner._id
    const newDeck = new Deck(deck)
    await newDeck.save()

    console.log('owner ', owner)

    // add newly created deck to the actual decks
    owner.decks.push(newDeck._id)
    await owner.save()

    return res.status(201).json({deck: newDeck})
}

const deck = async (req, res, next) => {
    const decks = await Deck.find({})
    return res.status(200).json({decks})
}

const replaceDeck = async (req, res, next) => {
    const { deckID } = req.value.params
    const newDeck = req.value.body
    const result = await Deck.findByIdAndUpdate(deckID, newDeck)
    return res.status(200).json({success: true})
}

const deleteDeck = async (req, res, next) => {
    const { deckID } = req.value.params

    // Get a deck
    const deck = await Deck.findById(deckID)
    const ownerID = deck.owner

    // Get a owner
    const owner = await User.findById(ownerID)

    // Remove the deck
    await deck.remove()

    // Remove deck from owner's decks list
    owner.decks.pull(deck)
    await owner.save()

    return res.status(200).json({ success: true })
} 

const updateDeck = async (req, res, next) => {
    const { deckID } = req.value.params
    const newDeck = req.value.body
    const result = await Deck.findByIdAndUpdate(deckID, newDeck)
    return res.status(200).json({success: true})
}

module.exports = {
    deck,
    newDeck,
    getDeck,
    replaceDeck,
    deleteDeck,
    updateDeck
}