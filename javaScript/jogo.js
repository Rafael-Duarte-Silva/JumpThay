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
*Ao pular os pixels do jogador ficam "errados" provocando o erro logico de atravesar a parte de baixo da tela.
*A position relative por algum motivo ao adiconar um valor pela primeira vez ela o soma.

*Herança de classes ou passar informações para o constructor.
*Trocar os if do jogador especidicando a colisao da classe objeto.
*Resetar o contador de obstaculos usando o if que determina quando um objeto passado pelo jogador.
*Resetar o contador de frames usando as horas ou algo do tipo.
*Usar o metodo animate para mover os elementos.
*Fazer compensação de pixels por frame.
*Deixar o codigo mais bonito/organizado. ex: criar uma função para os "for" que movimentam os elementos.
*Criar variaveis para o time, por exemplo.
*fazer uma classe jogo.
*fazer a classe osbtaculo ser uma superclass.
*um switch case onde cada class terá um valor que ordenará se é para criar/deletar aquele elemento e um loop que rodara em um intervalo maior (isso pode ser desencadeado com o local do mapa, acho que gasta menos processamento).


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
// Classes
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

        html.attr("src", "arquivos/sprite/jogador/spr_jogador.png");
        html.attr("id", "jogador");
        html.css("position", "fixed");
        html.css("width", "110px");
        html.css("height", "110px");

        html.css("z-index", "0");

        $("body").append(html);

        this.colisao.direita = document.getElementById("jogador").offsetLeft + document.getElementById("jogador").offsetWidth;
        this.colisao.esquerda = document.getElementById("jogador").offsetLeft;

        this.posicao.x = document.getElementById("jogador").offsetLeft;
        this.posicao.y = document.getElementById("jogador").offsetTop;
    }

    loop(){
        this.mover();
        return this.colisaoObstaculos() || this.colisaoChao();
    }

    mover(){
        //MOVIMENTA O JOGADOR
        this.colisao.cima = document.getElementById("jogador").offsetTop;
        
        //descer
        if(jogo.framesCont > this.tempo){
            jogo.movimento(this, "jogador", "baixo", 4);
        }

        //subir
        else if(this.colisao.cima > 0){
            jogo.movimento(this, "jogador", "cima", 6);
        }

        //resetar cooldown de descer
        else{
            this.tempo = 0;
        }
    };

    colisaoObstaculos(){
        //VERIFICA SE HOUVE COLISÃO DO JOGADOR COM OBSTACULO
        this.colisao.baixo = document.getElementById("jogador").offsetTop + document.getElementById("jogador").offsetHeight;
        this.colisao.cima = document.getElementById("jogador").offsetTop;

        //colisao obstaculo
        try{
            obstaculo.colisao.baixo = document.getElementById("obstaculo-"+this.colisao.obstaculo.proximo).offsetTop + document.getElementById("obstaculo-"+this.colisao.obstaculo.proximo).offsetHeight;
            obstaculo.colisao.cima = document.getElementById("obstaculo-"+this.colisao.obstaculo.proximo).offsetTop;
            obstaculo.colisao.direita = document.getElementById("obstaculo-"+this.colisao.obstaculo.proximo).offsetLeft + document.getElementById("obstaculo-"+this.colisao.obstaculo.proximo).offsetWidth;
            obstaculo.colisao.esquerda = document.getElementById("obstaculo-"+this.colisao.obstaculo.proximo).offsetLeft;

            if(this.colisao.esquerda <= obstaculo.colisao.direita){

                if(this.colisao.direita >= obstaculo.colisao.esquerda){

                    if(this.colisao.baixo >= obstaculo.colisao.cima){
                        return true;
                    }
 
                    this.colisao.obstaculo.proximo += 1;

                    obstaculo.colisao.baixo = document.getElementById("obstaculo-"+this.colisao.obstaculo.proximo).offsetTop + document.getElementById("obstaculo-"+this.colisao.obstaculo.proximo).offsetHeight;

                    if(this.colisao.cima <= obstaculo.colisao.baixo){

                        return true;
                    }
    
                    this.colisao.obstaculo.proximo -= 1;
                }
            }

            else{
                pontuacao.ponto += 1;
                document.getElementById("pontuacao").innerText = "Pontuação: " + pontuacao.ponto;

                this.colisao.obstaculo.proximo += 2;
            }
        }
        catch(erro){}
    }

    colisaoChao(){
        //VERIFICA SE HOUVE COLISÃO DO JOGADOR COM O CHAO

        //colisao chão
        if(this.colisao.baixo >= document.body.offsetHeight){
            return true;
        }
    }

    
}
class Obstaculo{
    constructor(){
        this.colisao = {
            baixo: 0,
            cima: 0,
            direita: 0,
            esquerda: 0,
        };

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
        };
    }

    criar(){
        this.informacoes.intervalo = jogo.framesCont + 250;
    
        //obstaculo de baixo
        let html = document.createElement("img");
    
        this.informacoes.id++;
    
        html.setAttribute("src", "arquivos/sprite/obstaculo/spr_obstaculo.png");
        html.setAttribute("id", "obstaculo-"+this.informacoes.id);
        html.style.position = "fixed";
        html.style.width = "140px";
        html.style.height = "500px";

        html.style.zIndex = 1;
        $("body").append(html);
    
        this.posicao.x = document.body.offsetWidth + 20;

        html.style.left = this.posicao.x+"px";
    
        let sorteioY = Math.ceil( ( (Math.random() * document.body.offsetHeight) + document.getElementById("jogador").offsetHeight + this.informacoes.espacamentos ) / 20) * 20;
        if(sorteioY > document.body.offsetHeight){
            sorteioY -= sorteioY - (document.body.offsetHeight - ( Math.floor( ( (Math.random() * 200) + 10) ) ) );

            html.style.top = sorteioY+"px";
        }

        else{
            html.style.top = sorteioY+"px";
        }
    
        //obstaculo de cima
        html = document.createElement("img");
    
        this.informacoes.id++;
    
        html.setAttribute("src", "arquivos/sprite/obstaculo/spr_obstaculo.png");
        html.setAttribute("id", "obstaculo-"+this.informacoes.id);
        html.style.position = "fixed";
        html.style.width = "140px";
        html.style.height = "500px";

        html.style.zIndex = 1;
        $("body").append(html);
    
        this.informacoes.id--;
        
        this.posicao.y = document.querySelector("#obstaculo-"+this.informacoes.id).offsetTop - document.querySelector("#obstaculo-"+this.informacoes.id).offsetHeight - document.getElementById("jogador").offsetHeight - this.informacoes.espacamentos;
        html.style.top = this.posicao.y+"px";
        html.style.left = this.posicao.x+"px";
    
        this.informacoes.id++;
    }

    loop(){
        this.remover();
        this.mover();
        this.desenhar();
    }

    remover(){
        try{
            //VERIFICA SE HÁ OBSTACULOS PARA REMOVER
            this.informacoes.atual = this.informacoes.id - this.informacoes.cont + 1;
            
            if(document.querySelector("#obstaculo-"+this.informacoes.atual).offsetLeft < 0 - document.querySelector("#obstaculo-"+this.informacoes.atual).offsetWidth){

                for(let i = this.informacoes.atual; i < this.informacoes.id - this.informacoes.cont + 3; i++){
                    $("#obstaculo-"+i).remove();
                }
                this.informacoes.cont -= 2;

            }
        }
        catch(erro){}
    }

    mover(){
        try{
            //MOVE OS OBSTACULOS PARA A ESQUERDA
            this.informacoes.atual = this.informacoes.id - this.informacoes.cont + 1;

            for(let i = this.informacoes.atual; i < this.informacoes.id + 1; i++){
                this.posicao.x = document.querySelector("#obstaculo-"+i).offsetLeft;

                jogo.movimento(this, "obstaculo-"+i, "esquerda", 3);
            }
        }
        catch(erro){}
    }

    desenhar(){
        //DESENHAR OBSTACULOS DE ACORDO COM INTERVALO DE TEMPO DETERMINADO
        if(jogo.framesCont >= this.informacoes.intervalo){
            this.criar();
            this.informacoes.cont += 2;
        }
    }
}
class Pontuacao{
    constructor(){
        this.ponto = 0;
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

// ==============================
// Objetos
// ==============================

let jogador = new Jogador;
let obstaculo = new Obstaculo;
let pontuacao = new Pontuacao;

// ==============================
// Teclado
// ==============================

class Teclado{
    constructor(){
        this.listaTeclas = {
            subir: ["KeyW", "ArrowUp", "Space",],
            pause: ["Enter", "KeyP"],
        }
    }

    teclaApertada(){
        //teclas apertadas
        $("body").keydown((e) => {
            switch(this.tecla(e)){
                case "subir":
                    if(jogador.tecla.press == false){
                        jogador.tempo = jogo.framesCont + 25;
                        jogador.tecla.press = true;
                    }
                    break;

                case "pause":
                    if(this.pausado == false){
                        this.pausado = true;
                    }

                    else{
                        this.pausado = false;
                    }
                    break;
            }
        });


        //teclas soltas
        $("body").keyup((e) => {
            switch(this.tecla(e)){
                case "subir":
                    jogador.tecla.press = false;
                    break;
            } 
        });
    }

    tecla(e){           
        for(let i = 0; i < this.listaTeclas.subir.length; i++){
            if(this.listaTeclas.subir[i] == e.code){
                return "subir";
            }
        }

        for(let i = 0; i < this.listaTeclas.pause.length; i++){
            if(this.listaTeclas.pause[i] == e.code){
                return "pause";
            }
        }
    }
}

let teclado = new Teclado;

// ==============================
// JOGO
// ==============================

class Jogo{
    constructor(){
        this.framesCont = 0;
        this.loop = 0,
        this.pausado = false;
    }

    desenhar(){
        jogador.criar();
        pontuacao.criar();
        obstaculo.criar();
        obstaculo.informacoes.cont += 2;

        this.frames();
    }

    frames(){
        teclado.teclaApertada();

        this.loop = setInterval(() => {
            if(this.pausado == false){
                this.framesCont += 1;

                if(jogador.loop()){
                    clearInterval(this.loop);
                    this.perdeu();
                }
                obstaculo.loop();
            }     
        }, 10);
    }

    movimento(objeto, id, direcao, velocidade){
        switch(direcao){
            case "baixo":
                for(let i = 0; i < velocidade; i++){
                    objeto.posicao.y += 1;
                    document.getElementById(id).style.top = objeto.posicao.y+"px";
                }
                break;
    
            case "cima":
                for(let i = 0; i < velocidade; i++){
                    objeto.posicao.y -= 1;
                    document.getElementById(id).style.top = objeto.posicao.y+"px";
                }
                break;
    
            case "direita":
                for(let i = 0; i < velocidade; i++){
                    objeto.posicao.x += 1;
                    document.getElementById(id).style.left = objeto.posicao.x+"px";
                }
                break;
    
            case "esquerda":
                for(let i = 0; i < velocidade; i++){
                    objeto.posicao.x -= 1;
                    document.getElementById(id).style.left = objeto.posicao.x+"px";
                }
                break;
        }
    }

    perdeu(){
        console.log("perdeu");
    }
}

let jogo = new Jogo;