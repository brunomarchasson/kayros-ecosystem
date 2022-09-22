import RepositoryBase from "./repositoryBase";

class UserRepository extends RepositoryBase {
  constructor() {
    super();
    console.log('rrr', this)
    console.log('rrr', this.getById)
    // this.usersCollection = this.db.users;
  }

  getById(id) {
    return this.usersCollection.find(user => user._id == id);
  }

  getWithCreds( customerId, email, password) {
    if(email === 'sdf')
    return {
      id: 123,
      email: 'toto@tt.com'
    }

    // return this.usersCollection.find(user => user._id == id);
  }

  getByEmail(email) {
    return this.usersCollection.find(user => user.email == email);
  }
}

export default UserRepository;
