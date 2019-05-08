import sys

if sys.version_info[0] < 3:
    import server.py2_util as utils
else:
    import server.py3_util as utils
