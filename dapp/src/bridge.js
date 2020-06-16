// Bridging communication gap between blockchain & app front-end
class Bridge {

    constructor(web3, account, contract) {
        this.web3 = web3;
        this.account = account;
        this.contract = contract;
    }

    // Given a count for setting max poll options for a certain poll, 
    // it'll call contract method for setting max poll option;
    // 
    // poll count needs to be >=2 && <=16
    setMaxPollOptionCount = (count) => new Promise((resolve, reject) => {
        if (!(count >= 2 && count <= 16)) {
            reject('count must be >=2 && <=16');
        }

        this.contract.methods.setMaxPollOptionCount(count)
            .send({ from: this.account })
            .on('receipt', (_receipt) => { resolve(_receipt); })
            .on('error', (_error) => { reject(_error); });
    });

    // returns max poll option count, set as of now, this can be modified using
    // method defined exactly above
    getMaxPollOptionCount = () => new Promise((resolve, reject) => {

        this.contract.methods.getMaxPollOptionCount()
            .call({ from: this.account })
            .then((_result) => { resolve(_result); },
                (_error) => { reject(_error); });

    });

    // creates user account in dApp, given name of account holder
    createUser = (name) => new Promise((resolve, reject) => {

        this.contract.methods.createUser(name)
            .send({ from: this.account })
            .on('receipt', (_receipt) => { resolve(_receipt); })
            .on('error', (_error) => { reject(_error); });

    });

    // creates poll with given topic, from invoker's account
    createPoll = (title) => new Promise((resolve, reject) => {

        this.contract.methods.createPoll(title)
            .send({ from: this.account })
            .on('receipt', (_receipt) => { resolve(_receipt); })
            .on('error', (_error) => { reject(_error); });

    });

    // given unique identifier for poll, adds poll option i.e. 
    // option on which participants are going to cast their vote
    addPollOption = (pollId, pollOption) => new Promise((resolve, reject) => {

        this.contract.methods.addPollOption(pollId, pollOption)
            .send({ from: this.account })
            .on('receipt', (_receipt) => { resolve(_receipt); })
            .on('error', (_error) => { reject(_error); });

    });

    // given pollId and pollActiveTime ( in hours ), we'll try to 
    // make poll live, if all conditions get satisfied, it'll
    // make this poll ready to accept vote from users 
    makePollLive = (pollId, activeForHours) => new Promise((resolve, reject) => {
        if (!(activeForHours > 0 && activeForHours <= 72)) {
            reject('Poll needs to be active for { > 0 && <= 72 } hours');
        }

        this.contract.methods.makePollLive(pollId, activeForHours)
            .send({ from: this.account })
            .on('receipt', (_receipt) => { resolve(_receipt); })
            .on('error', (_error) => { reject(_error); });

    });

    // casts vote on selected option ( must be available for this pollId )
    // where poll gets uniquely determined, by supplied id param
    castVote = (pollId, option) => new Promise((resolve, reject) => {

        this.contract.methods.castVote(pollId, option)
            .send({ from: this.account })
            .on('receipt', (_receipt) => { resolve(_receipt); })
            .on('error', (_error) => { reject(_error); });

    });

    // given pollId, checks whether this poll is active or not
    isPollActive = (pollId) => new Promise((resolve, reject) => {

        this.contract.methods.isPollActive(pollId)
            .call({ from: this.account })
            .then((_result) => { resolve(_result); },
                (_error) => { reject(_error); });

    });

    // given X ( > 0 ), returns a list of X recent pollIds ( polls created on dApp )
    getRecentXActivePolls = (x) => new Promise((resolve, reject) => {
        if (!(x > 0)) {
            reject('X needs to be >0');
        }

        this.contract.methods.getRecentXActivePolls(x)
            .call({ from: this.account })
            .then((_result) => { resolve(_result); },
                (_error) => { reject(_error); });

    });

    // returns account owner name ( set by owner while registering in dApp )
    // given his/ his ethereum address ( from which account was opned )
    getAccountNameByAddress = (address) => new Promise((resolve, reject) => {

        this.contract.methods.getAccountNameByAddress(address)
            .call({ from: this.account })
            .then((_result) => { resolve(_result); },
                (_error) => { reject(_error); });

    });

    // returns current user's account name, 
    // simply using aforedefined function
    getMyAccountName = () => this.getAccountNameByAddress(this.account);

    // returns #-of polls created by this account ( address of account supplied )
    getAccountPollCountByAddress = (address) => new Promise((resolve, reject) => {

        this.contract.methods.getAccountPollCountByAddress(address)
            .call({ from: this.account })
            .then((_result) => { resolve(_result); },
                (_error) => { reject(_error); });

    });

    // returns #-of polls created by `this.account` ( i.e. checking self account )
    getMyPollCount = () => this.getAccountPollCountByAddress(this.account);

    // returns pollId ( uniquely indentifies a poll ), given creator's address
    //  & index of poll in his/ her account ( >=0  && < total #-of polls created )
    getPollIdByAddressAndIndex = (address, index) => new Promise((resolve, reject) => {

        this.contract.methods.getPollIdByAddressAndIndex(address, index)
            .call({ from: this.account })
            .then((_result) => { resolve(_result); },
                (_error) => { reject(_error); });

    });

