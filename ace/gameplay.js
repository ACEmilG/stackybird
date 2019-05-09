/**
 * @fileoverview Description of this file.
 */

setInterval(function() {
  console.log("Executing");
}, 6000)

function eventLoopIteration() {
  console.log("starting event loop iteration");
  // Write move result
  $.post({
    url: "/send_move",
    data: {
      move: $('#move').val()
    }
    success: handleMoved,
  })

  // Grab new data
  $.ajax({
    url: "/get_graph",
    success: handleData,
  });

  // Check for alert
  $.ajax({
    url: "/notification",
    success: handleNotification
  })
}

function handleGetData(result) {
  var point_width = 5;
  console.log("handling get data result");
  // Update screen
  var canvas = $('#canvas');
  var context = canvas.getContext('2d');
  context.strokeStyle = "blue";
  context.lineWidth = 5;
  var y_offset = 0;
  for (stream in result.streams) {
    var previous_y = stream[0];
    for (var i = 1; i < stream.length() - 1; i++) {
      var start_x = i * point_width;
      var start_y = previous_y;
      var width = point_width;
      var height = stream[i];
      cs.strokeRect(start_x, start_y, width, height + y_offset);
      previous_y = start_y;
    }
    y_offset = y_offset + 1;
  }
}

function handleWriteMove(result) {
  console.log("handling successful write");
}

function handleNotification(result) {
  console.log("handling notification")
}
