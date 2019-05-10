/**
 * @fileoverview Description of this file.
 */

var current_position = 0;

setInterval(function() {
  console.log("Executing");
  eventLoopIteration();
}, 6000)

eventLoopIteration();

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
  var move = 0.0;
  if ($('#move_up').val()) {
    move = 0.1;
  } else if ($('#move_down').val()) {
    move = -0.1;
  }
  current_position = current_position + move;
  $.post({
    url: "/send_move",
    data: {
      move: current_position,
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
  context.strokeStyle = "red";
  context.lineWidth = 5;
  context.fillStyle = "#111111";
  context.fillRect(0,0, canvas.width, canvas.height);
  var y_offset = 0;
  for (i in result) {
    var stream = JSON.parse(result[i]);
    var y = stream.points[stream.points.length - 1].value.doubleValue * canvas.height;
    context.beginPath();
    context.moveTo(0,y);
    for (var j = stream.points.length - 2; j >= 0; j--) {
      var x = (stream.points.length - 1 - j) * point_width;
      y = stream.points[j].value.doubleValue * canvas.height;
      console.log("x: " + x + ", y: " + y);
      context.lineTo(x, y);
    }
    context.stroke();
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
