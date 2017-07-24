const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_PASSWORD
  }
});

/**
 * GET /contact
 * Contact form page.
 */
let fs = require('fs');
let notice = '';


exports.getContact = (req, res) => {
  fs.readFile('./data/notice.data', 'utf8', function (err, data) {
    if (err) throw err;
    // if (!fs.isEmptySync('./data/currPrdt.data'))  
    notice = data;
    // if(!isJSON(data)) {
    //   console.log('data: ' + data);
    //   products = [];
    //   nextSale = data.toString();
    // } else
    //   products = Array.from(JSON.parse(data).items);
      res.render('contact', {
      title: 'contact',
      notice,
    });
  });
};

/**
 * POST /contact
 * Send a contact form via Nodemailer.
 */
exports.postContact = (req, res) => {

  // console.log(req.body.message);
  fs.writeFile('./data/notice.data', req.body.message, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
    res.redirect('/contact');
  });

//   req.assert('name', 'Name cannot be blank').notEmpty();
//   req.assert('email', 'Email is not valid').isEmail();
//   req.assert('message', 'Message cannot be blank').notEmpty();

//   const errors = req.validationErrors();

//   if (errors) {
//     req.flash('errors', errors);
//     return res.redirect('/contact');
//   }

//   const mailOptions = {
//     to: 'your@email.com',
//     from: `${req.body.name} <${req.body.email}>`,
//     subject: 'Contact Form | Hackathon Starter',
//     text: req.body.message
//   };

//   transporter.sendMail(mailOptions, (err) => {
//     if (err) {
//       req.flash('errors', { msg: err.message });
//       return res.redirect('/contact');
//     }
//     req.flash('success', { msg: 'Email has been sent successfully!' });
//     res.redirect('/contact');
//   });
//
 };
