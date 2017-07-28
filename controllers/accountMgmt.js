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

    db.collection("users").remove({email:req.body.email},function(err,result){
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write(JSON.parse(result).n == 0 ? '数据库没有这个邮件账号，请核实！' : '恭喜你已经成功删除帐号！');
      res.end();
      });        
  });

};
