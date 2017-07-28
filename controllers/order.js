const MongoClient = require('mongodb').MongoClient;
const Orders = require('../models/Orders');
let rst = null;

exports.getOrder = (req, res) => {
  if (!req.user) { // not login?
  req.flash('success', { msg: 'Please login. | 请先登陆！' });
  return res.render('home', {
    });  
  }  

  MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
    if (err) throw err;
    var query = { email: req.user.email, status: 'X未付款' };
    db.collection("orders").find(query).toArray(function(err, result) {
        if (err) throw err;
        rst = result;
        res.render('order', {
        title: 'Order',
        rst,
      });
      db.close();
    });
  });    
};
