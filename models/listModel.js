const mongoose = require('mongoose');
const schema = mongoose.Schema;
const listSchema = new schema({
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })
const list = mongoose.model("tasks", listSchema);
module.exports = list