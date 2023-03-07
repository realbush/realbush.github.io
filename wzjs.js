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
function shijian() {
    var date = new Date();
    var now = "";
    if (date.getHours() < 10) {
        hours = "0" + date.getHours();
    }
    else {
        hours = date.getHours();
    }
    if (date.getMinutes() < 10) {
        minutes = "0" + date.getMinutes();
    }
    else {
        minutes = date.getMinutes();
    }
    if (date.getSeconds() < 10) {
        seconds = "0" + date.getSeconds();
    }
    else {
        seconds = date.getSeconds();
    }
    now = now + hours + ":" + minutes + ":" + seconds;

    document.getElementById("time").innerHTML = now;
    setTimeout("shijian()", 1000);
}
var dingyi  = ["跳过", "测试", "尝试一下"]
var neirong = {"跳过":"tiaoguo", "测试":"ceshi", "尝试一下":"changshiyixia"};
function choucha() {
    var suiji;
    var x;

    x = document.getElementById("x").innerHTML;
    if (x == 1) {
        document.getElementById('x').innerHTML=0;
        document.getElementById('dingyi').innerHTML =neirong[document.getElementById('dingyi').innerHTML];
    }
    else {
        document.getElementById('x').innerHTML=1;
        document.getElementById('dingyi').innerHTML = dingyi[Math.floor(Math.random() * dingyi.length)];
    }
}
