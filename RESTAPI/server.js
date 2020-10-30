var express = require('express');  
var app = express();  
var fs = require("fs");  
var bodyParser = require('body-parser');  

//enable CORS for request verbs
app.use(function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
  res.header("Access-Control-Allow-Methods","POST, GET, PUT, DELETE, OPTIONS");  
  next();  
});  

app.use(bodyParser.urlencoded({  
    extended: true  
}));  

app.use(bodyParser.json());  

//Handle GET method for listing all employees
app.get('/listEmployees', function (req, res) {  
   fs.readFile( __dirname + "/" + "employee.json", 'utf8', function (err, data) {  
       console.log( data );  
       res.end( data );  
   });  
})  

//Handle GET method to get only one record
app.get('/:id', function (req, res) {  
   // First read existing employees.  
   fs.readFile( __dirname + "/" + "employee.json", 'utf8', function (err, data) {  
       employee = JSON.parse( data );  
       console.log(req.params.id);  
       var employee = employee["emp" + req.params.id]   
       console.log( employee );  
       res.end( JSON.stringify(employee));  
   });  
})  

//Handle POST method
app.post('/addEmployee', function (req, res) {  
   // First read existing employees.  
       fs.readFile( __dirname + "/" + "employee.json", 'utf8', function (err, data) {  
       var obj = JSON.parse('[' + data + ']' );  
       obj.push(req.body);  
       console.log(obj);  

       res.end( JSON.stringify(obj)  );  
   });  
})  

//Handle DELETE method
app.delete('/deleteEmployee/:id', function (req, res) {  

   // First read existing employees.  
   fs.readFile( __dirname + "/" + "employee.json", 'utf8', function (err, data) {  
       data = JSON.parse( data );  

       delete data["emp" + req.params.id];  

       console.log( data );  
       res.end( JSON.stringify(data));  
   });  
})  

//Handle GET method
app.put('/updateEmployee/:id', function(req,res){  

    // First read existing employees.  
    fs.readFile( __dirname + "/" + "employee.json", 'utf8', function (err, data) {  
       //var obj = JSON.parse('[' + data + ']' );  
       data = JSON.parse( data );  
       var arr={};  
       arr=req.body;  

        data["emp" + req.params.id]= arr[Object.keys(arr)[0]] ; //  req.body;   //obj[Object.keys(obj)[0]]  

        res.end( JSON.stringify( data ));  

    });  
} );  

var server = app.listen(8081, function () {  

  var host = server.address().address  
  var port = server.address().port  

  console.log("Example app listening at http://%s:%s", host, port)  

})  