/**
 * GET /
 * Home page.
 */
// var Book = require('../models/book');
// var Author = require('../models/author');
// var Genre = require('../models/genre');
// var BookInstance = require('../models/bookinstance');
let fs = require('fs');
const alert = require('alert-node');
const Orders = require('../models/Orders');

// var products = Array.from(JSON.parse(fs.readFileSync('./data/currPrdt.data', 'utf8')).items);
let products = {};
let nextSale = 0;
fs.readFile('./data/currPrdt.data', 'utf8', function (err, data) {
  if (err) throw err;
  // if (!fs.isEmptySync('./data/currPrdt.data'))
  
  if(!isJSON(data)) {
    console.log('data: ' + data);
    products = [];
    nextSale = data.toString();
  } else
    products = Array.from(JSON.parse(data).items);
});

exports.getIndex = (req, res) => {
  res.render('home', {
    title: 'Home',
    products,
    nextSale,
  });
};

exports.postIndex = (req, res) => {
  // check user's order input
    // check current user login or not  
  if (!req.user) { // not login?
    // alert('请先登陆！'); 
    // res.send(500,'请返回先登陆！');
    req.flash('success', { msg: '请先登陆！' });
    return res.render('account/login', {
      title: 'Login'
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
    // alert('貌似您还没有订购任何产品？');  
    // res.send(500,'貌似您还没有订购任何产品？请返回订购！');  
    req.flash('success', { msg: '貌似您还没有订购任何产品？' });   
    return res.redirect('/home');
  }

  const orderedPdt = products.filter(v => (v.qty > 0));
  const totalPrice = orderedPdt.reduce((a, v) => (a + v.qty * v.price), 0);
  orderedPdt.forEach(v => (v.totalPrice = v.qty * v.price));
  //write into database
  const myOrder = new Orders({
    email: req.user.email,
    // number: 
    name: req.user.name,
    // data
    status: "未付款",
    totalPrice: totalPrice,
    // eTaketime:
    items: orderedPdt,
  });  
  myOrder.save((err) => {
      if (err) { return next(err); }
      res.redirect('/order');
  });
};
  // alert(req.user._id); 
  // alert(req.user.profile.name);   
  // alert(req.user.email); 
 
  // req.body.input0;

  // req.assert('input0', 'input0 cannot be blank11').isEmpty().isInt();
  // req.assert('input1', 'input1 cannot be blank11').notEmpty();
  
  // req.assert('email', 'Email is not valid11').isEmail();
  // req.assert('message', 'Message cannot be blank11').notEmpty();

  // const errors = req.validationErrors();

  // if (errors) {
  //   req.flash('errors', errors);
  //   return res.redirect('/home');
  // }


  // const mailOptions = {
  //   to: 'your@email.com',
  //   subject: 'Contact Form | Hackathon Starter',
  //   text: req.body.message
  // };

  // transporter.sendMail(mailOptions, (err) => {
  //   if (err) {
  //     req.flash('errors', { msg: err.message });
  //     return res.redirect('/home');
  //   }
  //   req.flash('success', { msg: 'Email has been sent successfully!' });
  //   res.redirect('/home');
  // });


function isJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

// function MyError(message) {
//   this.name = 'MyError';
//   this.message = message || 'Default Message';
//   this.stack = (new Error()).stack;
// }
// var fs = require('fs');
// var async = require('async');

// function readJSONFile(filename, callback) {
//   fs.readFile(filename, function (err, data) {
//     if(err) {
//       callback(err);
//       return;
//     }
//     try {
//       callback(null, JSON.parse(data));
//     } catch(exception) {
//       callback(exception);
//     }
//   });
// }

// exports.index = function(req, res) {       
//     async.parallel({
//         Vegname: function() {
//             return 'testString';
//         }, 
//     }, function(err, results) {
//         res.render('home', { title: 'Home', error: err, data: results });
//     });
// };

