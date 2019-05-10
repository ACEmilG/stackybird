/**
 * @fileoverview Description of this file.
 */

var current_position = 0.5;
var context;
var point_width = 5;
var walls = [[], []];

initWalls();

setInterval(function() {
  console.log("Executing");
  eventLoopIteration();
}, 6000)

eventLoopIteration();


function eventLoopIteration() {
  var canvas = document.querySelector("canvas");
  context = canvas.getContext("2d");
  context.fillStyle = "#111111";
  context.fillRect(0,0, canvas.width, canvas.height);

  console.log("starting event loop iteration");
  // Write move result
  sendMove();

  updateWalls();

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
  var moved_name = $("input[name=move]").filter(":checked").val()
  if (moved_name == "move_up") {
    move = -0.1;
  } else if (moved_name == "move_down") {
    move = 0.1;
  }
  console.log("move: " + move);
  current_position = current_position + move;
  console.log("new position: " + current_position);
  $.post({
    url: "/send_move",
    data: {
      move: current_position,
    },
    success: handleMoved,
  })
}

function handleData(result) {
  console.log("handling get data result");
  console.log(result);
  // Update screen
  var canvas = document.querySelector("canvas");
  context.strokeStyle = "red";
  context.lineWidth = 5;
  for (i in result) {
    var stream = JSON.parse(result[i]);
    console.log(stream.points);
    var y = stream.points[stream.points.length - 1].value.doubleValue * canvas.height;
    context.beginPath();
    context.moveTo(0,y);
    for (var j = stream.points.length - 2; j >= 0; j--) {
      var x = (stream.points.length - 1 - j) * point_width;
      var scaler = walls[0][j] - walls[1][j];
      var offset = walls[1][j];
      y = (stream.points[j].value.doubleValue * scaler) + offset;
      console.log("scaler: " + scaler + ", offset: " + offset);
      console.log("x: " + x + ", y: " + y);
      console.log("original y: " + stream.points[j].value.doubleValue);
      context.lineTo(x, y);
    }
    context.stroke();
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

function updateWalls() {
  shiftWalls();
  drawWalls();
}

function shiftWalls() {
  var canvas = document.querySelector("canvas");
  walls[0].shift();
  walls[1].shift();
  var top_change = (Math.random() * 40) - 20;
  var bot_change = (Math.random() * 40) - 20;
  if (walls[0][walls[0].length - 1] + top_change > canvas.height) {
    top_change = top_change * -1;
  }
  if (walls[1][walls[1].length - 1] + bot_change < 0) {
    bot_change = bot_change * -1;
  }
  walls[0].push(walls[0][walls[0].length - 1] + top_change);
  walls[1].push(walls[1][walls[1].length - 1] + bot_change);
}

function drawWalls() {
  var canvas = document.querySelector("canvas");
  context.strokeStyle = "white";
  context.lineWidth = 5;
  var num_points = Math.ceil(canvas.width / point_width);

  context.beginPath();
  context.moveTo(0, walls[0][0]);
  for(var i = 1; i < walls[0].length; i++) {
    var x = i * point_width;
    context.lineTo(x, walls[0][i]);
  }
  context.stroke();

  context.beginPath();
  context.moveTo(0, walls[1][0]);
  for(var i = 1; i < walls[1].length; i++) {
    var x = i * point_width;
    context.lineTo(x, walls[1][i]);
  }
  context.stroke();

}

function initWalls() {
  var canvas = document.querySelector("canvas");
  var num_points = Math.ceil(canvas.width / point_width);

  for (var i = 0; i < num_points; i++) {
    walls[0].push(canvas.height - 100);
    walls[1].push(100);
  }

  for (var i = 0; i < num_points; i++) {
    shiftWalls();
  }
}
