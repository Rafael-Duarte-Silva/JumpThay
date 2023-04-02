let player = {
    html: $("<img></img>"),
    hp: 10,
    xColisao: 0,
    yColisao: 0,
    x: 0,
    y: 0
}

let velocidade = 12;
let up = false;
let time = 0;

function playerCreate(){
    player.html.attr("src", "arquivos/sprite/player/spr_player.png");
    player.html.attr("id", "player");
    player.html.css("position", "relative");
    player.html.css("width", "160px");
    player.html.css("height", "160px");
    $("body").append(player.html);

    player.xColisao = document.getElementById("player").offsetWidth / 2;
    player.yColisao = document.getElementById("player").offsetHeight / 2;
}