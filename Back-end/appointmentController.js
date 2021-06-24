
Appointment = require('./appointmentModel');
// Handle index actions
exports.index = function (req, res) {
    Appointment.get(function (err, appointments) {      
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Appointments retrieved successfully",
            data: appointments
        });
    });
};
// Handle create contact actions
exports.new = function (req, res) {
    var appointment = new Appointment();
    appointment.name = req.body.name ? req.body.name : appointment.name;
    appointment.gender = req.body.gender;
    appointment.email = req.body.email;
    appointment.phone = req.body.phone;
    appointment.age = req.body.age;
    appointment.appointment_date = req.body.appointment_date;
    appointment.waited = req.body.waited;
    appointment.slot_time = req.body.slot_time;
// save the contact and check for errors
appointment.save(function (err) {
        // if (err)
        //     res.json(err);
res.json({
            message: 'New appointment created!',
            data: appointment
        });
    });
};
// Handle view contact info
exports.view = function (req, res) {
    Appointment.findById(req.params.appointment_id, function (err, appointment) {
        if (err)
            res.send(err);
        res.json({
            message: 'Appointment details loading..',
            data: appointment
        });
    });
};
// Handle update contact info
exports.update = function (req, res) {
    Appointment.findById(req.params.appointment_id, function (err, appointment) {
        if (err)
            res.send(err);
            appointment.name = req.body.name ? req.body.name : appointment.name;
            appointment.gender = req.body.gender;
            appointment.email = req.body.email;
            appointment.phone = req.body.phone;
            appointment.age = req.body.age;
            appointment.appointment_date = req.body.appointment_date;
            appointment.waited = req.body.waited;
            appointment.slot_time = req.body.slot_time;
// save the contact and check for errors
        appointment.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'appointment Info updated',
                data: appointment
            });
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    Appointment.deleteOne({
        _id: req.params.appointment_id
    }, function (err, appointment) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Appointment deleted'
        });
    });
};