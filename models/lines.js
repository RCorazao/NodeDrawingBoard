const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linesSchema = new Schema({
    line: [
        {x: Number, y: Number},
        {x: Number, y: Number}
    ],
    dataline: {
        color: String,
        thickness: Number
    }
});

const lines = mongoose.model('lines', linesSchema);

module.exports = lines;