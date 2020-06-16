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

}

export default Poll;
