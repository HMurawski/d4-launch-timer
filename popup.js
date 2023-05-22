
function updateTimer(timeLeft) {
  const timerElement = document.getElementById('timer');
  timerElement.textContent = timeLeft;
}


chrome.runtime.onMessage.addListener(function (message) {
  updateTimer(message.timeLeft);
});


chrome.runtime.sendMessage({});
