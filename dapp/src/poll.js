class Poll {

    constructor(creator, title, startTimeStamp, endTimeStamp, totalVotesCasted) {

        this._creator = creator;
        this._title = title;
        this._startTimeStamp = startTimeStamp;
        this._endTimeStamp = endTimeStamp;
        this._totalVotesCasted = totalVotesCasted;

        this.pollOptions = new Map();
        this.votes = new Map();

    }

}

export default Poll;
