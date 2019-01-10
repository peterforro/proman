from flask import Flask, render_template, request, jsonify
from datamanager import *

app = Flask(__name__)


@app.route("/",methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/load_boards/<int:board_id>')
@app.route('/load_boards')
def load_boards(board_id=None):
    if board_id:
        board = get_board(board_id)
        tasks = get_tasks_by_board_id(board_id)
        return jsonify({"board":board,"tasks":tasks})
    boards = get_boards()
    for i,board in enumerate(boards):
        boards[i]['tasks'] = get_tasks_by_board_id(board["id"])
    return jsonify({"boards":boards})



@app.route('/createBoard',methods=['POST'])
def create_board():
    new_board = add_board(request.form.get("name"))
    return jsonify(new_board)



@app.route('/createTask',methods=['POST'])
def create_task():
    new_task = add_task(request.form)
    return jsonify(new_task)



@app.route('/update_task',methods=['PUT'])
def update_task():
    edit_task(request.form)
    return jsonify({"message":"ok"}), 200



if __name__ == '__main__':
    app.run(debug=True)
