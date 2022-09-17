const user ={
  id: 123,
  email: "user@email.com",
  language: "userlang",
}

const get = jest.fn((req, res) =>  {
  res.sendResult({
  user: user,
  success: true,
  token: 'TOKEN',
})})

const login = jest.fn((req, res) =>  res.sendResult({
  user: user,
  success: true,
  token: 'TOKEN',
}))

export default {
  get,
  login,
}
