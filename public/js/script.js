var http = require('http');
const User = require('../models/User');

function cleanInput(x){
  x.setAttribute("value", "");
};

function add2Db(){
    let  name = document.getElementById('name').value;
    let    u1 = document.getElementById('unit1').value;
    let price = document.getElementById('price').value;
    let    u2 = document.getElementById('unit2').value;
    $.ajax({
        url: '/pdt2db',
        data: {name: name, unit1: u1, price: price, unit2: u2},
        type: 'POST',
        jsonpCallback: 'callback', // this is not relevant to the POST anymore
        success: function (data) {
            alert("This record update successfully. 这条记录已经添加成功！");
            document.getElementById('name').value = '如：金色猕猴桃';
            document.getElementById('unit1').value = '如：整箱(36粒)';
            document.getElementById('price').value = '35';
            document.getElementById('unit2').value = '如：/箱';
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message);
        },
    });
};


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