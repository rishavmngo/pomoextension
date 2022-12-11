import GlobalConfig from './config.js'
import notification from './notification.js'

var timer
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
    if (this.duration < 0) {
      this.reset()
      notification.send('complete', GlobalConfig.duration)
    }
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

function init(duration) {
  timer = new Pomodoro(duration)
  chrome.storage.local.set({ timerDuration: duration })
  chrome.storage.local.set({ globalTimeDuration: duration })
  chrome.storage.local.set({ currentTimeStamp: duration })
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

chrome.runtime.onInstalled.addListener(() => {
  console.log('welcome to pomodoro app')
  init(GlobalConfig.duration)
})

// const indexDb = window.indexedDB
//
// const request = indexedDB.open('database', 1)
//
// request.onerror = function (event) {
//   console.log('An error occured with IndexedDb')
//   console.error(event)
// }
//
//
// request.onupgradeneeded = function() {
// 	const db = request.result
// 	const store = db.createObjectStore("pomodoro", {keyPath: "id"});
// 	store.createIndex("start_time", [k
// }
//
//
