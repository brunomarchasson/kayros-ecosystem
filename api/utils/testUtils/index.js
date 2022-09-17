import { reduce } from "lodash";


export const mockedResponse = () => {
  const res = {};
  res.status = (s) => {
      res._status= s;
      return res
  };
  res.json = (s) => {
      return res
  };
  res.send = jest.fn().mockReturnValue(res);
  res.sendResult = jest.fn()
  return res;
};

