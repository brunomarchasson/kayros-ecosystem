import repository from "../repositories/repository.js";

const getAll = async (req, res) => {

};

const post = async (req, res) => {
  const r  = await repository.roll.create(req.data)
  res.sendResult(r);
};

const get = async (req, res, next) => {
  const r  = await repository.roll.findOne(req.data)
  res.sendResult(r);
};

const setLocation =  async (req, res) => {
  const r  = await repository.roll.setLocation(req.data)
  if(!r) return res.status(404).end();
  res.sendResult(r);
}
const setStatus =  async (req, res) => {
  const r  = await repository.roll.setStatus(req.data)
  if(!r) return res.status(404).end();
  res.sendResult(r);
}
const setLength =  async (req, res) => {
  const r  = await repository.roll.setLength(req.data)
  if(!r) return res.status(404).end();
  res.sendResult(r);
}

export default {
  getAll,
  get,
  post,
  setLocation,
  setStatus,
  setLength,
};
