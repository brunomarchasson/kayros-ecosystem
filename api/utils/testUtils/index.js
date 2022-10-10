
module.exports = {
  
  mockRequest: (data) => {
    const req = {}
    req.body = jest.fn().mockReturnValue(req)
    req.params = jest.fn().mockReturnValue(req)
    req.data = data ?? { }
    req.currentUser = {

    }
    return req
  },

  mockResponse: () => {
    const res = {}
    res.send = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockImplementation((s) => {
      res._status = s;
      return res
    })
    res.sendResult = jest.fn()
    res.json = jest.fn().mockReturnValue(res)
    return res
  },
  // mockNext: () => jest.fn()
}
