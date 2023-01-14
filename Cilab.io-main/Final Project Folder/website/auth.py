from flask import Blueprint, render_template

auth = Blueprint('auth', __name__)

@auth.route('/selectplayers')
def selectplayers():
    return render_template("selectPlayers.html")

@auth.route('/player1')
def player1():
    return render_template("player1.html") 

@auth.route('/player2')
def player2():
    return render_template("player2.html") 

@auth.route('/player3')
def player3():
    return render_template("player3.html") 

@auth.route('/player4')
def player4():
    return render_template("player4.html") 




