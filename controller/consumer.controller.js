const Consumer = require('../models/consumer.model');

// Create and Save a new Consumer
const createConsumer = (req, res) => {

    // Create a Consumer
    const consumer = new Consumer({
        consumer_id: req.body.consumer_id,
        consumer_name: req.body.consumer_name,
        consumer_husband_name: req.body.consumer_husband_name,
        consumer_address: req.body.consumer_address,
        consumer_aadhar: req.body.consumer_aadhar,
        consumer_phone: req.body.consumer_phone,
        isDistributed: req.body.isDistributed
    });

    // Save Consumer in the database
    consumer.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Consumer."
            });
        });
}

const findAllConsumers = (req, res) => {
    Consumer.find()
        .then(consumers => {
            res.send(consumers);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving consumers."
            });
        });
}

const consumerCount = async (req, res) => {
    try{
        const total = await Consumer.countDocuments()
        const done = await Consumer.countDocuments({ isDistributed: true })
        const pending = await Consumer.countDocuments({ isDistributed: false })
        res.send({ total, done, pending })
    }
    catch(err){
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving consumers."
        });
    }
}

const findByConsumerId = (req, res) => {
    Consumer.find({ consumer_id: req.params.consumer_id })
        .then(consumer => {
            if (!consumer) {
                return res.status(404).send({
                    message: "Consumer not found with id " + req.params.consumer_id
                });
            }
            res.send(consumer);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Consumer not found with id " + req.params.consumer_id
                });
            }
            return res.status(500).send({
                message: "Error retrieving consumer with id " + req.params.consumer_id
            });
        });
}

const findByName = (req, res) => {
    Consumer.find({ consumer_name: req.params.consumer_name })
        .then(consumer => {
            if (!consumer) {
                return res.status(404).send({
                    message: "Consumer not found with name " + req.params.consumer_name
                });
            }
            res.send(consumer);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Consumer not found with name " + req.params.consumer_name
                });
            }
            return res.status(500).send({
                message: "Error retrieving consumer with name " + req.params.consumer_name
            });
        });
}

const findByVillage = (req, res) => {
    Consumer.find({ consumer_address: req.params.village })
        .then(consumer => {
            if (!consumer) {
                return res.status(404).send({
                    message: "Consumer not found with village " + req.params.village
                });
            }
            res.send(consumer);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Consumer not found with village " + req.params.village
                });
            }
            return res.status(500).send({
                message: "Error retrieving consumer with village " + req.params.village
            });
    })
}

const updateConsumer = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Consumer content can not be empty"
        });
    }

    // Find consumer and update it with the request body
    Consumer.findOneAndUpdate({ consumer_id: req.params.consumer_id }, {
        consumer_id: req.body.consumer_id,
        consumer_name: req.body.consumer_name,
        consumer_husband_name: req.body.consumer_husband_name,
        consumer_address: req.body.consumer_address,
        consumer_aadhar: req.body.consumer_aadhar,
        consumer_phone: req.body.consumer_phone,
        isDistributed: req.body.isDistributed
    }, { new: true })
        .then(consumer => {
            if (!consumer) {
                return res.status(404).send({
                    message: "Consumer not found with id " + req.params.consumer_id
                });
            }
            res.send(consumer);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Consumer not found with id " + req.params.consumer_id
                });
            }
            return res.status(500).send({
                message: "Error updating consumer with id " + req.params.consumer_id
            });
        });
}

const deleteConsumer = (req, res) => {
    Consumer.findOneAndDelete({ consumer_id: req.params.consumer_id })
        .then(consumer => {
            if (!consumer) {
                return res.status(404).send({
                    message: "Consumer not found with id " + req.params.consumer_id
                });
            }
            res.send({ message: "Consumer deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Consumer not found with id " + req.params.consumer_id
                });
            }
            return res.status(500).send({
                message: "Could not delete consumer with id " + req.params.consumer_id
            });
        });
}

const findByAadhaar = (req, res) => {
    Consumer.find({ consumer_aadhar: req.params.consumer_aadhar })
        .then(consumer => {
            if (!consumer) {
                return res.status(404).send({
                    message: "Consumer not found with aadhar " + req.params.consumer_aadhar
                });
            }
            res.send(consumer);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Consumer not found with aadhar " + req.params.consumer_aadhar
                });
            }
            return res.status(500).send({
                message: "Error retrieving consumer with aadhar " + req.params.consumer_aadhar
            });
        });
}

module.exports = { createConsumer, findAllConsumers, findByConsumerId, findByName, updateConsumer, deleteConsumer, findByAadhaar, consumerCount, findByVillage }