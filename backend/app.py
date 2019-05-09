from flask import Flask
from flask import jsonify
from flask import request

import pprint

app = Flask(__name__)

@app.route('/hello')
def hello_handler():
  return 'hello world'

@app.route('/')
def home_handler():
  return 'this is home'

@app.route('/test', methods = ['POST'])
def post_test_handler():
  pprint.pprint(request.data)
  return jsonify({'test':'output'})

@app.route('/send_move', methods = ['POST'])
def send_move():
  return 'not implemented'

@app.route('/get_graph', methods = ['GET'])
def get_graph():
  return 'not implemented'

@app.route('/notification', methods = ['GET'])
def notification():
  return 'not implemented'


