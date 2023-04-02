let obstaculo = {
    html: $("<img></img>"),
    x: 0,
    y: 0
}

let obstaculo2 = {
    html: $("<img></img>"),
    x: 0,
    y: 0
}

function obstaculoSortearPosisao(){
    obstaculo.html.attr("src", "arquivos/sprite/obstaculo/spr_obstaculo.png");
    obstaculo.html.attr("id", "obstaculo");
    obstaculo.html.css("position", "fixed");
    obstaculo.html.css("width", "162px");
    obstaculo.html.css("height", "500px");
    
    obstaculo2.html.attr("src", "arquivos/sprite/obstaculo/spr_obstaculo.png");
    obstaculo2.html.attr("id", "obstaculo2");
    obstaculo2.html.css("position", "fixed");
    obstaculo2.html.css("width", "162px");
    obstaculo2.html.css("height", "500px");
    $("body").append(obstaculo.html, obstaculo2.html);
    
    let xSortear = document.body.offsetWidth + 100;
    let ySortear = Math.floor(Math.random() * (document.getElementById("obstaculo").offsetHeight - 30)) + document.body.offsetHeight - document.getElementById("obstaculo").offsetHeight;
    
    obstaculo.html.css("top", ySortear+"px");
    obstaculo.html.css("left", xSortear+"px");
    
    obstaculo.x = document.getElementById("obstaculo").offsetLeft;
    
    obstaculo2.y = document.getElementById("obstaculo").offsetTop - document.getElementById("obstaculo").offsetHeight - document.getElementById("player").offsetHeight - 90;
    obstaculo2.html.css("top", obstaculo2.y+"px");
    obstaculo2.html.css("left", obstaculo.x+"px");
    
    obstaculo2.x = document.getElementById("obstaculo2").offsetLeft;
}