from flask import Blueprint, render_template

auth = Blueprint('auth', __name__)

@auth.route('/login')
def login():
    return render_template("login.html") 

@auth.route('/logout')
def logout():
    return "<h1> Log out <h1>"

@auth.route('/sign-up')
def sign_up():
    return render_template("sign_up.html")

@auth.route('/progression')
def progression_chart():
    return render_template("progression.html")

@auth.route('/details')
def details():
    return render_template("details.html")  

    