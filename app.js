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


var userPassword;
var userEmail;

var adminPassword;
var adminUsername;

var alumnsFile;

app.use(cors());


/*
*
* ENDPOINTS LOGIN DE USUARIOS Y ADMINISTRADORES
*
*/
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

app.get('/api/loginAdmin', function(req, res){


  adminUsername = req.query.adminUsername;
  adminPassword = req.query.adminPassword;

  console.log("admin name: ", adminUsername);
  console.log("admin password: ", adminPassword);

  adminPassword= md5(adminPassword);

  var admin = { "Username" : adminUsername };

  getAdmin(admin, res, adminPassword);

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

/*
*
* ENDPOINTS LECTURA DE CICLOS
*
*/

app.get('/api/getAllDegrees', function(req, res) {

   mongo.connect(url, function( err, _client ) {
    // si no ens podem connectar, sortim
    if( err ) throw err;
    mongoClient = _client;
  });

    var dbo = mongoClient.db("Matriculacions_BD");
    dbo.collection('Educational_degree').find({}).project({CODI_CICLE_FORMATIU : 1, NOM_CICLE_FORMATIU : 1}).toArray(function( err, result ) {
      if( err ) {
          res.status(400).send({"error": "Error al conectar con el servidor" });
      } 

      if(result != undefined) {
        console.log("testing in method", result);
        res.status(200).send(result);
      } else {
        res.status(400).send({"error" : "Algo ha salido mal"});
      }

      mongoClient.close();
  });
});


app.get('/api/getDegree', function(req, res) {

  //auth user
  vdegreeCode = req.query.degreeCode;

  if (vdegreeCode == undefined){
    res.status(400).send({"error":"No se ha informado de un careerCode en la query"})
  }

  var degreeQuery = { "CODI_CICLE_FORMATIU" : vdegreeCode};

   mongo.connect(url, function( err, _client ) {
    // si no ens podem connectar, sortim
    if( err ) throw err;
    mongoClient = _client;
  });

    var dbo = mongoClient.db("Matriculacions_BD");
    dbo.collection('Educational_degree').findOne(degreeQuery, function( err, result ) {
      if( err ) {
          res.status(400).send({"error": "Error al conectar con el servidor" });
      } 

      if(result != undefined) {
        console.log("testing in method", result);
        res.status(200).send(result);
      } else {
        res.status(400).send({"error" : "El ciclo no existe"});
      }

      mongoClient.close();
  });
});

/*
*
* ENDPOINTS LECTURA DE ALUMNOS
*
*/
app.get('/api/getAlumn', function(req, res) {

  if(req.query.degreeCode != undefined){

    var degreeCode = req.query.degreeCode;
    var alumnDegreeQuery = { "Degree_code" : degreeCode};

    mongo.connect(url, function( err, _client ) {
      // si no ens podem connectar, sortim
      if( err ) throw err;
      mongoClient = _client;
    });

    var dbo = mongoClient.db("Matriculacions_BD");
    dbo.collection('Students_data').find(alumnDegreeQuery).project({_id : 0, Name : 1, First_surname : 1, Degree_name : 1}).toArray(function( err, result ) {
        if( err ) {
            res.status(400).send({"error": "Error al conectar con el servidor" });
        } 

        if(result != undefined) {
          console.log("testing in method", result);
          res.status(200).send(result);
        } else {
          res.status(400).send({"error" : "El alumno no existe"});
        }

        mongoClient.close();
    });

  } else if(req.query.RALCID != undefined){

    var RALCID = req.query.RALCID;
    var RALCIDQuery = { "RALC_id" : RALCID};

    mongo.connect(url, function( err, _client ) {
      // si no ens podem connectar, sortim
      if( err ) throw err;
      mongoClient = _client;
    });

    var dbo = mongoClient.db("Matriculacions_BD");
    dbo.collection('Students_data').find(RALCIDQuery).project({_id : 0, Name : 1, First_surname : 1, Degree_name : 1, Center_city : 1}).toArray(function( err, result ) {
        if( err ) {
            res.status(400).send({"error": "Error al conectar con el servidor" });
        } 

        if(result != undefined) {
          console.log("testing in method", result);
          res.status(200).send(result);
        } else {
          res.status(400).send({"error" : "El alumno no existe"});
        }

        mongoClient.close();
    });

  } else {

    res.status(400).send({"error" : "La llamada al endpoint es incorrecta"});

  }
});

/*
*
* ENDPOINTS IMPORTAR ALUMNOS
*
*/

app.post('/api/importAlumnsCSV', async (req, res) => {
    try {
        if(!req.files) {
            res.status(400).send({"error": "No se ha especificado ningun fichero" });
        } else {
            alumnsFile = req.files.alumnsFile;
            
            csvJSON(alumnsFile, res);
            
            
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

function csvJSON(csv, res){

  var lines=csv.split("\n");

  var result = [];

  var jsonImportAlumns;

  // NOTE: If your columns contain commas in their values, you'll need
  // to deal with those before doing the next step 
  // (you might convert them to &&& or something, then covert them back later)
  // jsfiddle showing the issue https://jsfiddle.net/
  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

      var obj = {};
      var currentline=lines[i].split(",");

      for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
      }

      result.push(obj);

  }

  //return result; //JavaScript object
  jsonImportAlumns =  JSON.stringify(result); //JSON

  mongo.connect(url, function( err, _client ) {
      // si no ens podem connectar, sortim
      if( err ) throw err;
      mongoClient = _client;
    });

    var dbo = mongoClient.db("Matriculacions_BD");
    dbo.collection('Students_data').insertMany(jsonImportAlumns ,function( err, result ) {
        if( err ) {
            res.status(400).send({"error": "Error al conectar con el servidor" });
        } 

        if(result != undefined) {
          console.log("testing in method", result);
          res.status(200).send(result);
        } else {
          res.status(400).send({"error" : "El alumno no existe"});
        }

        mongoClient.close();
    });
}

app.get('/api/testeando', function (req, res){

  aleatorio = req.query.aleatorio;
  res.status(200).send(aleatorio);

});

//puerto para los endpoints
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});