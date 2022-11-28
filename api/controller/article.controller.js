import repository from "../repositories/repository.js";

const getAll = async (req, res) => {
  const u = req.currentUser;
  const { type, extra } = req.data;
  const r  =await repository.article.getAll({type, extra})
  res.sendResult(r);
};

const get = async (req, res, next) => {
  const r  =await repository.article.getById(req.data.id)
  res.sendResult(r);
 };

export default {
  getAll,
  get,
};
