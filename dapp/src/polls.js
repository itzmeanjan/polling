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
    getPoll = (pollId) => {
        return this._polls.get(pollId);
    }

    // Given address of specific user, returns a list of all polls
    // created from that address ( ofcourse which are locally available )
    getPollsFromUser = (address) => {
        const tmpPolls = [];

        for (let [_pollId, _poll] of this._polls) {
            if (address === _poll.creator) {
                tmpPolls.push(_poll);
            }
        }

        return tmpPolls;
    }

    // returns a list of active polls from a certain user ( given his/ her account address )
    getActivePollsFromUser = (address) => this.getPollsFromUser(address)
        .filter((_v) => !_v.hasPollEnded());

    // returns a list of inactive polls from a certain user ( given his/ her account address )
    getInactivePollsFromUser = (address) => this.getPollsFromUser(address)
        .filter((_v) => _v.hasPollEnded());;

    // given pollId, returns creator address of that poll
    getUserByPollId = (pollId) => this.polls.get(pollId);

}

export default Polls;