    // same as previous one, but specialized case i.e. returns info for function invoker's account
    getMyPollIdByIndex = (index) => this.getPollIdByAddressAndIndex(this.account, index);

    // returns poll creator's address, given pollId ( which is also one unique identifier )
    getCreatorAddressByPollId = (pollId) => new Promise((resolve, reject) => {

        this.contract.methods.getCreatorAddressByPollId(pollId)
            .call({ from: this.account })
            .then((_result) => { resolve(_result); },
                (_error) => { reject(_error); });

    });

    // given pollId, returns poll's title
    getTitleByPollId = (pollId) => new Promise((resolve, reject) => {

        this.contract.methods.getTitleByPollId(pollId)
            .call({ from: this.account })
            .then((_result) => { resolve(_result); },
                (_error) => { reject(_error); });

    });

    // given pollid, returns start time of poll i.e. when poll went live
    getStartTimeByPollId = (pollId) => new Promise((resolve, reject) => {

        this.contract.methods.getStartTimeByPollId(pollId)
            .call({ from: this.account })
            .then((_result) => { resolve(_result); },
                (_error) => { reject(_error); });

    });

    // given pollid, returns end time of poll i.e. when poll stops(/stopped) accepting vote
    getEndTimeByPollId = (pollId) => new Promise((resolve, reject) => {

        this.contract.methods.getEndTimeByPollId(pollId)
            .call({ from: this.account })
            .then((_result) => { resolve(_result); },
                (_error) => { reject(_error); });

    });

    // Given pollId, returns total votes casted
    getTotalVotesCastedByPollId = (pollId) => new Promise((resolve, reject) => {

        this.contract.methods.getTotalVotesCastedByPollId(pollId)
            .call({ from: this.account })
            .then((_result) => { resolve(_result); },
                (_error) => { reject(_error); });

    });

    // given pollId, returns number of options available in poll
    getPollOptionCountByPollId = (pollId) => new Promise((resolve, reject) => {

        this.contract.methods.getPollOptionCountByPollId(pollId)
            .call({ from: this.account })
            .then((_result) => { resolve(_result); },
                (_error) => { reject(_error); });
    });

    // Given pollId & address of voter, it'll look up which option has this voter voted for
    getVoteByPollIdAndAddress = (pollId, address) => new Promise((resolve, reject) => {

        this.contract.methods.getVoteByPollIdAndAddress(pollId, address)
            .call({ from: this.account })
            .then((_result) => { resolve(_result); },
                (_error) => { reject(_error); });

    });

    // Given pollId, returns choice made by `this.accout`
    getMyVoteByPollId = () => this.getVoteByPollIdAndAddress(pollId, this.account);

    // given pollId & poll option index, returns poll options content ( i.e. statement in that option )
    // 
    // option index must be >= 0 && < total #-of poll options present in specified pollId
    getPollOptionContentByPollIdAndIndex = (pollId, index) => new Promise((resolve, reject) => {

        this.contract.methods.getPollOptionContentByPollIdAndIndex(pollId, index)
            .call({ from: this.account })
            .then((_result) => { resolve(_result); },
                (_error) => { reject(_error); });

    });

    // given pollId & poll option index, returns #-of votes casted on that option
    // 
    // option index must be >= 0 && < total #-of poll options present in specified pollId
    getPollOptionVoteCountByPollIdAndIndex = (pollId, index) => new Promise((resolve, reject) => {

        this.contract.methods.getPollOptionVoteCountByPollIdAndIndex(pollId, index)
            .call({ from: this.account })
            .then((_result) => { resolve(_result); },
                (_error) => { reject(_error); });

    });

    // given pollId ( globally uniquely identifies a poll ), returns status of poll as of now
    // i.e. which option is having max vote & vote count it has
    //
    // this computation may be slow, due to that fact that it needs to traverse all options
    // to determine which one is having max vote
    //
    // also this call will successfully go through, if and only if caller has already participated in this poll
    getWinningOptionIndexAndVotesByPollId = (pollId) => new Promise((resolve, reject) => {

        this.contract.methods.getWinningOptionIndexAndVotesByPollId(pollId)
            .call({ from: this.account })
            .then((_result) => { resolve(_result); },
                (_error) => { reject(_error); });

    });

    // given pollId, checks whether this poll is active anymore or not
    hasPollEnded = (pollId) => new Promise((resolve, reject) => {

        this.contract.methods.hasPollEnded(pollId)
            .call({ from: this.account })
            .then((_result) => { resolve(_result); },
                (_error) => { reject(_error); });

    });

    // given pollId, tries to declare result of this poll,
    // 
    // poll creator must be calling this methods, otherwise it'll fail
    // poll must have ended
    // emits event, that can be listened to from front end
    announcePollResult = (pollId) => {

        this.contract.methods.announcePollResult(pollId)
            .send({ from: this.account })
            .on('receipt', (_receipt) => { resolve(_receipt); })
            .on('error', (_error) => { reject(_error); });

    }

}

export default Bridge;
