import {dom} from "./dom.js";


function main(){
    dom.loadBoardsOnStartUp();
    dom.initAddBoardForm();
    let btn = document.querySelector("#submitBoard");
    let field = document.querySelector("#boardField");
    field.addEventListener("keydown",function(){
        btn.disabled = (field.value.length < 4);
    })

}



main();











