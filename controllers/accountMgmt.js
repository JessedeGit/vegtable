const MongoClient = require('mongodb').MongoClient;
const Orders = require('../models/Orders');

exports.getAccountMgmt = (req, res) => {
  if (!process.env.ADMIN_EMAILS.includes(req.user.email) ) { // not admin?
        req.flash('success', { msg: '您不是管理员！' });
        // console.log('您不是管理员！ ');    
        return res.render('home', {
        }); 
  } 

  res.render('accountMgmt', {
        title: 'accountMgmt',
  });   
};


exports.postDltEmail = (req, res) => {
  let result = 0;
  MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
    if (err) throw err;
    // console.log(db.collection("users").remove({email:req.body.email}));
    result = db.collection("users").remove({email:req.body.email}).nRemoved;
    res.writeHead(200, { 'Content-Type': 'text/plain' });
  // res.on('data', function (chunk) {
  // // console.log('GOT DATA!');
  // got = chunk.toString(data);
    // });
    res.write(result === 0 ? '数据库没有这个邮件，请核实！' : '恭喜你已经成功删除帐号！');
    res.end();
  });

};


  // MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
  //   if (err) throw err;
  //   var query = { email: req.user.email, status: 'X未付款' };
  //   db.collection("orders").find(query).toArray(function(err, result) {
  //       if (err) throw err;
  //       // console.log(result);
  //       rst = result;
  //       // req.flash('success', { msg: rst.length});
  //       res.render('order', {
  //       title: 'Order',
  //       rst,
  //     });
  //     db.close();
  //   });
  // });  
