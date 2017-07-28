const Orders = require('../models/Orders');
const pro = require('../models/Products');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

exports.getMngPro = (req, res) => {
    res.render('mngPro', {
    title: 'mngPro', 
    });
};
exports.postMngPro = (req, res) => {
};

exports.pdt2db = (req, res) => {
    if (!process.env.ADMIN_EMAILS.includes(req.user.email) ) { // not admin?
        req.flash('success', { msg: '您不是管理员！' });
        return res.render('home', {
        }); 
    }
    const myPdt = new pro.Products({
    name: req.body.name,
    price: req.body.price,
    unit1: req.body.unit1,
    unit2: req.body.unit2,

    });  
    myPdt.save();
    res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.on('data', function (chunk) {
        console.log('GOT DATA!');
        got = chunk.toString(data);
        });
    res.end();
};
