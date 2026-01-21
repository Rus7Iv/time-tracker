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

export type TimerEventData = {
  id: string
  startTime: Date
  endTime: Date
  description: string
}

export const groupEventsByDay = (events: TimerEventData[]) => {
  const sorted = [...events].sort(
    (a, b) => a.startTime.getTime() - b.startTime.getTime(),
  )
  const groups = new Map<string, { date: Date; items: TimerEventData[] }>()

  sorted.forEach((event) => {
    const dayKey = event.startTime.toISOString().slice(0, 10)
    const dayDate = new Date(
      event.startTime.getFullYear(),
      event.startTime.getMonth(),
      event.startTime.getDate(),
    )
    if (!groups.has(dayKey)) {
      groups.set(dayKey, { date: dayDate, items: [] })
    }
    groups.get(dayKey)?.items.push(event)
  })

  return Array.from(groups.values())
    .map((group) => ({
      ...group,
      items: [...group.items].sort(
        (a, b) => a.startTime.getTime() - b.startTime.getTime(),
      ),
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime())
}

export const formatDayLabel = (date: Date, locale?: string) =>
  date.toLocaleDateString(locale, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })

export const formatTimeRange = (start: Date, end: Date, locale?: string) =>
  `${start.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  })} - ${end.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  })}`

export const formatDuration = (start: Date, end: Date) =>
  formatTime(end.getTime() - start.getTime())

// TODO: исправить в задаче с переводами
export const getEventsLabel = (count: number) => {
  const mod10 = count % 10
  const mod100 = count % 100

  if (mod10 === 1 && mod100 !== 11) {
    return 'событие'
  }
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return 'события'
  }
  return 'событий'
}
