// Poll class, for holding related info regarding a poll
// each poll can be uniquely be identified using pollId
class Poll {

    constructor(creator, title, startTimeStamp, endTimeStamp, totalVotesCasted) {

        this._creator = creator;
        this._title = title;
        this._startTimeStamp = startTimeStamp;
        this._endTimeStamp = endTimeStamp;
        this._totalVotesCasted = totalVotesCasted;

        this.pollOptions = [];
        this.votes = new Map();

    }

    // returns address of creator of this poll
    get creator() {
        return this._creator;
    }

    // returns title of this post
    get title() {
        return this._title;
    }

    // returns start time stamp of this poll
    get startTimeStamp() {
        return this._startTimeStamp;
    }

    // returns end time stamp of poll
    get endTimeStamp() {
        return this._endTimeStamp;
    }

    // returns total votes casted
    get totalVotesCasted() {
        return this._totalVotesCasted;
    }

    // returns number of poll options available for this poll
    get pollOptionCount() {
        return this.pollOptions.length;
    }

    // adds poll option to this poll
    // pollOption will be holding info regarding that option
    addPollOption(pollOption) {
        this.pollOptions.push(pollOption);
    }

    // adds choice made by certain voter in this poll
    addVote(address, choice) {
        this.votes.set(address, choice);
    }

    // computes winning option in terms of received votes,
    // returns a JS object of index & voteCount
    getWinningOption() {
        let winningIndex = 0;
        let winningVoteCount = this.pollOptions[0].voteCount;

        for (let i = 1; i < this.pollOptions.length; i++) {
            if (winningVoteCount < this.pollOptions[i].voteCount) {
                winningIndex = i;
                winningVoteCount = this.pollOptions[i].voteCount;
            }
        }

        return { index: winningIndex, voteCount: winningVoteCount };
    }

    // checks whether poll has ended or not
    // by comparing current timestamp with endTimeStamp of poll
    hasPollEnded = () => {
        return Math.ceil(Date.now() / 1000) >= this.endTimeStamp;
    }

}

export default Poll;
