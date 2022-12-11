const timer = document.querySelector('.timestamp')
const button_play = document.querySelector('.button_play')
const button_pause = document.querySelector('.button_pause')
const button_reset = document.querySelector('.button_reset')
const pieElement = document.querySelector('.pie')
const root = document.querySelector(':root')
let globalTimeStamp

chrome.storage.local.get('globalTimeDuration', (res) => {
  globalTimeStamp = res.globalTimeDuration
})

function update() {
  chrome.storage.local.get('currentTimeStamp', (res) => {
    updateProgressUi(res.currentTimeStamp, globalTimeStamp)
  })

  chrome.storage.local.get('timerState', (res) => {
    if (res.timerState == 'start') {
      button_play.classList.add('hide')
      button_pause.classList.remove('hide')
    } else if (res.timerState == 'stop') {
      button_pause.classList.add('hide')
      button_play.classList.remove('hide')
    }
  })
}

setInterval(update, 1000)

//handling ui
update()

function updateProgressUi(currentTimeStamp, globalTimeStamp) {
  console.log(currentTimeStamp, globalTimeStamp)
  const minutes = Math.floor(currentTimeStamp / 60)
  const seconds = currentTimeStamp % 60
  let progress = currentTimeStamp / globalTimeStamp
  progress *= 100 * 3.6

  timer.innerHTML = `${minutes.toString().padStart(2, '0')} : ${seconds
    .toString()
    .padStart(2, '0')}`

  root.style.setProperty('--progress', `${progress}deg`)
}

button_play.addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'start' })

  button_play.classList.add('hide')
  button_pause.classList.remove('hide')
})

button_pause.addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'stop' })

  button_pause.classList.add('hide')
  button_play.classList.remove('hide')
})

button_reset.addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'reset' })
})

button_reset.addEventListener('mouseover', () => {
  root.style.setProperty('--main-element-color', `#944040`)
  button_reset.style.opacity = '50%'
})

button_reset.addEventListener('mouseleave', () => {
  button_reset.style.opacity = '100%'
  root.style.setProperty('--main-element-color', `#bc4343`)
})
pieElement.addEventListener('mouseover', () => {
  button_reset.classList.remove('hide')
})

pieElement.addEventListener('mouseleave', () => {
  button_reset.classList.add('hide')
})
