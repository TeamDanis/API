const express = require('express');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const cors = require('cors');

const app = express()
const port = 3000

app.use(cors());

app.get('/api', (req, res) => {
  res.json({
    text: 'my api!',
  })
})

app.get('/api/login', function(req, res) {

  //auth user
  var userName = req.query.userName;
  var userPassword = req.query.userPassword;

  userPassword= md5(userPassword);

  res.json({
    userName: userName,
    userPassword: userPassword
  });

});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
