// Data class for holding information for a certain user
class User {

    constructor(name) {
        this._name = name;

        this.pollIds = [];
    }

    get name() {
        return this._name;
    }

}

export default User;
