export const authenticateUser = async (tokenCookie: string | undefined) => {
  if (tokenCookie) {
    return JSON.parse(tokenCookie)
  }

  return null
}
