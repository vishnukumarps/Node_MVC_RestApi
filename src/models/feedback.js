const mongoose = require('mongoose');
const feedbackSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,

    },
    msg: {
        type: String,
        required: true,

    }
});


const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;
