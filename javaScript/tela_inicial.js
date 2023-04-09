$(document).ready(() => {
    $("#btn_comecar").click(() => {
        $("#btn_comecar").remove();
        CriarJogo();
        framesJogo();
    });
});