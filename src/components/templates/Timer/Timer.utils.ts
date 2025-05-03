/**
 * Converts time given in milliseconds to a string in the format "hh:mm:ss".
 * @param {number} ms - The time in milliseconds to be converted.
 * @returns {string} - A string representing the time in the format "hh:mm:ss".
 */
export const formatTime = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0'),
  ].join(':')
}
