import UserRepository from './userRepository';
import db from "../core/db.js";

class Repository {
  constructor() {
    this._db = db;
    this.registerRepositories()
  }

  registerRepositories() {
    console.log('registerRepositories')
    this.user = new UserRepository();
  }
}

export default new Repository();
