const express = require('express')
const router = express.Router()
const db = require('../models')
const Record = db.Record
const User = db.User
const { authenticated } = require('../config/auth')

// read all expenses page
router.get('/', authenticated, (req, res) => {
    return res.redirect('/')
})

// read the new page
router.get('/new', authenticated, (req, res) => {
    return res.render('new')
})

// post a new record
router.post('/new', authenticated, (req, res) => {
    const { name, date, category, amount, merchant } = req.body
    const UserId = req.user.id

    const record = new Record({
        name,
        merchant,
        date,
        category,
        amount,
        UserId
    })

    record.save()
    .then(user => { return res.redirect('/') })
    .catch((error) => { return res.status(422).send('錯誤！請回上一頁或輸入localhost:3000/回到首頁') })
})

// read the edit page
router.get('/:id/edit', authenticated, (req, res) => {
    User.findByPk(req.user.id)
    .then(user => {
        if(!user) throw new Error('user not found')
        return Record.findOne({
            raw: true,
            nest: true,
            where: {
                id: req.params.id,
                UserId: req.user.id
            }
        })
    })
    .then(record => {
        // remain select option
        const categories = ['daily-necessities', 'transportation', 'entertainment', 'food', 'others']
        categories.forEach(category => {
            if (record.category === category) {
                record[`select${category}`] = true
            }
        })

        return res.render('edit', { record })
    })
    .catch((error) => { return res.status(422).send('錯誤！請回上一頁或輸入localhost:3000/回到首頁') })
})

// edit an expense
router.put('/:id/edit', authenticated, (req, res) => {
    const { name, date, category, amount, merchant } = req.body
    Record.findOne({ 
        where: { 
            id: req.params.id, 
            UserId: req.user.id 
        }
    })
    .then(record => {
        record.name = name
        record.date = date
        record.category = category
        record.amount = amount
        record.merchant = merchant
        return record.save()
    })       
    .then(record => { return res.redirect('/') })
    .catch((error) => { return res.status(422).send('錯誤！請回上一頁或輸入localhost:3000/回到首頁') })
})

// delete an expense
router.delete('/:id/delete', authenticated, (req, res) => {
    User.findByPk(req.user.id)
    .then(user => {
        if(!user) throw new Error ('user not found')
        return Record.destroy({ 
            where: { 
                id: req.params.id, 
                UserId: req.user.id 
            } 
        })
    })
    .then(record => { return res.redirect('/') })
    .catch((error) => { return res.status(422).send('錯誤！請回上一頁或輸入localhost:3000/回到首頁') })    
})

module.exports = router

