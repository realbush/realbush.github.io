var g = document.getElementById("google")
var d = document.getElementById("baidu")
var b = document.getElementById("bing")

function searchs() {
    var x = document.getElementById("searchs").value;

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