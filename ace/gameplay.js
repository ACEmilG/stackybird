/**
 * @fileoverview Description of this file.
 */

var current_position = 0;

setInterval(function() {
  console.log("Executing");
  eventLoopIteration();
}, 6000)

function eventLoopIteration() {
  console.log("starting event loop iteration");
  // Write move result
  sendMove();

  // Grab new data
  $.ajax({
    url: "/get_points",
    success: handleData,
  });

  // Check for alert
  $.ajax({
    url: "/notification",
    success: handleNotification
  })
}

function sendMove() {
  move = 0;
  if ($('#move_up').val()) {
    move = 1;
  } else if ($('#move_down').val()) {
    move = -1;
  }
  console.log("posting: " + move);
  $.post({
    url: "/send_move",
    data: {
      move: move
    },
    success: handleMoved,
  })
}

function handleData(result) {
  var point_width = 5;
  console.log("handling get data result");
  console.log(result);
  // Update screen
  var canvas = document.querySelector("canvas");
  var context = canvas.getContext("2d");
  context.strokeStyle = "blue";
  context.lineWidth = 5;
  context.fillStyle = "#111111";
  context.fillRect(0,0, canvas.width, canvas.height);
  var y_offset = 0;
  for (i in result) {
    var stream = JSON.parse(result[i]);
    console.log("looking at stream: ");
    console.log(stream);
    console.log(stream.points.length);
    var previous_y = stream.points[0].value.doubleValue * canvas.height;
    for (var j = 1; j < stream.points.length; j++) {
      var start_x = j * point_width;
      var start_y = previous_y;
      var width = point_width;
      var height = stream.points[j].value.doubleValue * canvas.height;
      console.log("rectangle: " + start_x + ", " + start_y + ", " + width + ", " + y_offset);
      context.strokeRect(start_x, start_y, width, height + y_offset);
      previous_y = start_y;
    }
    y_offset = y_offset + 1;
  }
}

function handleMoved(result) {
  console.log("handling successful write");
}

function handleNotification(result) {
  console.log("handling notification: " + result);
  if (result.alerts.length > 0) {
    $('#container').css('background-color', '#f012be');
    $('#notification').text('LOSE');
  } else {
    $('#container').css('background-color', '#001f3f');
    $('#notification').text('');
  }
}
