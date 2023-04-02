let frames = 0;

function createJogo(){
    playerCreate();
    obstaculoSortearPosisao();
    $("body").keypress((event) => {
        if(event.key == "a" && player.x > -document.body.offsetWidth / 2 + player.xColisao){
            player.x -= velocidade;
            $("#player").css("left", player.x+"px");
        }
    
        if(event.key == "d" && player.x < document.body.offsetWidth / 2 - player.xColisao - velocidade){
            player.x += velocidade;
            $("#player").css("left", player.x+"px");
        }
    
        if(event.key == "w" && up == false){
            up = true;
            time = frames + 25;
        }
    });
}

function framesJogo(){
    let loop = setInterval(() => {
        frames += 1;
        obstaculoAnimicao();
        if(up == false){
            if(player.y < document.body.offsetHeight / 2 - player.yColisao - velocidade){
                player.y += 4;
                $("#player").css("top", player.y+"px");
            }
        }
        else if(frames < time){
            if(player.y > -document.body.offsetHeight / 2 + player.yColisao){   
                player.y -= 6;
                $("#player").css("top", player.y+"px"); 
            }
        }
        else{
            time = 0;
            up = false;
        }
    }, 10);
}