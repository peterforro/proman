let dom = {
    create_board: function () {
        let boardTemplate = document.querySelector("#boardTemplate");
        let boardClone = document.importNode(boardTemplate.content, true);
        document.querySelector("#boardContainer").appendChild(boardClone);
    },
};

let gomb = document.querySelector("#addBoard");
    gomb.addEventListener("click",function(event){
    dom.create_board();
    let board = Array.from(document.querySelectorAll(".board"));
    board = board[board.length-1];
    let cardContainer = Array.from(board.querySelectorAll(".cardContainer"));
    dragula(cardContainer);

});


