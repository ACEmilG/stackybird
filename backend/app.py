from flask import Flask
from flask import jsonify
from flask import request

app = Flask(__name__)

@app.route('/hello')
def hello_handler():
  return 'hello world'


@app.route('/')
def home_handler():
  return 'this is home'

@app.route('/test', methods = ['POST'])
def post_test_handler():
  return jsonify({'test':'output'})

