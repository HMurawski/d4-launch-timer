const targetDate = new Date('June 2, 2023 01:00:00');
let timerInterval;

function calculateTimeDifference() {
  const now = new Date();
  const timeDifference = targetDate - now;

  if (timeDifference > 0) {
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    const timeLeft = `${days} dni ${hours} godzin ${minutes} minut ${seconds} sekund`;

    chrome.browserAction.setBadgeText({ text: timeLeft });
    chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });

    chrome.runtime.sendMessage({ timeLeft });
  } else {
    clearInterval(timerInterval);
    chrome.browserAction.setBadgeText({ text: 'Done!' });
    chrome.browserAction.setBadgeBackgroundColor({ color: [0, 255, 0, 255] });
  }
}

function startTimer() {
  calculateTimeDifference();
  timerInterval = setInterval(calculateTimeDifference, 1000);
}

chrome.alarms.create({ delayInMinutes: 1 });
chrome.alarms.onAlarm.addListener(startTimer);
