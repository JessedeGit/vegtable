var http = require('http');
const User = require('../models/User');


function dltEmail(){
    let email = document.getElementById('email').value;
    // alert(email);

    $.ajax({
        url: '/dltEmail',
        data: {email:email},
        type: 'POST',
        jsonpCallback: 'callback', // this is not relevant to the POST anymore
        success: function (data) {
          alert(data);          
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message);
        },
    });
};

function mv2Htry(id,name){
    document.getElementById(id).style.visibility = 'hidden';
    document.getElementById(id + "1").style.visibility = 'hidden';
    $.ajax({
        url: '/mv2Htry',
        data: {id:id,name:name},
        type: 'POST',
        jsonpCallback: 'callback', // this is not relevant to the POST anymore
        success: function (data) {
            // alert("已经back");
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message);
        },
    });
};


function cleanInput(x){
  x.setAttribute("value", "");
};

function add2Db(){
    let  name = document.getElementById('name').value;
    let    u1 = document.getElementById('unit1').value;
    let price = document.getElementById('price').value;
    let    u2 = document.getElementById('unit2').value;

    if(name.length <= 0) {alert('您是否没有填写产品名称？'); return;}
    if(price.length <= 0) {alert('您是否没有填写价格？'); return;}
    if(u2.length <= 0) {alert('您是否没有填写售卖单位？'); return;}
    
    if(name.length > 18) {alert('产品名称最好不要超过18个字符.'); return;}
    if(u1.length > 10) {alert('售卖单位最好不要超过10个字符.'); return;}
    if(u2.length > 10) {alert('购买单位最好不要超过10个字符.'); return;}
    if(price <= 0) {alert('价格是否正确？'); return;}
    
    $.ajax({
        url: '/pdt2db',
        data: {name: name, unit1: u1, price: price, unit2: u2},
        type: 'POST',
        jsonpCallback: 'callback', // this is not relevant to the POST anymore
        success: function (data) {
            alert("This record update successfully. 这条记录已经添加成功！");
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message);
        },
    });
};


function myFunction(id, name) {
  const btn = document.getElementById(id);
  if (btn.innerHTML == 'X未付款'){
    btn.innerHTML = '✓ 已付';
    btn.style = 'backgroundcolor: lightgreen;'; 
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
  } else if (btn.innerHTML == '✓ 已付'){
      btn.innerHTML = '已取消';
      btn.style = 'backgroundcolor: pink;';
    $.ajax({
        url: '/endpoint1',
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
    $.ajax({
        url: '/endpoint1',
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