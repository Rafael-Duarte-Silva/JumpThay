let player = {
    html: $("<img></img>"),
    hp: 10,
}

let velocidade = 10;

let x = 0;
let y = 0;

function criar_elementos(){
    player.html.attr("src", "sprite/player/spr_player.png");
    player.html.attr("id", "player");
    player.html.css("position", "relative");
    player.html.css("width", "160px");
    player.html.css("height", "160px");
    $("body").append(player.html);
    
    player.colisao = document.getElementById("player").clientWidth / 2;
    

    $("body").keydown((event) => {
        if(event.key == "a" && x > -document.body.clientWidth / 2 + player.colisao){
            x -= velocidade;
            $("#player").css("left", x+"px");
        }

        if(event.key == "d" && x < document.body.clientWidth / 2 - player.colisao){
            x += velocidade;
            $("#player").css("left", x+"px");
        }
    });
}