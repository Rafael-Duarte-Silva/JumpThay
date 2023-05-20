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
*Ao pular os pixels do player ficam "errados" provocando o erro logico de atravesar a parte de baixo da tela.
*a position relative por algum motivo ao adiconar um valor pela primeira vez ela o soma.

*herança de classes ou passar informações para o constructor.
*trocar os if do jogador especidicando a colisao da classe objeto.
*resetar o contador de obstaculos usando o if que determina quando um objeto passado pelo player.
*resetar o contador de frames usando as horas ou algo do tipo.

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
// CLASSES
// ==============================

class Jogador{
    constructor(){
        this.colisao = {
            baixo: 0,
            cima: 0,
            direita: 0,
            esquerda: 0,

            obstaculo: {
                proximo: 1,
                passou: false,
            },
        };

        this.posicao = {
            x: 0,
            y: 0,
        };

        this.tecla = {
            press: false,
        };

        this.tempo = 0;
    }

    criar(){
        let html = $("<img></img>");

        html.attr("src", "arquivos/sprite/player/spr_player.png");
        html.attr("id", "player");
        html.css("position", "fixed");
        html.css("width", "160px");
        html.css("height", "160px");

        html.css("z-index", "0");
        $("body").append(html);

        this.colisao.direita = document.getElementById("player").offsetLeft + document.getElementById("player").offsetWidth;
        this.colisao.esquerda = document.getElementById("player").offsetLeft;

        this.posicao.x = document.getElementById("player").offsetLeft;
        this.posicao.y = document.getElementById("player").offsetTop;
    };

    loop(){
        //VERIFICA SE PERDEU
        this.colisao.baixo = document.getElementById("player").offsetTop + document.getElementById("player").offsetHeight;
        this.colisao.cima = document.getElementById("player").offsetTop;

        //colisao chão
        if(this.colisao.baixo >= document.body.offsetHeight){
            
            return true;
        }

        //colisao obstaculo
        try{
            try{
                if(document.getElementById("obstaculo-"+this.colisao.obstaculo.proximo).offsetLeft + document.getElementById("obstaculo-"+this.colisao.obstaculo.proximo).offsetWidth <= this.colisao.esquerda){
                    this.colisao.obstaculo.passou = true;
                }
            }

            catch(erro){}

            if(obstaculo.informacoes.criado == true && this.colisao.obstaculo.passou == true){
                this.colisao.obstaculo.proximo += 2;

                obstaculo.informacoes.criado = false;
                this.colisao.obstaculo.passou = false;
                
            }
    
            if(pontuacao.pontuado == false && this.colisao.obstaculo.passou == true){
                pontuacao.ponto += 1;
                document.getElementById("pontuacao").innerText = "Pontuação: " + pontuacao.ponto;
                pontuacao.pontuado = true;
            }
    
            if(this.colisao.direita >= document.getElementById("obstaculo-"+this.colisao.obstaculo.proximo).offsetLeft && this.colisao.obstaculo.passou == false){
    
                if(this.colisao.baixo >= document.getElementById("obstaculo-"+this.colisao.obstaculo.proximo).offsetTop){
                    return true;
                }
    
                this.colisao.obstaculo.proximo += 1;
    
                if(this.colisao.cima <= document.getElementById("obstaculo-"+this.colisao.obstaculo.proximo).offsetTop + document.getElementById("obstaculo-"+this.colisao.obstaculo.proximo).offsetHeight){
                    return true;
                }

                this.colisao.obstaculo.proximo -= 1;
            }
        }
        catch(erro){}

        //MOVIMENTAÇÃO
        this.colisao.cima = document.getElementById("player").offsetTop;
        
        //descer
        if(framesCont > this.tempo){
            this.posicao.y += 4;
            $("#player").css("top", this.posicao.y+"px");
        }

        //subir
        else if(this.colisao.cima > 0){
            this.posicao.y -= 6;
            $("#player").css("top", this.posicao.y+"px"); 
        }

        //resetar cooldown de descer
        else{
            this.tempo = 0;
        }
    };
}
class Pontuacao{
    constructor(){
        this.ponto = 0;
        this.pontuado = false;
    }

    criar(){
        let html = $("<h1>Pontuação:</h1>")

        html.attr("id", "pontuacao");
        html.css("position", "fixed");
        html.css("left", "0");
        html.css("top", "0");

        html.css("z-index", "2");
        $("body").append(html);
    };
}
class Obstaculo{
    constructor(){
        this.colisao = {
            baixo: 0,
            cima: 0,
            direita: 0,
            esquerda: 0,
        }

        this.posicao = {
            x: 0,
            y: 0,
        };
    
        this.informacoes = {
            espacamentos: 200,
            id: 0,
            cont: 0,
            atual: 0,
            intervalo: 0,
            criado: false,
        };
    }

