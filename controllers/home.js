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
fs.readFile('./data/currPrdt.data', 'utf8', function (err, data) {
  if (err) throw err;
  products = Array.from(JSON.parse(data).items);
});

exports.index = (req, res) => {
  res.render('home', {
    title: 'Home',
    products,
  });
};

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

