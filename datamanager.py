from db_connection import connection_handler


@connection_handler
def get_boards(cursor):
    query = ''' SELECT * FROM boards'''
    cursor.execute(query)
    return cursor.fetchall()



@connection_handler
def add_board(cursor,name):
    query = ''' INSERT INTO boards (name,user_id)
                VALUES (%(name)s,69);
                SELECT * FROM boards
                ORDER BY id DESC LIMIT 1; '''
    params = {"name":name}
    cursor.execute(query,params)
    return cursor.fetchone()