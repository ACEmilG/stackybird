/**
 * @fileoverview Description of this file.
 */

setInterval(function() {
  console.log("Executing");
}, 6000)

function eventLoopIteration() {
  console.log("starting event loop iteration");
  // Write move result
  $.ajax({
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
  console.log("handling get data result");
  // Update screen
}

function handleWriteMove(result) {
  console.log("handling successful write");
}

function handleNotification(result) {
  console.log("handling notification")
}
