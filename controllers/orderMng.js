const MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/mydb";
const Orders = require('../models/Orders');
let rst = null;

exports.getOrderMng = (req, res) => {

  // let query = { email: req.user.email, status: '未付款' };
  let query = {};
  if (!req.user) { // not login?
  req.flash('success', { msg: '请先登陆！' });
  return res.render('home', {
    });  
  }  

  MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
    if (err) throw err;    
    db.collection("orders").find(query).sort({email: 1}).toArray(function(err, result) {
        if (err) throw err;
        rst = result;
        res.render('orderMng', {
        title: 'OrderMng',
        rst,
      });
      db.close();
    });
  });

};

exports.postOrderMng = (req, res) => {
   console.log('Request received: ');
   console.log(req.body.data,req.body.status );
    // util.log(util.inspect(req)) // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
    // util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url) // this line logs just the method and url

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    req.on('data', function (chunk) {
        console.log('GOT DATA!');
    });
    res.end('callback(\'{\"msg\": \"OK\"}\')');
};

