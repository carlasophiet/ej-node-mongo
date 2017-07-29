var express = require('express'),
  usersController = require('./users'),
  router = express.Router();

router.get('/', function(req, res) {
  res.render('index', {
    title: "Index",
    users: ["User A", "User B", "User C"]
  });
});


router.get('/users', usersController.listUsers);

router.post('/', usersController.newUser);



module.exports = router;
