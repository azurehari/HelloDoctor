var mongoose = require('mongoose');

const timeSchema = mongoose.Schema({
    from : String,
    to: String,
    status: {
        type: String,
        default: 'active'
    }
});

const slotSchema = mongoose.Schema({
    slot_date : {
        type: Date
    },
    morning_slot : [timeSchema],
    evening_slot : [timeSchema],
    default_duration: {
        type: String,
        default: "30"
    },
    has_morning_slot : {
        type : Boolean,
        default : false
    },
    has_evening_slot : {
        type : Boolean,
        default : false
    },
    booked_slots : []
});

var Slot = module.exports = mongoose.model('slots', slotSchema);
module.exports.get = function (callback, limit) {
    Slot.find(callback).limit(limit);
}