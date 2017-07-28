const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_PASSWORD
  }
});


let fs = require('fs');
let notice = '';


exports.getContact = (req, res) => {
  fs.readFile('./data/notice.data', 'utf8', function (err, data) {
    if (err) throw err;
    notice = data;

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
    req.flash('success', { msg:'Submitted successfully. | 您已经成功提交!' });
    res.redirect('/contact');
  });

 };
