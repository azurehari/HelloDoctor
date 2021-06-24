var mongoose = require('mongoose');
// Setup schema
var appointmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: String,
    age: Number,
    appointment_date: {
        type: Date
    },
    waited:String,
    slot_time:String,
    phone: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Contact model
var Appointment = module.exports = mongoose.model('appointment', appointmentSchema);
module.exports.get = function (callback, limit) {
    Appointment.find(callback).limit(limit);
}