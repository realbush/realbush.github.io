//可修改搜索引擎
var g = document.getElementById("google")
var d = document.getElementById("baidu")
var b = document.getElementById("bing")
AV.init({
    appId: "5r9cEk4P2ABVYozIf6nS6ZmO-gzGzoHsz",
    appKey: "DY1lYfRA7fDjPQKQXLCLk3L3",
    serverURL: "https://5r9cek4p.lc-cn-n1-shared.com"
});
function SE() {
    var x = document.getElementById("Search-Engines").value;

    if (x == "google") {
        b.type = "hidden";
        g.type = "text";
        d.type = "hidden";
    }
    else if (x == "baidu") {
        b.type = "hidden";
        g.type = "hidden";
        d.type = "text";
    }
    else {
        b.type = "text";
        g.type = "hidden";
        d.type = "hidden";
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
        document.getElementById('dingyi').innerHTML = values[num];
    }
    else {
        document.getElementById('x').innerHTML = 1;
        num = Math.floor(Math.random() * keys.length);
        document.getElementById('dingyi').innerHTML = keys[num];
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