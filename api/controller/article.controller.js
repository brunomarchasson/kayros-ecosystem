import db from "../core/db.js";
import ArticleRepository from "../repositories/article.repository.js";
import repository from "../repositories/repository.js";

const getAll = async (req, res) => {
  const u = req.currentUser;
  const { type, extra } = req.data;
  const r  =await repository.article.getAll({type, extra})
  res.sendResult(r);
};

const get = async (req, res, next) => { };

export default {
  getAll,
  get,
};
