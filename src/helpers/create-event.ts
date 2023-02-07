export function createEvent<T extends string> (name: T) {
  const event = document.createEvent('Event')
  event.initEvent(name, false, false)
  return event
}
