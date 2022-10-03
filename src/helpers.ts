export const convertDate = (from: string) => {
  if (from) {
    const date = new Date(from)
    const pad = (value: number): string | number => {
      if (value < 10) return '0' + value
      return value
    }
    const day = pad(date.getDate())
    const month = pad(date.getMonth() + 1)
    const year = pad(date.getFullYear())
    const hour = pad(date.getHours())
    const minutes = pad(date.getMinutes())
    const seconds = pad(date.getSeconds())
    return `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`
  }

  return from
}
