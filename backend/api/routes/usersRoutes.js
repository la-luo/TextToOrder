var express = require('express');
var router = express.Router();
var userList = require('../controllers/usersController');
const passport = require("passport");
var cors = require('cors');


function authChecker(req, res, next) {
  if (req.session.auth) {
    var redir = { redirect: 'validUser'};
    return res.json(redir);
  } else {
    var redir = { redirect: 'noUser'};
    return res.json(redir);
  }
}

router.use(cors());

/* GET users listing. */
router.route('/register')
  .post(userList.create_a_user);

router.route('/users/:userId')
  .get(authChecker, userList.read_a_user)
  .put(authChecker, userList.update_a_user)
  .delete(authChecker, userList.delete_a_user);

router.route('/login')
.post(passport.authenticate('local'), function(req,res) {
  var redir = { redirect: 'validUser'};
  return res.json(redir);
}) 
  

// Engpoint to get current user
router.route('/user', authChecker, function(req, res){
  res.send(req.user);
})

// Endpoint to logout
router.get('/logout', authChecker, function(req, res){
	req.logout();
	res.send(null)
});

module.exports = router;
