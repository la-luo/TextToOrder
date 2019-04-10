const mongoose = require('mongoose'), User = mongoose.model('User');
const bcrypt = require('bcryptjs');

exports.create_a_user = function(req, res) {
    const password = req.body.password;
    const password2 = req.body.password2;

    if (password == password2) {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });

        User.createUser(newUser, function(err, user){
            if(err) throw err;
            res.send(user).end();
        });
    } else {
        res.status(500).send("{errors: \"Passwords don't match\"}").end()
    }
};

exports.read_a_user = function(req, res) {
    User.findById(req.params.userId, function(err, user) {
        if (err)
        res.send(err);
    res.json(user);
    });
};

exports.update_a_user = function(req, res) {
    User.findOneAndUpdate({_id: req.params.userId}, req.body, {new:true}, function(err, user){
        if (err) 
            res.send(err);
        res.json(user);
    });
};

exports.delete_a_user = function(req, res) {
    User.remove({
        _id: req.params.userId
    }, function(err, user) {
        if(err) 
           res.send(err);
        res.json({message: "User successfully deleted!"});
    }
    );
}