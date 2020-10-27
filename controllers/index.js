const { NotExtended } = require('http-errors')
const User = require('../models/index')
const { use } = require('../routes/users')
const Deck = require('../models/deck')
const Joi = require('@hapi/joi')

const newUser = async (req, res, next) => {
    const newUser = new User(req.value.body)
    await newUser.save()
    return res.status(201).json({user : newUser})
}

const index = async (req, res, next) => {
    const users = await User.find({})
    //throw new Error('test error')
    return res.status(200).json({users})
}

const getUser = async (req, res, next) => {
    // console.log('req param', req.params)
    const { id } = req.params

    const user = await User.findById(id)
    // console.log('user info', user)

    return res.status(200).json({user})
}

const replaceUser = async (req, res, next) => {
    // enforce new user to old user
    const { id } = req.value.params

    const newUser = req.value.body

    const result = await User.findByIdAndUpdate(id, newUser)

    return res.status(200).json({success : true})
}

const updateUser = async (req, res, next) => {
    // number of fields
    const { id } = req.value.params

    const newUser = req.value.body

    const result = await User.findByIdAndUpdate(id, newUser)

    return res.status(200).json({success : true})

}

const getUserDecks = async (req, res, next) => {
    const { id } = req.value.params

    //get user
    //populate co tac dung giong voi join, kia la  (" truong muon join ")
    const user = await User.findById(id).populate('decks')
    console.log('user ', user.decks)

    res.status(200).json({decks: user.decks})
}

const newUserDeck = async (req, res, next) => {
    const { id } = req.value.params

    // Create a new deck
    const newDeck = new Deck(req.value.body)

    // Get user
    const user = await User.findById(id)

    // Assign user as a deck's owner
    newDeck.owner = user

    // Save the deck
    await newDeck.save()

    // Add deck to user's decks array 'decks'
    user.decks.push(newDeck._id)

    // Save the user
    await user.save()

    res.status(201).json({deck: newDeck})
}

module.exports = {
    index,
    newUser,
    getUser,
    replaceUser,
    updateUser,
    getUserDecks,
    newUserDeck
}