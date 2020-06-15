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

}

export default Bridge;
