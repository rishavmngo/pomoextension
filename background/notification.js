class Notification {
  constructor() {
    this.message = ''
    this.minutes = 0
    this.seconds = 0
  }
  send(type, duration) {
    this.minutes = Math.floor(duration / 60)
    this.seconds = duration % 60
    this.message += this.minutes > 0 ? `${this.minutes} minutess` : ''
    this.message += this.minutes > 0 && this.seconds > 0 ? ' and ' : ''
    this.message += this.seconds > 0 ? `${this.seconds} seconds` : ''

    if (type === 'complete') {
      chrome.notifications.create('1', {
        type: 'basic',
        iconUrl: '../icons/app_icon.png',
        title: 'Task completed',
        message: `complete pomodoro for ${this.message}`,
        priority: 2,
      })
    }
  }
}

const notification = new Notification()

export default notification
