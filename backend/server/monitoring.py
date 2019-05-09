from google.cloud import monitoring_v3

import time

def create_monitoring_client():
  client = monitoring_v3.MetricServiceClient()
  return client

def add_point(client, project, value):
  project_name = client.project_path(project)
  series = monitoring_v3.types.TimeSeries()
  series.metric.type = 'custom.googleapis.com/stackathon/stackybird/bird'
  series.resource.type = 'gce_instance'
  series.resource.labels['instance_id'] = '4893175471367173624'
  series.resource.labels['zone'] = 'us-east1-b'
  point = series.points.add()
  point.value.double_value = value
  now = time.time()
  point.interval.end_time.seconds = int(now)
  point.interval.end_time.nanos = int(
      (now - point.interval.end_time.seconds) * 10**9)
  client.create_time_series(project_name, [series])
