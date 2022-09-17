
const get = jest.fn((req, res) => {
  res.sendResult()
})

const getAll = jest.fn((req, res) => {
  res.sendResult()
})

const post = jest.fn((req, res) => {
  res.sendResult()
})

const put = jest.fn((req, res) => {
  res.sendResult()
})

const deletefn = jest.fn((req, res) => {
  res.sendResult()
})


module.exports =  () => ({
  getAll,
  get,
  post,
  put,
  delete: deletefn,

})

