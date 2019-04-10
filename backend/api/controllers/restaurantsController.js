const mongoose = require('mongoose'), Restaurant = mongoose.model('Restaurant');

exports.list_all_restaurants = function(req, res) {
    Task.find({}, function(err, restaurant) {
      if (err)
        res.send(err);
      res.json(restaurant);
    });
};

exports.create_a_restaurant = function(req, res) {
    var new_restaurant = new restaurant(req.body);
    new_restaurant.save(function(err, restaurant) {
        if (err)
            res.send(err);
        res.json(restaurant);
    });
};

exports.read_a_restaurant = function(req, res) {
    restaurant.findById(req.params.restaurantId, function(err, restaurant) {
        if (err)
        res.send(err);
    res.json(restaurant);
    });
};

exports.update_a_restaurant = function(req, res) {
    restaurant.findOneAndUpdate({_id: req.params.restaurantId}, req.body, {new:true}, function(err, restaurant){
        if (err) 
            res.send(err);
        res.json(restaurant);
    });
};

exports.delete_a_restaurant = function(req, res) {
    restaurant.remove({
        _id: req.params.restaurantId
    }, function(err, restaurant) {
        if(err) 
           res.send(err);
        res.json({message: "restaurant successfully deleted!"});
    }
    );
}
  
  
