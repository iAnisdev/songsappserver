const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const queueSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Song title Required']
    },
    artist: {
        type: String,
        required: [true, 'Song artist Required']
    }
}, {
    collection: 'Queue',
    versionKey: false,
    toJSON: {
        virtuals: true,
        versionKey: false,
    },
    toObject: {
        virtuals: true,
        versionKey: false,
    }
})

const queue = mongoose.model('queueModel', queueSchema)

module.exports = queue