/*
Dependendo da aplicação aquivos que estão em caminhos diferentes precisam do / antes 
de chamar a sua localização. 
Obs: nem sempre é bom colocar a barra(/), pois principalmente no github pode dar problemas.
*/


/* BUG

Apesar do "for" ser falso o comando abaixo é executado

for(let i = 0; i > 1; i++){
    $("#obstaculo-"+i).remove();
}

*/


/* NOTAÇÕES

*Trocar if para quando for verdadeiro e não até quando é verdadeiro.
*Tentar relacionar o evento de teclas com os frames.
*Implementar responsividade em tempo real.
*Posso colocar um cooldown no "pulo".
*/


let player = {
    html: $("<img></img>"),

    hp: 10,

    yColisao: 0,
    y: 0,

    press: false,

    tempo: 0,
}

let obstaculo = {
    html: document.createElement("img"),

    x: 0,
    y: 0,

    num: 0,
    cont: 0,
    atual: 0,
    intervalo: 0,
}

let frames = 0;

function CriarJogo(){
    player.html.attr("src", "arquivos/sprite/player/spr_player.png");
    player.html.attr("id", "player");
    player.html.css("position", "relative");
    player.html.css("width", "160px");
    player.html.css("height", "160px");
    $("body").append(player.html);

    player.yColisao = document.getElementById("player").offsetHeight / 2;

    obstaculoCriar();
    obstaculo.cont += 2;
}

function framesJogo(){
    $("body").keydown((event) => { 
        if(event.key == "w" && player.press == false){
            player.tempo = frames + 25;
            player.press = true;

            $("body").keyup(() => {
                player.press = false;
            });
        }
    });

    let loop = setInterval(() => {
        frames += 1;

        if(frames > player.tempo && player.y < document.body.offsetHeight / 2 - player.yColisao - 4){  
            player.y += 4;
            $("#player").css("top", player.y+"px");
        }
        else if(frames < player.tempo){
            if(player.y > -document.body.offsetHeight / 2 + player.yColisao){   
                player.y -= 6;
                $("#player").css("top", player.y+"px"); 
            }
        }
        else{
            player.tempo = 0;
        }

        /* 
        if(frames > 100 && player.tempo == 0){
            frames = 0;
        }
        */

        atualObstaculo = obstaculo.num - obstaculo.cont + 1;

        if(document.querySelector("#obstaculo-"+atualObstaculo).offsetLeft > 0 - document.querySelector("#obstaculo-"+atualObstaculo).offsetWidth){
            
            for(let i = obstaculo.num - obstaculo.cont + 1; i < obstaculo.num + 1; i++){
                let x = document.querySelector("#obstaculo-"+i).offsetLeft;

                x -= 3;
                document.querySelector("#obstaculo-"+i).style.left = x+"px";
            }

        }
        else{

            for(let i = obstaculo.num - obstaculo.cont + 1; i < obstaculo.num - obstaculo.cont + 3; i++){
                $("#obstaculo-"+i).remove();
            }
            obstaculo.cont -= 2;

        }

        if(frames == obstaculo.intervalo){
            obstaculoCriar();
            obstaculo.cont += 2;
        }
    }, 10);
}

function obstaculoCriar(){
    obstaculo.intervalo = frames + 205;

    obstaculo.html = document.createElement("img");

    obstaculo.num++;

    obstaculo.html.setAttribute("src", "arquivos/sprite/obstaculo/spr_obstaculo.png");
    obstaculo.html.setAttribute("id", "obstaculo-"+obstaculo.num);
    obstaculo.html.style.position = "fixed";
    obstaculo.html.style.width = "162px";
    obstaculo.html.style.height = "500px";
    $("body").append(obstaculo.html);

    obstaculo.x = document.body.offsetWidth + 20;

    let sorteio = Math.floor(Math.random() * document.querySelector("#obstaculo-"+obstaculo.num).offsetHeight) + document.body.offsetHeight - document.querySelector("#obstaculo-"+obstaculo.num).offsetHeight;
    let ySortear = Math.floor(sorteio / 50) * 50;

    obstaculo.html.style.top = ySortear+"px";
    obstaculo.html.style.left = obstaculo.x+"px";

    obstaculo.html = document.createElement("img");

    obstaculo.num++;

    obstaculo.html.setAttribute("src", "arquivos/sprite/obstaculo/spr_obstaculo.png");
    obstaculo.html.setAttribute("id", "obstaculo-"+obstaculo.num);
    obstaculo.html.style.position = "fixed";
    obstaculo.html.style.width = "162px";
    obstaculo.html.style.height = "500px";
    $("body").append(obstaculo.html);

    obstaculo.num--;
    
    obstaculo.y = document.querySelector("#obstaculo-"+obstaculo.num).offsetTop - document.querySelector("#obstaculo-"+obstaculo.num).offsetHeight - document.getElementById("player").offsetHeight - 90;
    obstaculo.html.style.top = obstaculo.y+"px";
    obstaculo.html.style.left = obstaculo.x+"px";

    obstaculo.num++;
}
