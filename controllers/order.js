const MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/mydb";
const Orders = require('../models/Orders');
let rst = null;

exports.getOrder = (req, res) => {
  if (!req.user) { // not login?
  // alert('请先登陆！'); 
  // res.send(500,'请返回先登陆！');
  req.flash('success', { msg: 'Please login. | 请先登陆！' });
  return res.render('home', {
    // title: 'Login'
    });  
  }  

  MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
    if (err) throw err;
    var query = { email: req.user.email, status: 'X未付款' };
    db.collection("orders").find(query).toArray(function(err, result) {
        if (err) throw err;
        // console.log(result);
        rst = result;
        // req.flash('success', { msg: rst.length});
        res.render('order', {
        title: 'Order',
        rst,
      });
      db.close();
    });
  });    
};

/**
 * POST /contact
 * Send a contact form via Nodemailer.
//  */
// exports.postOrder = (req, res) => {

// };
