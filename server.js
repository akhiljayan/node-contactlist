var express = require('express');
var app = express();

var mongojs = require('mongojs');
var db = mongojs('contactlist',['contactlist']);

var bodyParser = require('body-parser');

// app.get('/',function(req, res){
//   res.send("hello world from server.js");
// });

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contactlist', function(req, res){
  console.log('server received a get request');
  db.contactlist.find(function(err, docs){
    console.log(docs);
    res.json(docs);
  });
});

app.post('/contactlist', function(req, res){
  console.log(req.body);
  db.contactlist.insert(req.body, function(err, docs){
    res.json(docs);
  });
});

app.delete('/contactlist/:id', function(req, res){
  var id = req.params.id;
  console.log(id);
  db.contactlist.remove({_id : mongojs.ObjectId(id)}, function(err, docs){
    res.json(docs);
  });
});

app.get('/contactlist/:id', function(req, res){
  var id =req.params.id;
  console.log(id);
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, docs){
    res.json(docs);
  });
});

app.put('/contactlist/:id', function(req, res){
  var id = req.params.id;
  console.log(req.body.name);
  db.contactlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function(err, docs){
      res.json(docs);
  });
});
  // person1 = {
  //   name : 'Akhil Jayan',
  //   email : 'mailtoakjn@gmail.com',
  //   number : '9496367890'
  // };
  // person2 = {
  //   name : 'Athul Jayan',
  //   email : 'athul@gmail.com',
  //   number : '9496588544'
  // };
  // person3 = {
  //   name : 'Boby',
  //   email : 'boby@gmail.com',
  //   number : '9874563210'
  // };
  // person4 = {
  //   name : 'Remjath',
  //   email : 'remjath@gmail.com',
  //   number : '9876543210'
  // };
  // var contactlist = [person1, person2, person3, person4];
  // res.json(contactlist);


app.listen(3000);
console.log("server running on port 3000");
