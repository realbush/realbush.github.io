//可修改搜索引擎
var g = document.getElementById("google")
var d = document.getElementById("baidu")
var b = document.getElementById("bing")
var q = document.getElementById("qetal")
var s = document.getElementById("sogou")

/*
AV.init({
    appId: "5r9cEk4P2ABVYozIf6nS6ZmO-gzGzoHsz",
    appKey: "DY1lYfRA7fDjPQKQXLCLk3L3",
    serverURL: "https://5r9cek4p.lc-cn-n1-shared.com"
});*/
function SE() {
    var x = document.getElementById("Search-Engines").value;

    if (x == "google") {
        b.type = "hidden";
        g.type = "text";
        d.type = "hidden";
        q.type = "hidden";
        s.type = "hidden";
    }
    else if (x == "baidu") {
        b.type = "hidden";
        g.type = "hidden";
        d.type = "text";
        q.type = "hidden";
        s.type = "hidden";
    }
    else if (x == "bing") {
        b.type = "text";
        g.type = "hidden";
        d.type = "hidden";
        q.type = "hidden";
        s.type = "hidden";
    }
    else if (x == "qetal") {
        b.type = "hidden";
        g.type = "hidden";
        d.type = "hidden";
        q.type = "text";
        s.type = "hidden";
    }
    else {
        b.type = "hidden";
        g.type = "hidden";
        d.type = "hidden";
        q.type = "hidden";
        s.type = "text";
    }
}
//时钟
function shijian() {
    var date = new Date();
    var now = "";
    now = date.toLocaleTimeString();
    document.getElementById("time").innerHTML = now;
    setTimeout("shijian()", 1000);
}


//练习部分
var xhr = new XMLHttpRequest();
xhr.open('get', 'wz.json');
xhr.send();
xhr.onload = function () {
    respond = this.responseText;
    keys = Object.keys(JSON.parse(respond));
    values = Object.values(JSON.parse(respond));
    console.log(JSON.parse(respond));
}



/*
var geshu;
var query = new AV.Query('bush');
query.select(['keys','values'])
query.count().then((count) => {
    geshu = (`${count}`);
    console.log(geshu);
});
*/

function choucha() {
    var x = document.getElementById("x").innerHTML;
    if (x == 1) {
        document.getElementById('x').innerHTML = 0;
        document.getElementById('dingyi').innerHTML = "A:" + values[num];
    }
    else {
        document.getElementById('x').innerHTML = 1;
        num = Math.floor(Math.random() * keys.length);
        document.getElementById('dingyi').innerHTML = "Q:" + keys[num];
    }
}


/*

    var bingimage = new XMLHttpRequest();
    bi = bingimage.open('get', 'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN');
    bingimage.send();
    xhr.onload = function (){
        respond = this.responseText;
        console.log(JSON.parse(respond));

    }

/*
var TestObject = AV.Object.extend('bush');
var testObject = new TestObject();

testObject.save({
    keys:'诺顿定理',
    values:'一个与外部电路无耦合关系的线性含源电阻性二段网络N，对外电路而言，可以用一个电流源和一个电导相串联'
});
*/



/*// controller.js
const { Controller, Get, Redirect } = require('@nestjs/common');
const UtilService = require('./utilService');
const controllerPath = 'redirect_to_bing_daily_picture_address';

@Controller()
class BingDailyPictureController {
  constructor(utilService) {
    this.utilService = utilService;
  }

  // GET 请求重定向到必应每日图片地址
  @Get(controllerPath)
  // 使用 302 状态码进行重定向
  @Redirect('https://cn.bing.com', 302)
  async redirect() {
    // 调用 UtilService 中的方法获取必应每日图片地址
    return { url: await this.utilService.getBingDailyPictureUrl() };
  }
}

module.exports = BingDailyPictureController;

// utilService.js
const axios = require('axios');
const baseUrl = 'https://cn.bing.com';

class UtilService {
  // 获取必应每日图片地址
  async getBingDailyPictureUrl() {
    const res = await axios({
      url: `${baseUrl}/HPImageArchive.aspx?format=js&idx=0&n=1`,
      method: 'GET',
      responseType: 'json',
    });
    // 返回必应每日图片地址
    return `${baseUrl}${res.data.images[0].url}`;
  }
}

module.exports = UtilService;
*/
