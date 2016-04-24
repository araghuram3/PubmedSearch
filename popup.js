
// first send message to background saying popup is open
document.addEventListener("DOMContentLoaded", function() {

    // submit message to background
    chrome.runtime.sendMessage({type: 'message', message: 'popup_loaded'});
    console.log('I submitted the message');

    // listen for running program
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if (request.message == 'running_script') {
            console.log('Heard back from background');
            document.getElementById('status').textContent = 'Running script';
        };
      }
    );

    // listen for finished running script to output data
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if (request.message == 'script_complete') {
            // write information to popup for now, we'll see what happens later
            console.log(request.responseText);
            document.getElementById('status').textContent = request.response;
        };
      }
    );
});
