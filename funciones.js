var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://danisteam00:danisteam00@teamdanis.ryioo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  
  var dbo = db.db("DatosAlumnos");
  
  dbo.collection("Alumnos").find({}).toArray(function(err, result) {
    
    if (err) throw err;
    console.log(result);
    db.close();

  });
});