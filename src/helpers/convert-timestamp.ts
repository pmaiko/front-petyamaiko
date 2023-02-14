export const convertTimestamp = (timestamp?: number, pattern: string = '*hour*:*minutes*'): string => {
  if (!timestamp) {
    return ''
  }
  const date = new Date(timestamp)

  const pad = (value: string | number) => {
    if (value < 10) {
      return '0' + value
    }
    return value
  }
  const day = pad(date.getDate())
  const month = pad(date.getMonth() + 1)
  const year = pad(date.getFullYear())
  const hour = pad(date.getHours())
  const minutes = pad(date.getMinutes())
  const seconds = pad(date.getSeconds())

  const obj = {
    day,
    month,
    year,
    hour,
    minutes,
    seconds
  }

  const regex = /\*(.*?)\*/g

  if (pattern) {
    const fields = pattern.match(regex)?.map(match => match.slice(1, -1))
    console.log(fields)
    fields?.forEach((field: any ) => {
      // @ts-ignore
      pattern = pattern.replace(`*${field}*`, obj[field])
    })

    return pattern
  }
  // `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`
  return ''
}
