const MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/mydb";
const Orders = require('../models/Orders');
let rst = null;

exports.getOrder = (req, res) => {

  MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
    if (err) throw err;
    var query = { email: req.user.email, status: '未付款' };
    db.collection("orders").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
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
 */
exports.postOrder = (req, res) => {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('message', 'Message cannot be blank').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/contact');
  }

  const mailOptions = {
    to: 'your@email.com',
    from: `${req.body.name} <${req.body.email}>`,
    subject: 'Contact Form | Hackathon Starter',
    text: req.body.message
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      req.flash('errors', { msg: err.message });
      return res.redirect('/contact');
    }
    req.flash('success', { msg: 'Email has been sent successfully!' });
    res.redirect('/contact');
  });
};
