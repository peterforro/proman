import {datamanager} from "./datamanager.js";


export let dom = {

    cloneTemplate: function(selector){
        let template = document.querySelector(selector);
        return document.importNode(template.content, true);
    },


    initTaskButton: function(){
        let task = this.closest(".input-group").querySelector(".taskField").value;
        let boardId = this.closest(".board").id.split("_")[1];
        datamanager.postTask(task,boardId);
    },


    collectTaskContainers: function(board){
        let newBoard = document.querySelector(`#board_${board.id}`);
        let cardContainer = Array.from(newBoard.querySelectorAll(".cardContainer"));
        cardContainer.push(document.querySelector("#trash"));
        return cardContainer;
    },


    collectBoards: function(board){
        let boards = [document.querySelector(`#board_${board.id}`).parentElement];
        boards.push(document.querySelector("#trash"));
        console.log(boards);
        return boards;
    },


    tasksDropHandler: function(element, target){
        if(target.id==="trash"){
            element.remove();
        } else {
            let id = element.dataset.id;
            let status = target.classList[2];
            datamanager.updateTask(id, status);
        }
    },


    boardsDropHandler: function(element,target){
        if(target.id==="trash"){
            element.remove();
        }
    },



    dragulize: function(containers,dropHandler,moves){
        let drake = dragula(containers,moves);
        drake.on("drop",dropHandler);
    },



    createBoard: function (board) {
        let boardClone = dom.cloneTemplate("#boardTemplate");
        boardClone.querySelector(".board").setAttribute("id",`board_${board.id}`);
        boardClone.querySelector(".board .boardName").textContent = board.name;
        boardClone.querySelector(".board .submitTask").addEventListener("click",dom.initTaskButton);
        document.querySelector("#boardContainer").appendChild(boardClone);
        dom.dragulize(dom.collectTaskContainers(board),dom.tasksDropHandler);
        dom.dragulize(dom.collectBoards(board),dom.boardsDropHandler,{
            moves: function(el, container, handle) {
            return !handle.classList.contains('alert');
        }});
    },


    createTask: function(task){
        console.log(`#board_${task.board_id} .${task.status}`);
        let taskClone = dom.cloneTemplate("#taskTemplate");
        taskClone.querySelector(".taskCard").dataset.id = task.id;
        taskClone.querySelector(".taskCard").textContent = task.task;
        document.querySelector(`#board_${task.board_id} .${task.status}`).appendChild(taskClone);
    },


    initAddBoardForm: function(){
        let btn = document.querySelector("#submitBoard");
        let field = document.querySelector("#boardField");
        field.addEventListener("keydown",function(){
            btn.disabled = (field.value.length <= 4);
        });
        addBoardBtn.addEventListener("click",function(){
            datamanager.postBoard();
            field.value = "";
        });
    },


    loadBoardsOnStartUp: function(){
        window.addEventListener("load",datamanager.getBoards);
    },
};
