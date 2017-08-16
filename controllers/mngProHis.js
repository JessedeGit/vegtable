const Orders = require('../models/Orders');
const pro = require('../models/Products');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

let rst = null;
exports.getMngProHis = (req, res) => {
    MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
    if (err) throw err;
    var query = { };
    db.collection("products").find(query).toArray(function(err, result) {
        if (err) throw err;
        rst = result;
        res.render('mngProHis', {
        title: 'mngProHis',
        rst,
      });
      db.close();
    });
  }); 
};

exports.mv2Htry = (req, res) => {
    if (!process.env.ADMIN_EMAILS.includes(req.user.email) ) { // not admin?
    req.flash('success', { msg: '您不是管理员！' });
    return res.render('hoaccount/login', {
    }); 
    }

    MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
    if (err) throw err;   
    /*
    // keep this part, in case useful in the future
    let temp = db.collection("products").find({_id: ObjectId(req.body.id)}).forEach(
        function(doc){
        db.collection("productsolds").insert(doc);
        }
    );
    */

    db.collection("products").remove({_id: ObjectId(req.body.id)});

    });

    res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.on('data', function (chunk) {
        console.log('GOT DATA!');
        got = chunk.toString(data);
        });
    res.end();
};

exports.mngProHis = (req, res) => {
    console.log(req.body.name);
    if (!process.env.ADMIN_EMAILS.includes(req.user.email) ) { // not admin?
        req.flash('success', { msg: '您不是管理员！' });
        return res.render('home', {
        }); 
    }
};