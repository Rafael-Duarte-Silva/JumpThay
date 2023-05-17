//Todo metodo de entra no DOM também tem uma saida (normalmente mais de uma).
//Não confudir metodos do jquey com os metodos DOM.
//Conta em concatenação não dá certo.
//Todos os metodos em js respeita as regras de matematica.
//Certos nomes de variaveis e funções que varia em cada linguagem pode dar conflito com os nomes atribuidos a mesma.
//Sempre criar nomes respeitando a regra de sla quem. Ex: carroFord.


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
*Trocar objeto "obstaculo" para classe.

* NIVEIS:

*nivel que os canos já passados pelo jogador voltam ou voltam os canos em posições invertidas.
*nivel que deixa os canos mais rapidos (isso é o basico para dificultar uma gameplay).
*nivel que inverte os controles do jogador.
*nivel que fica desacelerando o tempo e fica acelerando.
*nivel que os canos abrem e fecham.
*nivel que os canos mudam de posição.
*nivel que o a passagem entre os canos ficam menores.
*nivel que os canos ficam invisiveis.

* IMPLEMENTAÇÃO:

*Utilização de scss
*/

// ==============================
// PLAYER E SUAS CONFIGURAÇÕES
// ==============================

let player = {
    colisaoY: 0,
    colisaoX: 0,
    y: 0,
    x: 0,

    press: false,

    tempo: 0,

    criar(){
        let html = $("<img></img>")

        html.attr("src", "arquivos/sprite/player/spr_player.png");
        html.attr("id", "player");
        html.css("position", "relative");
        html.css("width", "160px");
        html.css("height", "160px");
        $("body").append(html);

        player.colisaoY = document.getElementById("player").offsetHeight / 2;
        player.colisaoX = document.getElementById("player").offsetWidth / 2;
    },

    loop(){
        perdeu();
        movimentacao();
        
        function perdeu(){
            //colisao chão
            if(player.y >= document.body.offsetHeight / 2 - player.colisaoY - 4){
                //$("body").empty();

                return true;
            }

            //colisao obstaculo
            if(document.body.offsetWidth / 2 - document.getElementById("player").offsetWidth / 2 > document.getElementById("obstaculo-"+obstaculo.id).offsetLeft - document.getElementById("obstaculo-"+obstaculo.id).offsetWidth){
                console.log("colisão");

                return true;
            }
        }

        function movimentacao(){
            if(perdeu() != true){

                //subir
                if(framesCont > player.tempo){
                    player.y += 4;
                    $("#player").css("top", player.y+"px");
                }

                //descer
                else if(player.y > -document.body.offsetHeight / 2 + player.colisaoY){
                    player.y -= 6;
                    $("#player").css("top", player.y+"px"); 
                }

                //resetar cooldown de descer
                else{
                    player.tempo = 0;
                }
            }
        }
    }
}

// ==============================
// OBSTACULO E SUAS CONFIGURAÇÕES
// ==============================

let obstaculo = {
    html: document.createElement("img"),

    x: 0,
    y: 0,

    id: 0,
    cont: 0,
    atual: 0,
    intervalo: 0,

    criar(){
        obstaculo.intervalo = framesCont + 205;
    
        obstaculo.html = document.createElement("img");
    
        obstaculo.id++;
    
        obstaculo.html.setAttribute("src", "arquivos/sprite/obstaculo/spr_obstaculo.png");
        obstaculo.html.setAttribute("id", "obstaculo-"+obstaculo.id);
        obstaculo.html.style.position = "fixed";
        obstaculo.html.style.width = "162px";
        obstaculo.html.style.height = "500px";
        $("body").append(obstaculo.html);
    
        obstaculo.x = document.body.offsetWidth + 20;
    
        let sorteio = Math.floor(Math.random() * document.querySelector("#obstaculo-"+obstaculo.id).offsetHeight) + document.body.offsetHeight - document.querySelector("#obstaculo-"+obstaculo.id).offsetHeight;
        let ySortear = Math.ceil(sorteio / 50) * 50;
    
        obstaculo.html.style.top = ySortear+"px";
        obstaculo.html.style.left = obstaculo.x+"px";
    
        obstaculo.html = document.createElement("img");
    
        obstaculo.id++;
    
        obstaculo.html.setAttribute("src", "arquivos/sprite/obstaculo/spr_obstaculo.png");
        obstaculo.html.setAttribute("id", "obstaculo-"+obstaculo.id);
        obstaculo.html.style.position = "fixed";
        obstaculo.html.style.width = "162px";
        obstaculo.html.style.height = "500px";
        $("body").append(obstaculo.html);
    
        obstaculo.id--;
        
        obstaculo.y = document.querySelector("#obstaculo-"+obstaculo.id).offsetTop - document.querySelector("#obstaculo-"+obstaculo.id).offsetHeight - document.getElementById("player").offsetHeight - 90;
        obstaculo.html.style.top = obstaculo.y+"px";
        obstaculo.html.style.left = obstaculo.x+"px";
    
        obstaculo.id++;
    },

    loop(){
        removerObstaculo();
        moverEsquerda();
        sortearObstaculo();

        function removerObstaculo(){
            obstaculo.atual = obstaculo.id - obstaculo.cont + 1;

            if(document.querySelector("#obstaculo-"+obstaculo.atual).offsetLeft < 0 - document.querySelector("#obstaculo-"+obstaculo.atual).offsetWidth){

                for(let i = obstaculo.id - obstaculo.cont + 1; i < obstaculo.id - obstaculo.cont + 3; i++){
                    $("#obstaculo-"+i).remove();
                }
                obstaculo.cont -= 2;
    
            }
        }

        function moverEsquerda(){
            for(let i = obstaculo.id - obstaculo.cont + 1; i < obstaculo.id + 1; i++){
                let x = document.querySelector("#obstaculo-"+i).offsetLeft;

                x -= 3;
                document.querySelector("#obstaculo-"+i).style.left = x+"px";
            }
        }
        
        function sortearObstaculo(){
            if(framesCont >= obstaculo.intervalo){
                obstaculo.criar();
                obstaculo.cont += 2;
            }
        }
    }
}

// ==============================
// JOGO
// ==============================

function jogo(){
    player.criar();
    obstaculo.criar();
    obstaculo.cont += 2;

    frames();
}

// ==============================
// LOOP
// ==============================

let framesCont = 0;

function frames(){
    $("body").keydown((event) => { 
        if(event.key == "w" && player.press == false){
            player.tempo = framesCont + 25;
            player.press = true;

            $("body").keyup(() => {
                player.press = false;
            });
        }
    });

    let loop = setInterval(() => {
        framesCont += 1;

        player.loop();
        obstaculo.loop();

        /* 
        if(framesCont > 100 && player.tempo == 0){
            framesCont = 0;
        }
        */     
    }, 10);
}