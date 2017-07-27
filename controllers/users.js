module.exports = {
  listUsers: function(req, res) {
    var users = global.db.collection("users");

    users.find({}, function (err, result) {

      // esto devuelve un promise!
      result
        .toArray()
        .then(function (result) {
          res.render('users', {
            title: "Listado",
            users: result
          });
        })
        .catch(function () {
          res.render('users', {
            title: "Listado",
            users: [],
            error: "Hubo un problema en la base de datos."
          });
        })
    });
  },

  newUser: function (req, res) {
    var users = global.db.collection("users");

    users.insert(req.body, function (err, result) {
      if (err) {
        res.render('index', {
          error: "Hubo un problema en la base de datos."
        });
      } else {
        res.render('index', {
          success: "Creado correctamente."
        });
      }
    });
  }
};
