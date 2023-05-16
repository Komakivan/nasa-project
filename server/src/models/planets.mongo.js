const mongoose = require('mongoose')

const {Schema, model} = mongoose


const planetSchema = new Schema({
    keplerName: {
        type: String,
        required: true
    }
})

const planetsModel = model('Planet', planetSchema)

module.exports = {planetsModel}