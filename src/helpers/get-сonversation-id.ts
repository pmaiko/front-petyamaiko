export const getConversationId = (sender: string, recipient: string) => {
  const hash = [sender, recipient].sort()
  return hash.join('')
}
