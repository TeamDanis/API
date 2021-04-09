const express = require('express');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000

//conexion mongo
var mongo = require('mongodb').MongoClient;
var url = "mongodb+srv://danisteam00:danisteam00@teamdanis.ryioo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var mongoClient;


var userPassword
var userEmail

var adminPassword
var adminUsername


// connexió a mongo i start app
mongo.connect(url, function( err, _client ) {
  // si no ens podem connectar, sortim
  if( err ) throw err;
  mongoClient = _client;
});


app.use(cors());

app.get('/api/login', function(req, res) {

  //auth user
  userEmail = req.query.userEmail;
  userPassword = req.query.userPassword;

  console.log("user name: ", userEmail);
  console.log("user password: ", userPassword);

  userPassword= md5(userPassword);

  var alumno = { "E-mail" : userEmail };

  getUser(alumno, res, userPassword);

});

app.get('/api/loginAdmins'), function(req, res){

  adminUserame = req.query.adminUsername;
  adminPassword = req.query.adminPassword;

  console.log("admin name: ", adminUsername);
  console.log("admin password: ", adminPassword);

  adminPassword= md5(adminPassword);

  var admin = { "Username" : adminUsername };

  getAdmin(admin, res, adminPassword);


  res.json({
    correct: false,
    token: "no token"
  });
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

function getUser(query, res, userPassword){

  mongo.connect(url, function( err, _client ) {
    // si no ens podem connectar, sortim
    if( err ) throw err;
    mongoClient = _client;
  });

    var dbo = mongoClient.db("Matriculacions_BD");
    dbo.collection('Students_data').find(query).toArray(function( err, docs ) {
        if( err ) {
            res.json({correct: false , token: "error on validation"});
            mongoClient.close();
        } 

        if(docs[0] != undefined) {
          console.log("testing in method", docs[0]);
          checkPassword(docs[0], userPassword, res);
        } else {
          res.json({correct: false, token: "el usuario no esta."})
        }
    });
}

function getAdmin(query, res, adminPassword){

    mongo.connect(url, function( err, _client ) {
    // si no ens podem connectar, sortim
    if( err ) throw err;
    mongoClient = _client;
    });

    var dbo = mongoClient.db("Matriculacions_BD");

    //cambiar base de datos por la de admins
    dbo.collection('Admins').find(query).toArray(function( err, docs ) {
        if( err ) {
            res.json({correct: false , token: "error on validation"});
            mongoClient.close();
        } 

        if(docs[0] != undefined) {
          console.log("testing in method", docs[0]);
          checkPassword(docs[0], adminPassword, res);
        } else {
          res.json({correct: false, token: "el usuario administrador no existe."})
        }
    });
}


function checkPassword(data, pass, res){

    mongoClient.close();

    if(data.Password == pass){

      token = jwt.sign(data, 'tokenpass', {expiresIn: 300});

      res.json({
        correct: true,
        token: token,
      });

    } else {
      res.json({
        correct: false,
        token: "password incorrecta",
      });
    }    
}
