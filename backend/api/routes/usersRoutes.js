var express = require('express');
var router = express.Router();
var userList = require('../controllers/usersController');
const passport = require("passport");

/* GET users listing. */
router.route('/users')
  .post('register', userList.create_a_user)

router.route('/users/:userId')
  .get(userList.read_a_user)
  .put(userList.update_a_user)
  .delet(userList.delete_a_user);

router.route('/login', 
  passport.authenticate('local'),
  function(req,res) {
    res.send(req.user);
  }
);

// Engpoint to get current user
router.route('/user', function(req, res){
  res.send(req.user);
})

// Endpoint to logout
router.route('/logout', function(req, res){
  req.logout();
  res.send(null);
});

module.exports = router;
