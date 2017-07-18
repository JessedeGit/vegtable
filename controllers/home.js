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

exports.index = (req, res) => {
  res.render('home', {
    title: 'Home',
    products,
    nextSale,
  });
};

exports.postIndex = (req, res) => {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('input0', '1st cannot be blank').notEmpty();
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

