$(document).ready(() => {
    let btnComecar = $("#btn_comecar");

    btnComecar.click(() => {
        btnComecar.remove();
        criar_elementos();
    });
});