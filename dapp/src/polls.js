import Poll from "./poll";

// Holder for all polls, each poll can be uniquely identified using pollId
class Polls {

    constructor() {
        this._polls = new Map();
    }

    // returns a map of all polls, which are stored locally
    // keys of map are unique pollId
    get polls() {
        return this._polls;
    }

    // adds new record of poll
    addPoll(pollId, poll) {
        this._polls.set(pollId, poll);
    }

    // given pollId, returns Poll object
    // if pollId invalid, returns undefined ( make sure you check it )
    getPoll(pollId) {
        return this._polls.get(pollId);
    }

}

export default Polls;
