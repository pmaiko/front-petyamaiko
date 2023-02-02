export const replaceUrl = (url: string) => {
  if (!/(http|https)/.test(url)) {
    return process.env.REACT_APP_API_URL?.replace('/api/', '') + url
  }
  return url
}
