var express = require('express'),
  mailSender = require('./email'),
  usersController = require('./users'),
  router = express.Router();

router.get('/', function(req, res) {
  res.render('index', {
    title: "Index",
    users: ["User A", "User B", "User C"]
  });
});

router.get('/about-us', function(req, res) {
  res.render('about-us', {
    title: "Ejemplo Node | About Us"
  });
});

router.get('/users', usersController.listUsers);

router.post('/', usersController.newUser);



module.exports = router;
