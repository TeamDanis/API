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
var userName

var adminPassword
var adminName


// connexió a mongo i start app
mongo.connect(url, function( err, _client ) {
  // si no ens podem connectar, sortim
  if( err ) throw err;
  mongoClient = _client;
});


app.use(cors());

app.get('/api/login', function(req, res) {

  //auth user
  userName = req.query.userName;
  userPassword = req.query.userPassword;

  console.log("user name: ", userName);
  console.log("user password: ", userPassword);

  userPassword= md5(userPassword);

  var alumno = { "Name" : userName };

  getUser(alumno, res, userPassword);

});

app.get('/api/loginAdmins'), function(req, res){

  adminName = req.query.userName;
  adminPassword = req.query.userPassword;

  console.log("admin name: ", userName);
  console.log("admin password: ", userPassword);

  adminPassword= md5(adminPassword);

  var admin = { "Name" : adminName };

  getUser(admin, res, adminPassword);

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

function getAdmin(query, res, userPassword){

    mongo.connect(url, function( err, _client ) {
    // si no ens podem connectar, sortim
    if( err ) throw err;
    mongoClient = _client;
    });

    var dbo = mongoClient.db("Matriculacions_BD");

    //cambiar base de datos por la de admins
    dbo.collection('Students_data').find(query).toArray(function( err, docs ) {
        if( err ) {
            res.json({correct: false , token: "error on validation"});
            mongoClient.close();
        } 

        if(docs[0] != undefined) {
          console.log("testing in method", docs[0]);
          checkPassword(docs[0], userPassword, res);
        } else {
          res.json({correct: false, token: "el usuario administrador no existe."})
        }
    });
}


function checkPassword(data, userPassword, res){
    console.log("checkiando las strings, dbPassword: ", data.Password, "userPassword", userPassword);

    mongoClient.close();

    if(data.Password == userPassword){

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