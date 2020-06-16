// Holds info regarding a poll option, for some specific pollId
class PollOption {

    constructor(content, voteCount) {
        this._content = content;
        this._voteCount = voteCount;
    }

    // content of poll option
    get content() {
        return this._content;
    }

    // number of votes received by this option
    get voteCount() {
        return this._voteCount;
    }

}

export default PollOption;
