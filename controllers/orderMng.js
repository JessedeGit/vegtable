const MongoClient = require('mongodb').MongoClient;
const Orders = require('../models/Orders');
const ObjectId = require('mongodb').ObjectID;
let rst = null;

var query = { status: 'X未付款' };

exports.getOrderMng = (req, res) => {
  if (!req.user) { // not login?
  req.flash('success', { msg: 'Please login. | 请先登陆！' });
  return res.render('account/login', {
    });  
  }  

  MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
    if (err) throw err;    
    db.collection("orders").find(query).sort({updatedAt: -1}).toArray(function(err, result) {
        if (err) throw err;
        rst = result;
        res.render('orderMng', {
        title: 'OrderMng',
        rst,
        query,
        // statusOfSubmitBtn,
      });
      db.close();
    });
  });

};

exports.postOrderMng = (req, res) => {
  if (!process.env.ADMIN_EMAILS.includes(req.user.email) ) { // not admin?
    req.flash('success', { msg: '您不是管理员！' });
    return res.render('home', {
    });  
  }  

  let query = {'_id': ObjectId(req.body.data)} ;  
  MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
    if (err) throw err; 
    db.collection("orders").update({"_id": ObjectId(req.body.data)}, {"$set": {"status": req.body.status}});
  });
  res.end('callback(\'{\"msg\": \"OK\"}\')');  
};
