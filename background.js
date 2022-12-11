var timer
chrome.runtime.onInstalled.addListener(() => {
  console.log('Welcome to Pomodoro')
})

class Pomodoro {
  constructor(duration) {
    this.duration = duration
  }

  start() {
    this.timerEvent = setInterval(() => {
      this.progress()
    }, 1000)
    chrome.storage.local.set({ timerState: 'start' })
  }
  progress() {
    chrome.storage.local.set({ currentTimeStamp: this.duration })
    chrome.storage.local.set({ timerState: 'start' })
    this.duration--
  }
  stop() {
    clearInterval(this.timerEvent)
    chrome.storage.local.set({ timerState: 'stop' })
  }
  reset() {
    this.stop()
    this.duration = GlobalConfig.duration
    chrome.storage.local.set({ currentTimeStamp: this.duration })
    console.log('reset')
  }
}

function init(config) {
  timer = new Pomodoro(config.duration)
  chrome.storage.local.set({ timerDuration: config.duration })
  chrome.storage.local.set({ globalTimeDuration: config.duration })
  chrome.storage.local.set({ timerState: 'stop' })
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'start') {
    timer.start()
  } else if (request.action === 'stop') {
    timer.stop()
  } else if (request.action === 'reset') {
    timer.reset()
  }
})

function inSeconds(timestamp) {
  const timestampArray = timestamp.split(':')

  return parseInt(timestampArray[0]) * 60 + parseInt(timestampArray[1])
}
const GlobalConfig = {
  duration: inSeconds('1:10'),
}

init(GlobalConfig)
