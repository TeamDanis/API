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

  var alumno = { "name" : userName };

  getUser(alumno, res, userPassword);

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

function getUser(query, res, userPassword){

  mongo.connect(url, function( err, _client ) {
    // si no ens podem connectar, sortim
    if( err ) throw err;
    mongoClient = _client;
  });

    var dbo = mongoClient.db("DatosAlumnos");
    dbo.collection('Alumnos').find(query).toArray(function( err, docs ) {
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

function checkPassword(data, userPassword, res){
    console.log("checkiando las strings, dbPassword: ", data.password, "userPassword", userPassword);

    mongoClient.close();

    if(data.password == userPassword){

      token = jwt.sign(data, 'tokenpass', {expiresIn: 300});

      res.json({
        correct: true,
        token: token,
      });

    } else {
      res.json({
        correct: false,
        token: "no token",
      });
    }    
}