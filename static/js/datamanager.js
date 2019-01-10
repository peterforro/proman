import {dom} from "./dom.js";


export let datamanager = {

    postBoard : function(){
        let formdata = new FormData();
        let boardName = document.querySelector("#boardField").value;
        formdata.append("name",boardName);
        fetch('http://127.0.0.1:5000/createBoard',{method:'POST',body:formdata})
	        .then(response => response.json())
	        .then(board => {
	            dom.createBoard(board);
            });
    },


    postTask : function(task,boardId){
        let formdata = new FormData();
        formdata.append("task",task);
        formdata.append("board_id",boardId);
        fetch('http://127.0.0.1:5000/createTask',{method:'POST',body:formdata})
            .then(response => response.json())
            .then(task =>{
                dom.createTask(task);
            })
    },


    getBoards : function(){
        fetch("http://127.0.0.1:5000/load_boards",{method:'GET'})
            .then(response => response.json())
            .then(data => {
                for (let board of data.boards) {
                    dom.createBoard(board);
                    board.tasks.forEach(dom.createTask)
                }
            });
    },


    updateTask : function (id,status) {
        let formdata = new FormData();
        formdata.append("id",id);
        formdata.append("status",status);
        fetch("http://127.0.0.1:5000/update_task",{method:'PUT',body:formdata})
            .then(response => response.json())
            .then(data => console.log(data))
    }

};

