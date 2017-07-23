var http = require('http');
const User = require('../models/User');

function myFunction(id, name) {
  // const User = require('../models/User');      
  var btn = document.getElementById(id);
  if (btn.innerHTML == 'X未付款'){
    btn.innerHTML = '✓ 已付';
    btn.style = 'backgroundcolor: lightgreen;'; 
    //let server end update database
    alert('before user.find...!');
    //server end update database done
    // var data = {};
    // data.title = "title";
    // data.message = "message";					
    // $.ajax({
    //   type: 'POST',
    //   data: JSON.stringify(data),
    //   contentType: 'application/json',
    //   url:'http://localhost:3000/endpoint',						
    //   success: function(data) {
    //       console.log('success:');
    //       console.log(JSON.stringify(data));
    //   }
    // });
    //server end update database done            
  } else if (btn.innerHTML == '✓ 已付'){
      btn.innerHTML = '已取消';
      btn.style = 'backgroundcolor: pink;';
    //let server end update database      
  } else if (btn.innerHTML == '已取消'){
    btn.innerHTML = 'X未付款';
    btn.style = 'color: black;backgroundcolor: white;';          
    //let server end update database          
  }
};