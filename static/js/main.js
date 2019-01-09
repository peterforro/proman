let dom = {
    create_board: function (board) {
        let boardTemplate = document.querySelector("#boardTemplate");
        let boardClone = document.importNode(boardTemplate.content, true);
        boardClone.querySelector(".board").setAttribute("id",`board_${board.id}`);
        boardClone.querySelector(".board .boardName").textContent = board.name;
        document.querySelector("#boardContainer").appendChild(boardClone);
    }
};



let datamanager = {
    putBoard : function(){
        let formdata = new FormData();
        let boardName = document.querySelector("#boardField").value;
        formdata.append("name",boardName);
        fetch(`http://127.0.0.1:5000/create_board`,{method:'POST',body:formdata})
	        .then(response => response.json())
	        .then(board => {
	            dom.create_board(board);
	            let newBoard = document.querySelector(`#board_${board.id}`);
                let cardContainer = Array.from(newBoard.querySelectorAll(".cardContainer"));
                dragula(cardContainer);
            });
    }
};




function getBoards(){
    fetch("http://127.0.0.1:5000/load_boards",{method:'GET'})
        .then(response => response.json())
        .then(boards =>{
            for(let board of boards){
                dom.create_board(board);
            }
        })
}



window.addEventListener("load",getBoards);

// getBoards();


let addBoardBtn = document.querySelector("#submitBoard");
addBoardBtn.addEventListener("click",function(event){
    datamanager.putBoard();
});


