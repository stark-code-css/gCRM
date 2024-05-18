const express = require('express')
const router = express.Router()
const { createConsumer, findAllConsumers, findByConsumerId, findByName, updateConsumer, deleteConsumer, findByAadhaar, consumerCount, findByVillage } = require('../controller/consumer.controller')
const jwt = require('jsonwebtoken')

router.use((req, res, next) => {
    const token = req.headers['auth-token']
    if (!token) {
        return res.status(403).send({ message: 'A token is required for authentication' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
    } catch (err) {
        return res.status(401).send({ message: 'Invalid Token' })
    }
    next()
})

router.post('/consumer/create', createConsumer)
router.get('/consumer/all', findAllConsumers)
router.get('/consumer/:consumer_id', findByConsumerId)
router.put('/consumer/:consumer_id', updateConsumer)
router.delete('/consumer/:consumer_id', deleteConsumer)
router.get('/consumer/name/:consumer_name', findByName)
router.get('/consumer/aadhar/:consumer_aadhar', findByAadhaar)
router.get('/consumer', consumerCount)
router.get('/consumer/address/:village', findByVillage)

module.exports = router