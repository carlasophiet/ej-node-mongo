var express = require('express'),
  router = express.Router();

router.get('/', function(req, res) {
  res.render('contacto', {
    title: "Ejemplo Node | Contactanos"
  });
});

module.exports = router;
