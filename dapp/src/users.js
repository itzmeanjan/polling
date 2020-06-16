import User from "./user";

// Data class for holding information related to users
// where each user gets mapped to unique account using their ethereum
// account's address ( 160 bit address )
class Users {

    constructor() {
        this._users = new Map();
    }

    get users() {
        return this._users;
    }

    // adds new user record
    addUser = (userName, address) => {
        this._users.set(address, new User(userName));
    }

    // given user's address, looks up their account
    getUserByAddress = (address) => {
        return this._users.get(address);
    }

}

export default Users;
