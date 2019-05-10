import pprint

from flask import Flask
from flask import jsonify
from flask import request
from flask import send_from_directory
from server import monitoring

app = Flask(__name__, static_url_path='')

metric_client = monitoring.create_monitoring_client()
project = 'stackathon-2019'

@app.route('/hello')
def hello_handler():
  name = request.args.get('name', 'world')
  value = float(request.args.get('v', '0.5'))
  monitoring.add_point(metric_client, project, value)
  return 'hello, %s\nThis is stackybird' % name

@app.route('/')
def home_handler():
  return 'this is home'

@app.route('/test', methods = [ 'GET', 'POST'])
def test_handler():
  pprint.pprint(request.data)
  return jsonify({'test':'output'})

@app.route('/send_move', methods = ['POST'])
def send_move():
  monitoring.add_point(metric_client, project, float(request.form["move"]))
  return ''

@app.route('/get_points', methods = ['GET'])
def get_points():
  res = monitoring.get_points(metric_client,project)
  pprint.pprint(res)
  return jsonify(res)

@app.route('/notification', methods = ['GET'])
def notification():
  return jsonify(alerts=[])

@app.route('/ace/<path:path>')
def send_js(path):
  return send_from_directory('ace/', path)

if __name__ == '__main__':
      # This is used when running locally only. When deploying to Google App
      # Engine, a webserver process such as Gunicorn will serve the app.
      # This can be configured by adding an `entrypoint` to app.yaml.

      app.run(port=8080, debug=True)
