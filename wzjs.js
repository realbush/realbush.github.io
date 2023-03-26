var resultcount = 0;
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
// 上传信息
function bush_massages_in(username) {
  const TextObject = AV.Object.extend(username);
  const textObject = new TextObject();
  const IN = document.getElementById('in');
  IN.addEventListener('keydown', function (event) {

    if (event.key == 'Enter' && !event.shiftKey) {
      event.preventDefault(); // 阻止回车键默认行为
      // 创建一个文本对象
      const TextObject = AV.Object.extend(username);
      const textObject = new TextObject();
      const IN = document.getElementById('in');
      const date = new Date();
      const text = IN.value;
      //删除信息
      if (text.charAt(0) == '-') {
        //检测到'-'开头执行删除操作
        const query = new AV.Query(username);
        query.descending('createdAt');
        // 仅输入‘-’删除最后一项
        if (text.slice(1) == '') {
          query.first().then((object) => {
            // JSON.parse()将JSON信息解析成JavaScript对象
            // JSON.stringify() 方法将 JavaScript 对象转换为 JSON 字符串
            alert('你将会删除' + JSON.parse(JSON.stringify(object)).value);
            object.destroy().then(function () { //then等待destroy执行完成后执行下面
              IN.value = ''; // 清空文本框
              bush_massages_out(username);
            }).catch(function (error) {
              alert('删除失败: ' + error.message);
            });
          })
        }
        // 有删除内容时执行删除内容对应的项
        else {
          query.equalTo('value', text.slice(1));
          query.first().then((object) => {
            if (object) {
              alert('你将会删除' + JSON.parse(JSON.stringify(object)).value);
              object.destroy().then(function () { //then等待destroy执行完成后执行下面
                IN.value = ''; // 清空文本框
                bush_massages_out(username);
              }).catch(function (error) {
                alert('删除失败: ' + error.message);
              });
            }
            else {
              alert('未找到');
              IN.value = ''; // 清空文本框
            }
          })
        }
      }
      // 上传信息
      else {
        if (text && text.trim() != '') { // 检查文本框值是否为 undefined 或 null
          // 执行上传操作
          const value = text;
          const time = date.getMonth() + 1 + '.' + date.getDate() + '/' + date.getHours() + ':' + date.getMinutes();
          textObject.set('time', time);
          textObject.set('value', value);
          textObject.save().then(() => {
            //then等待save执行完成后执行下面
            IN.value = ''; // 清空文本框
            bush_massages_out(username);
          });
        }
      }
    }
  });
}
//获取展示信息

function bush_massages_out(username) {
  document.getElementById("massages_out").innerHTML = username;
  const query = new AV.Query(username);
  query.find().then(results => {
    results.forEach(record => {
      document.getElementById("massages_out").innerHTML += "<br>";
      document.getElementById("massages_out").innerHTML += record.get('time');
      document.getElementById("massages_out").innerHTML += record.get('value');
    })
  })
  query.count().then((object) => {
    resultcount = object;
  })
}


// 登录系统
function openlogin() {
  document.getElementById('login-modal').style.display = 'block';
}

function closelogin() {
  document.getElementById('login-modal').style.display = 'none';
}

function login() {
  const username = document.getElementById('username-in').value;
  const password = document.getElementById('password-in').value;
  AV.User.logIn(username, password).then(function (user) {
    localStorage.setItem('sessionToken', user.getSessionToken());// 保存登录信息
    closelogin();
    userstate();
  }).catch(function (error) {
    alert(error.message);
  });
}
// 注册系统
function opensignup() {
  document.getElementById('signup-modal').style.display = 'block';
}

function closesignup() {
  document.getElementById('signup-modal').style.display = 'none';
}

function signup() {

  // 获取用户输入的注册信息
  const username = document.getElementById('username-up').value;
  const password = document.getElementById('password-up').value;
  const user = new AV.User();
  user.setUsername(username);
  user.setPassword(password);
  user.signUp().then(function (user) {
    closesignup();
  }).catch(function (error) {
    alert(error.message);
  });
}

// 注销系统
function signout() {
  const currentUser = AV.User.current();
  const username = currentUser.get('username');
  alert(username + '即将滚蛋')
  AV.User.logOut().then(() => {
    // 成功退出登录
    location.reload();
  }, (error) => {
    // 处理退出登录错误
  });
}

// 更新用户信息
function userstate(params) {
  var currentUser = AV.User.current();
  if (currentUser) {
    // 根据用户角色查询某个数据表中的内容
    const username = currentUser.get('username');
    document.getElementById('user').style.display = 'block';
    document.getElementById('login-button').style.display = 'none';
    document.getElementById('signup-button').style.display = 'none';
    document.getElementById('signout-button').style.display = 'block';
    document.getElementById('user').innerHTML = username;
    bush_massages_out(username);
    bush_massages_in(username);
    setTimeout(function () { update() }, 5000);
  }
}
userstate();

// 检测用户登录状态
function state(params) {
  var sessionToken = localStorage.getItem('sessionToken');
  if (sessionToken) {
    AV.User.become(sessionToken).then(function (user) {
      // 恢复登录成功，执行后续操作
    }).catch(function (error) {
      // 恢复登录失败，需要重新登录
    });
  }
}
state();

// 实时更新(每一秒更新一次)
function update(username) {
  const query = new AV.Query(username);
  query.count().then((object) => {
    if (object != resultcount) {
      bush_massages_out(username);
      resultcount = object;
    }
  })
  setTimeout(function () { update(username) }, 1000);
}

// 将class和之前做对比
// 不同就更新
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
 
 
var函数域可变变量
let块级可变变量
const块级不变变量
*/
