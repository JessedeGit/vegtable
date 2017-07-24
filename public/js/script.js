var http = require('http');
const User = require('../models/User');

// function displayScope(id){
//     // alert('displayScope before ajax');
//   const btn = document.getElementById(id);
// //   alert(btn.innerHTML);
//   let nextBtnHTML = '';
//   if (btn.innerHTML == '点我就显示已付款订单'){
//       nextBtnHTML = '再点我就显示已取消订单';      
//   }
//   if (btn.innerHTML == '再点我就显示已取消订单'){
//       nextBtnHTML = '再点我就显示全部订单';      
//   }
//   if (btn.innerHTML == '再点我就显示全部订单'){
//       nextBtnHTML = '再点我就显示未付款订单';      
//   }
//   if (btn.innerHTML == '再点我就显示未付款订单'){
//     nextBtnHTML = '点我就显示已付款订单';      
//   }
  
//   $.ajax({
//         url: '/displayScope',
//         // dataType: "jsonp",
//         data: {data: nextBtnHTML },
//         type: 'POST',
//         jsonpCallback: 'callback', // this is not relevant to the POST anymore
//         success: function (data) {
//             var ret = jQuery.parseJSON(data);
//             console.log('Success: ')
//         },
//         error: function (xhr, status, error) {
//             console.log('Error: ' + error.message);
//         },
//     });
// };

function myFunction(id, name) {
  // const User = require('../models/User');      
  const btn = document.getElementById(id);
  if (btn.innerHTML == 'X未付款'){
    btn.innerHTML = '✓ 已付';
    btn.style = 'backgroundcolor: lightgreen;'; 
    //let server end update database
    // alert('before user.find...!');
    // server end update database done
    // var data = {};
    // data.title = "title";
    // data.message = "message";					
    $.ajax({
        url: '/endpoint1',
        // dataType: "jsonp",
        data: {data: id, status: btn.innerHTML },
        type: 'POST',
        jsonpCallback: 'callback', // this is not relevant to the POST anymore
        success: function (data) {
            var ret = jQuery.parseJSON(data);
            console.log('Success: ')
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message);
        },
    });
    //server end update database done            
  } else if (btn.innerHTML == '✓ 已付'){
      btn.innerHTML = '已取消';
      btn.style = 'backgroundcolor: pink;';
    //let server end update database      
    $.ajax({
        url: '/endpoint1',
        // dataType: "jsonp",
        data: {data: id, status: btn.innerHTML },
        type: 'POST',
        jsonpCallback: 'callback', // this is not relevant to the POST anymore
        success: function (data) {
            var ret = jQuery.parseJSON(data);
            console.log('Success: ')
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message);
        },
    });
  } else if (btn.innerHTML == '已取消'){
    btn.innerHTML = 'X未付款';
    btn.style = 'color: black;backgroundcolor: white;';          
    //let server end update database    
    $.ajax({
        url: '/endpoint1',
        // dataType: "jsonp",
        data: {data: id, status: btn.innerHTML },
        type: 'POST',
        jsonpCallback: 'callback', // this is not relevant to the POST anymore
        success: function (data) {
            var ret = jQuery.parseJSON(data);
            console.log('Success: ')
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message);
        },
    });      
  }
};