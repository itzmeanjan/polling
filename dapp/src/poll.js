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

    get creator() {
        return this._creator;
    }

    get title() {
        return this._title;
    }

    get startTimeStamp() {
        return this._startTimeStamp;
    }

    get endTimeStamp() {
        return this._endTimeStamp;
    }

    get totalVotesCasted() {
        return this._totalVotesCasted;
    }

}

export default Poll;
