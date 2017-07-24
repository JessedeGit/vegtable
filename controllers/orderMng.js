const MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/mydb";
const Orders = require('../models/Orders');
const ObjectId = require('mongodb').ObjectID;
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
  // console.log('管理员?');    
  if (!process.env.ADMIN_EMAILS.includes(req.user.email) ) { // not admin?
    req.flash('success', { msg: '您不是管理员！' });
    // console.log('您不是管理员！ ');    
    return res.render('home', {
    });  
  }  
   console.log('Request received: ');
   console.log(req.body.data,req.body.status );
    // util.log(util.inspect(req)) // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
    // util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url) // this line logs just the method and url

    // res.writeHead(200, { 'Content-Type': 'text/plain' });
    // req.on('data', function (chunk) {
    //     console.log('GOT DATA!');
    // });
    //write into database 
  
  console.log('me是管理员！ '); 
  let query = {'_id': ObjectId(req.body.data)} ;  
  MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
    if (err) throw err; 
    // db.collection("orders").findOne({"_id": ObjectId(req.body.data)}).status = {"status": "test"};
    db.collection("orders").update({"_id": ObjectId(req.body.data)}, {"$set": {"status": req.body.status}});
    // db.collection("orders").findOne(query).status = req.body.status;
    // db.close();
    // (function(err, result) {
    // // db.orders
    // //   .update({'_id': req.body.data}
    // //           ,{"$set": {"status":req.body.status}})(function(err, result) {
    //     if (err) throw err;
    //     // rst = result;
    //     // res.render('orderMng', {
    //     //   title: 'OrderMng',
    //     //   rst,
    //     // });
    //   db.close();
    // });
  });

  res.end('callback(\'{\"msg\": \"OK\"}\')');  
};

