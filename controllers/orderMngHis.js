const MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/mydb";
const Orders = require('../models/Orders');
const ObjectId = require('mongodb').ObjectID;
let rst = null;

var query = {  status: {$not: /X未付款/ } } ;

exports.getOrderMngHis = (req, res) => {

  // let query = { email: req.user.email, status: '未付款' };
  if (!req.user) { // not login?
  req.flash('success', { msg: 'Please login. | 请先登陆！' });
  return res.render('home', {
    });  
  }  

  MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
    if (err) throw err;    
    db.collection("orders").find(query).sort({updatedAt: -1}).toArray(function(err, result) {
        if (err) throw err;
        rst = result;
        res.render('orderMngHis', {
        title: 'OrderMngHis',
        rst,
        query,
        // statusOfSubmitBtn,
      });
      db.close();
    });
  });

};

// exports.postDisplayScope = (req, res) => {
//   console.log('entre scope:');
//   console.log(req.body.data);

//   statusOfSubmitBtn = req.body.data;
//   if(req.body.data === '再点我就显示已取消订单') {query = {status: '✓ 已付'}; console.log("next step: ✓ 已付");}
//   if(req.body.data === '再点我就显示全部订单') query = {status: '已取消'};
//   if(req.body.data === '再点我就显示未付款订单') query = {};
//   if(req.body.data === '点我就显示已付款订单') query = {status: 'X未付款'};
  
  
//   MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
//     if (err) throw err;    
//     console.log("next step: ✓ 已付");
//     db.collection("orders").find(query).sort({email: 1}).toArray(function(err, result) {
//         if (err) throw err;
//         rst = result;
//         console.log("next step: ✓ 已付");
        
//         res.render('orderMng', {
//         title: 'OrderMng',
//         rst,
//         query,
//         statusOfSubmitBtn,
//       });
//       db.close();
//     });
//   });
// }

exports.postOrderMngHis = (req, res) => {
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

