export let dom = {
    create_board: function () {
        let boardTemplate = document.querySelector("#boardTemplate");
        let boardClone = document.importNode(boardTemplate.content, true);
        document.querySelector("#boardContainer").appendChild(boardClone);

    },
};