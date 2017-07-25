const Orders = require('../models/Orders');
const Products = require('../models/Products');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;


exports.postMngPro = (req, res) => {
  
};


exports.getMngPro = (req, res) => {
    res.render('mngPro', {
    title: 'mngPro', 
    });

};


exports.pdt2db = (req, res) => {
    console.log(req.body.name);
    if (!process.env.ADMIN_EMAILS.includes(req.user.email) ) { // not admin?
        req.flash('success', { msg: '您不是管理员！' });
        // console.log('您不是管理员！ ');    
        return res.render('home', {
        }); 
    }
    const myPdt = new Products({
    name: req.body.name,
    price: req.body.price,
    unit1: req.body.unit1,
    unit2: req.body.unit2,

    });  
 
  let query = {'_id': ObjectId(req.body.data)} ;  
  MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
    if (err) throw err; 
    db.collection("products").insert(myPdt);
    // res.redirect('/order');    
    // req.flash('success', { msg: 'Dababase update successfully. | 此记录已经更新到数据库！' });   
    db.close();
    res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.on('data', function (chunk) {
        console.log('GOT DATA!');
        got = chunk.toString(data);
        console.log(got)
        });
    res.end();
  });
 
//   res.render('mngPro', {
//     title: 'mngPro', 
//     });
//   res.redirect('/order');
//   res.redirect('/mngPro');

//   req.flash('success', { msg: 'Dababase update successfully. | 此记录已经更新到数据库！' });   

//   res.end('callback(\'{\"msg\": \"OK\"}\')');  
};
// /**
//  * POST /contact
//  * Send a contact form via Nodemailer.
//  */
// exports.postMngPro = (req, res) => {

//   // console.log(req.body.message);
//   fs.writeFile('./data/notice.data', req.body.message, (err) => {
//     if (err) throw err;
//     console.log('The file has been saved!');
//     res.redirect('/mngPro');
//   });

// //   req.assert('name', 'Name cannot be blank').notEmpty();
// //   req.assert('email', 'Email is not valid').isEmail();
// //   req.assert('message', 'Message cannot be blank').notEmpty();

// //   const errors = req.validationErrors();

// //   if (errors) {
// //     req.flash('errors', errors);
// //     return res.redirect('/contact');
// //   }

// //   const mailOptions = {
// //     to: 'your@email.com',
// //     from: `${req.body.name} <${req.body.email}>`,
// //     subject: 'Contact Form | Hackathon Starter',
// //     text: req.body.message
// //   };

// //   transporter.sendMail(mailOptions, (err) => {
// //     if (err) {
// //       req.flash('errors', { msg: err.message });
// //       return res.redirect('/contact');
// //     }
// //     req.flash('success', { msg: 'Email has been sent successfully!' });
// //     res.redirect('/contact');
// //   });
// //
//  };
