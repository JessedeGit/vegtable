var http = require('http');
const User = require('../models/User');

function myFunction(id, name) {
  // const User = require('../models/User');      
  var btn = document.getElementById(id);
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