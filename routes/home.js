const express = require('express')
const router = express.Router()
const db = require('../models')
const Record = db.Record
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
    // Record.findAll({ userId: req.user._id })
    //     .sort({ date: '-1' })
    //     .lean()
    //     .exec((err, records) => {
    //         if (err) return console.error(err)

    //         // filter 類別或月份
    //         if (req.query.category !== undefined) {
    //             records = records.filter(record => {
    //                 return record.category === req.query.category
    //             })
    //         } else if (req.query.month !== undefined) {
    //             records = records.filter(record => {
    //                 return record.date.split('-')[1] === req.query.month
    //             })
    //         }

    //         let totalAmount = 0

    //         // set icon
    //         records.forEach(record => {
    //             totalAmount += record.amount

    //             switch (record.category) {
    //                 case 'daily-necessities':
    //                     record.icon = 'fas fa-home'
    //                     break;
    //                 case 'transportation':
    //                     record.icon = 'fas fa-shuttle-van'
    //                     break;
    //                 case 'entertainment':
    //                     record.icon = 'fas fa-grin-beam'
    //                     break;
    //                 case 'food':
    //                     record.icon = 'fas fa-utensils'
    //                     break;
    //                 case 'others':
    //                     record.icon = 'fas fa-pen'
    //                     break;
    //             }
    //         })

    //         return res.render('index', { records, totalAmount })
    //     })
    res.render('index')
})

module.exports = router