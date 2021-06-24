Slot = require('./slotModel');

// Handle index actions
exports.index = function (req, res) {
    Slot.get(function (err, slots) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Slots retrieved successfully",
            data: slots
        });
    });
};

exports.check = function(req, res){
    console.log('123456....',req.body)
    let date = new Date(req.body.slot_date).toISOString().slice(0, 10);    
    let current_date = new Date(date);
    let current_date_plus_one = current_date.setDate(current_date.getDate() + 1);
    let new_date = new Date(current_date_plus_one);

    Slot.find({                    
        "slot_date" : {
            $gte: new Date(date), 
            $lt: new_date
        }
                  
    }, function (err, slot) {  
        
        if (err){
            res.send(err);
        }else{
            console.log('qqqqq...', slot)
            if(slot.length){
                if(req.body.has_morning_slot && slot[0].has_morning_slot){
                    res.json({
                        message: 'Exist!',
                        data: true
                    });
                }else if(req.body.has_evening_slot && slot[0].has_evening_slot){
                    res.json({
                        message: 'Exist!',
                        data: false
                    });
                }else{
                    res.json({
                        message: 'Not Exist!',
                        data: false
                    });
                }
            }else{
                res.json({
                    message: 'Not Exist!',
                    data: false
                });
            }
            
        }
    });

}

// Handle create contact actions
exports.new = function (req, res) {
    console.log('123....',req.body)
    let date = new Date(req.body.slot_date).toISOString().slice(0, 10);    
    let current_date = new Date(date);
    let current_date_plus_one = current_date.setDate(current_date.getDate() + 1);
    let new_date = new Date(current_date_plus_one);
    Slot.find({                    
        "slot_date" : {
            $gte: new Date(date), 
            $lt: new_date
        }
                  
    }, function (err, slot) {        
        console.log('slots....', slot)
        if (err){
            res.send(err);
        }else{
            if(slot.length != 0){
                Slot.findById(slot[0]._id, function (err, slots) {
                    if (err)
                        res.send(err);

                        console.log('data...', slots);
                    slots.slot_date = req.body.slot_date;
                    if(!req.body.has_morning_slot){
                        slots.morning_slot = slots.morning_slot;
                    }else{
                        slots.morning_slot = req.body.morning_slot;
                    }
                    if(!req.body.has_evening_slot){
                        slots.evening_slot = slots.evening_slot;
                    }else{
                        slots.evening_slot = req.body.evening_slot;
                    }                     
                    
                    
                    slots.default_duration = req.body.default_duration;  
                    slots.has_morning_slot = true;
                    slots.has_evening_slot = true;

                    slots.save(function (err){

                        res.json({
                            message: 'slot updates!',
                            data: slots
                        });
                    })
                })
            }else{
                var slot = new Slot();
                slot.slot_date = req.body.slot_date;
                slot.morning_slot = req.body.morning_slot;
                slot.evening_slot = req.body.evening_slot;
                slot.default_duration = req.body.default_duration;  
                slot.has_morning_slot = req.body.has_morning_slot;
                slot.has_evening_slot = req.body.has_evening_slot;
                // save the contact and check for errors
                slot.save(function (err) {
                        // if (err)
                        //     res.json(err);
                res.json({
                            message: 'New slot created!',
                            data: slot
                        });
                });
            }
        }
        // res.json({
        //     message: 'Slot details loading..',
        //     data: slot
        // });
    });    
};

exports.showslot = function( req, res) {
    Slot.findById(req.params.slot_id , function(err, slot){
        if (err)
            res.send(err);
        res.json({
            message: 'Slot details loading..',
            data: slot
        });
    })
}

exports.book = function(req, res) {
    console.log("qqqqqqqqqqqqqqqqqqqq", req.body);
    Slot.findById(req.body.id, function(err, data){
        if(err){
            res.send(err)
        }else{
           console.log('wwwwwwwwwwwww', data);         
           data.booked_slots.push(req.body.value);
           data.save(function (err) {
                if (err)
                    res.json(err);
                res.json({
                    message: 'Slot booked successfully!!',
                    data: data
                });
            });
        }
       
    })
}

// Handle view contact info
exports.view = function (req, res) {   
    let current_date = new Date(req.params.slot_date)
    let current_date_plus_one = current_date.setDate(current_date.getDate() + 1);
    let new_date = new Date(current_date_plus_one);  
    Slot.find({
        "slot_date" : {
            $gte: new Date(req.params.slot_date), 
            $lt: new_date
        }
    }, function (err, slot) {
        if (err)
            res.send(err);
        res.json({
            message: 'Slot details loading..',
            data: slot
        });
    });
};