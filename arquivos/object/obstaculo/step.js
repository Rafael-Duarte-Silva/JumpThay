function obstaculoAnimicao(){
    if(obstaculo.x > -document.body.offsetWidth / 2){
        obstaculo.x -= 3;
        obstaculo.html.css("left", obstaculo.x+"px");
    
        obstaculo2.x -= 3;
        obstaculo2.html.css("left", obstaculo2.x+"px");
    }
    else{
        obstaculoSortearPosisao();
    }
}