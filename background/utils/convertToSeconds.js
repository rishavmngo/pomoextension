function inSeconds(timestamp) {
  const timestampArray = timestamp.split(':')

  return parseInt(timestampArray[0]) * 60 + parseInt(timestampArray[1])
}

export default inSeconds
