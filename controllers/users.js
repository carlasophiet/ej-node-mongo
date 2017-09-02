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
  },

  buscadorUsuario: function(req,res){
    var users = global.db.collection("users");
    var pregunta='';
    //(req == 1): query= '{"age":{"$lt":18}}' ? (req==2) : query='{"age":{"$gte":18}}' ? (req==3) : query='{"sex":"f"}' ? query='{"sex":"m"}';
    if (req.query.opt ==1){pregunta= '{"age":{"$lt":"18"}}';}
    else if (req.query.opt==2){pregunta='{"age":{"$gte":"18"}}';}
    else if (req.query.opt==3){pregunta='{"sex":"f"}';}
    else if (req.query.opt==4){pregunta='{"sex":"m"}';}
    users.find(pregunta, function(err, result){
      if (err){
        console.log('problemas en buscadorUsuario!!');
      }else{
        result
          .toArray()
          .then(function (result){
            return res.send(result);
          })
    }
  })
  }//buscadorUsuario
};
