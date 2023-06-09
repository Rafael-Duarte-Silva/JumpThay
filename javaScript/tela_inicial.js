$(document).ready(() => {
    $("#btn_comecar").click(() => {
        $("#btn_secao").remove();    
        jogo.desenhar();
    });

    $("#btn_opcoes").click(() => {
        let html = $("<div></div>");

        html.attr("id", "opcao");
        html.css("position", "fixed");
        html.css("width", "110px");
        html.css("height", "110px");
        html.css("background-color", "red");

        html.css("z-index", "100");

        $("body").append(html);

    });
});