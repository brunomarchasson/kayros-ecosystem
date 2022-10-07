import UserRepository from './userRepository';
import db from "../core/db.js";
import ArticleRepository from './article.repository';

class Repository {
  constructor() {
    this._db = db;
    this.registerRepositories()
  }

  registerRepositories() {
    this.user = new UserRepository();
    this.article = new ArticleRepository();
  }
}

export default new Repository();
