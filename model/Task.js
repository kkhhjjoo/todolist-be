const mongoose = require('mongoose');
const Schema = mongoose.Schema

const taskSchema = Schema({
    task: {
        type: String,
        required: true
    },
    isComplete: {
        type: Boolean,
        required: false
    }
}, {timestamps: true}
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;