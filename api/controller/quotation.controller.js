import db from "../core/db.js";
import ArticleRepository from "../repositories/article.repository.js";
import repository from "../repositories/repository.js";

const getAll = async (req, res) => {
  res.sendResult([]);
};

const get = async (req, res, next) => {
  res.sendResult({});
};

const post = async (req, res, next) => {
  req.setTimeout(0)
  const r  = await repository.quotation.create(req.data)
  res.sendResult(r);
};

export default {
  getAll,
  get,
  post
};
