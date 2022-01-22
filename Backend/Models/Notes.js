const mongoose = require('mongoose');
const user = require('./User');

const NotesSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        // required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        // unique: true
    },
    tag: {
        type: String,
        required: true,

    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('notes', NotesSchema);