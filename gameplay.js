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
    }
  })
  // Grab new data
  $.ajax({
    url: "/get_graph",
    success: function(result) {
      handleGetData(result);
    }
  });
  // Update screen
  // Check for alert
}

function handleGetData(result) {
  console.log("handling get data result");
}
