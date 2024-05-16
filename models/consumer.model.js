const mongoose = require('mongoose')

const consumerSchema = new mongoose.Schema({
    consumer_id:{
        type: Number,
        required: true,
        length: 6,
        unique: true
    },
    consumer_name: {
        type: String,
        required: true
    },
    consumer_husband_name:{
        type: String,
        required: true
    },
    consumer_address:{
        type: String,
        required: true
    },
    consumer_aadhar:{
        type: Number,
        required: true,
        length: 12,
        unique: true
    },
    consumer_phone:{
        type: Number,
        required: true,
        length: 10
    },
    isDistributed:{
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.model('consumer', consumerSchema)