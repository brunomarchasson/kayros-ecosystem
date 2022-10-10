

const mockRequest = () => {
  const req = {}
    req.input = jest.fn().mockReturnValue(req)
    req.query = jest.fn().mockResolvedValue([])
    return req

}
const db = {
  // raw: jest.fn()
  request:jest.fn().mockReturnValue(mockRequest()),
  query: jest.fn().mockResolvedValue([])
}



export default db
