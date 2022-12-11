// import inSeconds from './utils/convertToSeconds'

function inSeconds(timestamp) {
  const timestampArray = timestamp.split(':')

  return parseInt(timestampArray[0]) * 60 + parseInt(timestampArray[1])
}
const GlobalConfig = {
  duration: inSeconds('1:2'),
}

export default GlobalConfig
