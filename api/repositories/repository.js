import db from "../core/db/index.js";
import ArticleRepository from './article.repository';
import QuotationRepository from './quotation.repository';
import RollRepository from './roll.repository';
import UserRepository from './userRepository';

class Repository {
  constructor() {
    this._db = db;
    this.registerRepositories()
  }

  registerRepositories() {
    this.user = new UserRepository();
    this.article = new ArticleRepository();
    this.quotation = new QuotationRepository();
    this.roll = new RollRepository();
  }
}

export default new Repository();