    criar(){
        this.informacoes.intervalo = framesCont + 400;
    
        let html = document.createElement("img");
    
        this.informacoes.id++;
    
        html.setAttribute("src", "arquivos/sprite/obstaculo/spr_obstaculo.png");
        html.setAttribute("id", "obstaculo-"+this.informacoes.id);
        html.style.position = "fixed";
        html.style.width = "162px";
        html.style.height = "500px";

        html.style.zIndex = 1;
        $("body").append(html);
    
        this.posicao.x = document.body.offsetWidth + 20;

        html.style.left = this.posicao.x+"px";
    
        let sorteioY = () => {
            let sorteio = Math.ceil( ( (Math.random() * document.body.offsetHeight) + document.getElementById("player").offsetHeight + this.informacoes.espacamentos ) / 20) * 20;

            if(sorteio > document.body.offsetHeight){
                sorteio -= sorteio - (document.body.offsetHeight - ( Math.floor( ( (Math.random() * 200) + 10) ) ) );

                html.style.top = sorteio+"px";
                console.log(sorteio);
            }

            else{
                html.style.top = sorteio+"px";
            }
        }
    
        sorteioY();
    
        html = document.createElement("img");
    
        this.informacoes.id++;
    
        html.setAttribute("src", "arquivos/sprite/obstaculo/spr_obstaculo.png");
        html.setAttribute("id", "obstaculo-"+this.informacoes.id);
        html.style.position = "fixed";
        html.style.width = "162px";
        html.style.height = "500px";

        html.style.zIndex = 1;
        $("body").append(html);
    
        this.informacoes.id--;
        
        this.posicao.y = document.querySelector("#obstaculo-"+this.informacoes.id).offsetTop - document.querySelector("#obstaculo-"+this.informacoes.id).offsetHeight - document.getElementById("player").offsetHeight - this.informacoes.espacamentos;
        html.style.top = this.posicao.y+"px";
        html.style.left = this.posicao.x+"px";
    
        this.informacoes.id++;
    };

    loop(){
        try{
            //REMOVER OBSTACULOS
            this.informacoes.atual = this.informacoes.id - this.informacoes.cont + 1;
            
            if(document.querySelector("#obstaculo-"+this.informacoes.atual).offsetLeft < 0 - document.querySelector("#obstaculo-"+this.informacoes.atual).offsetWidth){

                for(let i = this.informacoes.atual; i < this.informacoes.id - this.informacoes.cont + 3; i++){
                    $("#obstaculo-"+i).remove();
                }
                this.informacoes.cont -= 2;

            }

            //MOVER PARA ESQUERDA
            this.informacoes.atual = this.informacoes.id - this.informacoes.cont + 1;

            for(let i = this.informacoes.atual; i < this.informacoes.id + 1; i++){
                let x = document.querySelector("#obstaculo-"+i).offsetLeft;

                x -= 3;
                document.querySelector("#obstaculo-"+i).style.left = x+"px";
            }
        }
        catch(erro){}

        //sorteio OBSTACULOS
        if(framesCont >= this.informacoes.intervalo){
            this.criar();
            this.informacoes.cont += 2;
            this.informacoes.criado = true;
            pontuacao.pontuado = false;
        }
    };
}

// ==============================
// OBJETOS
// ==============================

let jogador = new Jogador;
let pontuacao = new Pontuacao;
let obstaculo = new Obstaculo;

// ==============================
// JOGO
// ==============================

function jogo(){
    jogador.criar();
    pontuacao.criar();
    obstaculo.criar();
    obstaculo.informacoes.cont += 2;

    frames();
}

// ==============================
// LOOP
// ==============================

let framesCont = 0;

function frames(){
    $("body").keydown((event) => { 
        if(event.key == "w" && jogador.tecla.press == false){
            jogador.tempo = framesCont + 25;
            jogador.tecla.press = true;

            $("body").keyup(() => {
                jogador.tecla.press = false;
            });
        }

        if(event.key == "Enter"){
            clearInterval(loop);
        }
    });

    let loop = setInterval(() => {
        framesCont += 1;

        if(jogador.loop()){
            clearInterval(loop);
        }
        obstaculo.loop();

        /* 
        if(framesCont > 100 && this.tempo == 0){
            framesCont = 0;
        }
        */     
    }, 10);
}