// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});
// Import contact controller
var appointmentController = require('./appointmentController');
var slotController = require('./slotController');
// Contact routes
router.route('/appointments')
    .get(appointmentController.index)
    .post(appointmentController.new);
router.route('/appointments/:appointment_id')
    .get(appointmentController.view)
    .patch(appointmentController.update)
    .put(appointmentController.update)
    .delete(appointmentController.delete);

router.route('/slots')
    .get(slotController.index)
    .post(slotController.new);
router.route('/slots/:slot_date')
    .get(slotController.view);

router.route('/slotlist/:slot_id')
    .get(slotController.showslot)

router.route('/validate')
    .post(slotController.check);

router.route('/bookslot')
    .post(slotController.book);
    
// Export API routes
module.exports = router;