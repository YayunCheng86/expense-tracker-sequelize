const express = require('express')
const router = express.Router()
const db = require('../models')
const Record = db.Record
const User = db.User
const { authenticated } = require('../config/auth')
const sequelize = require('sequelize')
const Op = sequelize.Op

router.get('/', authenticated, (req, res) => {
    User.findByPk( req.user.id )
    .then(user => {
        if(!user) throw new Error('user not found')

        // filter 類別或月份
        if (req.query.category !== undefined) {
            return Record.findAll({
                raw: true,
                nest: true,
                where: { 
                    UserId: req.user.id,
                    category: { [Op.eq]: req.query.category }
                },
                order: [
                    ['date', 'DESC']
                ]
            })
        } else if (req.query.month !== undefined) {
            return Record.findAll({
                raw: true,
                nest: true,
                where: {
                    UserId: req.user.id,
                    date: sequelize.where(sequelize.fn('month', sequelize.col('date')), req.query.month)
                },
                order: [
                    ['date', 'DESC']
                ]
            })
        } else {
            return Record.findAll({
                raw: true,
                nest: true, 
                where: { UserId: req.user.id }, 
                order: [
                    ['date', 'DESC']
                ]
            })
        }
    })
    .then(records => {
        let totalAmount = 0
        
        // set icon and total amount
        records.forEach(record => {
            totalAmount += record.amount
            switch (record.category) {
                case 'daily-necessities':
                    record.icon = 'fas fa-home'
                    break;
                case 'transportation':
                    record.icon = 'fas fa-shuttle-van'
                    break;
                case 'entertainment':
                    record.icon = 'fas fa-grin-beam'
                    break;
                case 'food':
                    record.icon = 'fas fa-utensils'
                    break;
                case 'others':
                    record.icon = 'fas fa-pen'
                    break;
            }
        })

        return res.render('index', { records, totalAmount })
    })
    .catch(err => { return console.error(err) })
})

module.exports = router