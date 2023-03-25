
//leancloud
AV.init({
  appId: "5r9cEk4P2ABVYozIf6nS6ZmO-gzGzoHsz",
  appKey: "DY1lYfRA7fDjPQKQXLCLk3L3",
  serverURL: "https://5r9cek4p.lc-cn-n1-shared.com"
});
// 搜索引擎
function SE() {
  const g = document.getElementById("google")
  const d = document.getElementById("baidu")
  const b = document.getElementById("bing")
  const q = document.getElementById("qetal")
  const s = document.getElementById("sogou")
  const x = document.getElementById("Search-Engines").value;

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
  const date = new Date();
  let now = "";
  now = date.toLocaleTimeString();
  document.getElementById("time").innerHTML = now;
  setTimeout("shijian()", 1000);
}
//练习部分
function practice(params) {
  const xhr = new XMLHttpRequest();
  xhr.open('get', 'wz.json');
  xhr.send();
  xhr.onload = function () {
    respond = this.responseText;
    keys = Object.keys(JSON.parse(respond));
    values = Object.values(JSON.parse(respond));
  }
}
practice();
function choucha() {
  const x = document.getElementById("x").innerHTML;
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


// 实时信息
function bush_massages_in(params) {
  // 创建一个文本对象
  const TextObject = AV.Object.extend('days');
  const textObject = new TextObject();
  const IN = document.getElementById('in');
  IN.addEventListener('keydown', function (event) {

    if (event.key == 'Enter' || event.keyCode == '9'|| event.keyCode == '13' && !event.shiftKey) {
      event.preventDefault(); // 阻止回车键默认行为

      // 创建一个文本对象
      const TextObject = AV.Object.extend('days');
      const textObject = new TextObject();
      const IN = document.getElementById('in');
      const date = new Date();
      const text = IN.value;
      if (text.charAt(0) == '-') {
        //检测到'-'开头执行删除操作
        const query = new AV.Query('days');
        query.equalTo('value', text.slice(1));
        query.first().then((object) => {
          object.destroy().then(() => {
            //then等待destroy执行完成后执行下面
            IN.value = ''; // 清空文本框
            bush_massages_out();
          });
        })
      }
      else {
        if (text && text.trim() != '') { // 检查文本框值是否为 undefined 或 null
          // 执行上传操作
          const value = date.getMonth() + 1 + '.' + date.getDate() + '/' + date.getHours() + ':' + date.getMinutes() + text;
          textObject.set('value', value);
          textObject.save().then(() => {
            //then等待save执行完成后执行下面
            IN.value = ''; // 清空文本框
            bush_massages_out();
          });
        }
      }
    }
  });
}
bush_massages_in();

function bush_massages_out(params) {
  document.getElementById("massages_out").innerHTML = "BUSH";
  const query = new AV.Query('days');
  query.find().then(results => {
    results.forEach(record => {
      document.getElementById("massages_out").innerHTML += "<br>";
      document.getElementById("massages_out").innerHTML += record.get('value');
    })
  })
}
bush_massages_out();






/*

// 初始化 LeanCloud
AV.init({
  appId: 'YOUR_APP_ID',
  appKey: 'YOUR_APP_KEY'
});

// 获取表
var TestObject = AV.Object.extend('TestObject');

// 查询数据
var query = new AV.Query(TestObject);
query.equalTo('key', 'value');
query.find().then(function(results) {
  // 处理查询结果
  console.log(results);
}).catch(function(error) {
  // 处理错误
  console.error(error);
});



/*
var geshu;
var query = new AV.Query('bush');
query.select(['keys','values'])
query.count().then((count) => {
    geshu = (`${count}`);
    console.log(geshu);
});
*/



/*
//获取音视频
navigator.mediaDevices.getUserMedia({audio: true, video: true})
  .then(function(stream) {
    var videoElement = document.querySelector('video');
    videoElement.srcObject = stream;
  })
  .catch(function(err) {
    console.log('获取本地音视频流失败：' + err);
  });

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


var全局可变变量
let块级可变变量
const块级不变变量
*/
