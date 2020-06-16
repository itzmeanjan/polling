// Data class for holding information for a certain user
class User {

    constructor(name) {
        this._name = name;

        this.pollIds = [];
    }

    get name() {
        return this._name;
    }

    // appends pollId to end of array, using it polls can be looked up
    addPoll = (pollId) => {
        this.pollIds.push(pollId);
    }

}

export default User;
