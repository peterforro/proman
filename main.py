from flask import Flask, render_template, request, jsonify
from datamanager import *

app = Flask(__name__)


@app.route("/",methods=['GET'])
def index():
    return render_template('boards.html')


@app.route('/load_boards')
def load_boards():
    boards = get_boards()
    return jsonify(boards)


@app.route('/create_board',methods=['POST'])
def create_board():
    new_board = add_board(request.form.get("name"))
    return jsonify(new_board)


def main():
    app.run(debug=True)





if __name__ == '__main__':
    main()
