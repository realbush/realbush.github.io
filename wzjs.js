//可修改搜索引擎
var g = document.getElementById("google")
var d = document.getElementById("baidu")
var b = document.getElementById("bing")

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
