/**
 * GET /
 * Home page.
 */
let fs = require('fs');
const alert = require('alert-node');
const Orders = require('../models/Orders');
const MongoClient = require('mongodb').MongoClient;

let products = null;
exports.getIndex = (req, res) => {
  let nextSale = 0;
  MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
    if (err) throw err;
    var query = { };
    db.collection("products").find(query).toArray(function(err, result) {
        if (err) throw err;
        products = result;
        nextSale = products.length;
        res.render('home', {
        title: 'home',
        products,
        nextSale,
      });
      db.close();
    });
  }); 

};

exports.postIndex = (req, res) => {
  if (!req.user) { // not login?
    req.flash('success', { msg: 'Please Login 请先登陆！' });
    return res.render('home', {
    });  
  }   

  let proQty = products.length;
  let anyQty = false;
  let qtyI = '';
  for (let i = 0; i < proQty; i++){
    qtyI = `input${i}`;
    products[i].qty = req.body[qtyI];
    if(products[i].qty > 0) anyQty = true;
  }

  if(!anyQty) {
    req.flash('success', { msg: 'Looks you have not selected any product? | 貌似您还没有订购任何产品？' });   
    return res.redirect('/home');
  }

  const orderedPdt = products.filter(v => (v.qty > 0));
  const totalPrice = orderedPdt.reduce((a, v) => (a + v.qty * v.price), 0);
  orderedPdt.forEach(v => (v.totalPrice = v.qty * v.price));
  const myOrder = new Orders({
    email: req.user.email,
    name: req.user.profile.name, 
    status: "X未付款",
    totalPrice: totalPrice,
    items: orderedPdt,
    fetchTime: req.body['fetchTime'],
  });  
  myOrder.save((err) => {
      if (err) { return next(err); }
      res.redirect('/order');
  });
};

function isJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
