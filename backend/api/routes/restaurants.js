var express = require('express');
var router = express.Router();
var userList = require('../controllers/restaurantsController');

/* GET users listing. */
router.route('/restaurants')
  .get(restaurantList.list_all_restaurants)
  .post(restaurantList.create_a_restaurant)

router.route('/restaurants/:restaurantId')
  .get(restaurantList.read_a_restaurant)
  .put(restaurantList.update_a_restaurant)
  .delet(restaurantList.delete_a_restaurant);

module.exports = router;
