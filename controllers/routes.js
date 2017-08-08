var express = require('express'),
  usersController = require('./users'),
  router = express.Router();

router.get('/', function(req, res) {
  res.render('index', {
    title: "Subite",
    users: ["User A", "User B", "User C"]
  });
});


router.get('/users', usersController.listUsers);

router.get('/buscador', function(req,res){
	res.render('buscador',{
		title:"Buscador",
		users: ["User A", "User B", "User C"]
	});
});

router.get('/users',usersController.buscadorUsuario); 

router.post('/', usersController.newUser);



module.exports = router;
