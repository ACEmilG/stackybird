import pprint
from server import utils
from urllib.parse import parse_qs


def hello_handler(environ, start_fn):
  start_fn('200 OK', [('Content-Type', 'text/plain')])
  return [utils.encode_text('Hello World!\n')]


def home_handler(environ, start_fn):
  start_fn('200 OK', [('Content-Type', 'text/plain')])
  return [utils.encode_text('This is home!\n')]


routes = {
    '/': home_handler,
    '/hello': hello_handler,
}


def debug_environ(handler):

  def _inner(environ, start_fn):
    response = handler(environ, start_fn)
    query = parse_qs(environ.get('QUERY_STRING', ''))
    if 'True' in query['debug']:
      response.append(
          utils.encode_text('{debug_info: %s}' % pprint.pformat(environ)))
    return response

  return _inner


class Application(object):

  def __init__(self, routes):
    self.routes = routes

  def not_found(self, environ, start_fn):
    start_fn('404 Not Found', [('Content-Type', 'text/plain')])
    return [utils.encode_text('404 Not Found')]

  def __call__(self, environ, start_fn):
    handler = self.routes.get(environ.get('PATH_INFO')) or self.not_found
    return debug_environ(handler)(environ, start_fn)


app = Application(routes)
