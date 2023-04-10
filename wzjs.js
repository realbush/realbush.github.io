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
practice();
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

// 登录系统
function openlogin() {
  document.getElementById('login-modal').style.display = 'block';
}
function closelogin() {
  document.getElementById('login-modal').style.display = 'none';
}
function login() {
  AV.User.logIn(document.getElementById('username-in').value, document.getElementById('password-in').value).then(function (user) {
    const username = document.getElementById('username-in').value;
    const password = document.getElementById('password-in').value;
    AV.User.logIn(username, password).then(function (user) {
      localStorage.setItem('sessionToken', user.getSessionToken());// 保存登录信息
      closelogin();
      userstate();
    }).catch(function (error) {
      alert(error.message);
    });
  })
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
state();
// 开始
function state(params) {
  var sessionToken = localStorage.getItem('sessionToken');
  if (sessionToken) {//检测用户状态
    AV.User.become(sessionToken).then(function (user) {
      // 恢复登录成功，执行后续操作
      userstate();
    }).catch(function (error) {
      // 恢复登录失败，需要重新登录
    });
  }
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
    setTimeout(function () { update(username) }, 200);
  }
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
  setTimeout(function () { ToBottom() }, 200);
}
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
      if (text.charAt(0) == '-') {//'-'开头
        const query = new AV.Query(username);
        query.descending('createdAt');
        if (text.slice(1) == '') {   // 仅‘-’删除最后一项
          query.first().then((object) => {
            alert('你将会删除' + JSON.parse(JSON.stringify(object)).value);
            object.destroy().then(function () { //then等待destroy执行完成后执行下面
              IN.value = ''; // 清空文本框
              bush_massages_out(username);
            }).catch(function (error) {
              alert('删除失败: ' + error.message);
            });
          })
        }
        else {// '-'后有内容
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
      else {
        if (text && text.trim() != '') { // 检查文本框值是否为 undefined 或 null
          // 执行上传操作
          const time = date.getMonth() + 1 + '.' + date.getDate() + '/' + date.getHours() + ':' + date.getMinutes();
          textObject.set('time', time);
          textObject.set('value', text);
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
//实时更新
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
// 自动滚动到底部
function ToBottom() {
  var messages = document.getElementById("massages_out");// 获取要滚动的元素
  messages.scrollTop = messages.scrollHeight;
}