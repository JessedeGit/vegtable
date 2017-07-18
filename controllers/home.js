/**
 * GET /
 * Home page.
 */
// var Book = require('../models/book');
// var Author = require('../models/author');
// var Genre = require('../models/genre');
// var BookInstance = require('../models/bookinstance');

var fs = require('fs');
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
  // check each text input make sure it's a positive number 
  // or blank
  // or 0
  // alert user if more than 10

  // req.assert('input0', 'input0 cannot be blank11').isEmpty().isInt();
  // req.assert('input1', 'input1 cannot be blank11').notEmpty();
  
  // req.assert('email', 'Email is not valid11').isEmail();
  // req.assert('message', 'Message cannot be blank11').notEmpty();
  console.log("hello");

  // const errors = req.validationErrors();

  // if (errors) {
  //   req.flash('errors', errors);
  //   return res.redirect('/home');
  // }



  // const mailOptions = {
  //   to: 'your@email.com',
  //   from: `${req.body.name} <${req.body.email}>`,
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
};







function isJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

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

