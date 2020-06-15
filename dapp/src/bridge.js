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
    setMaxPollOptionCount(count) {
        return new Promise((resolve, reject) => {
            if (!(count >= 2 && count <= 16)) {
                reject('count must be >=2 && <=16');
            }

            this.contract.methods.setMaxPollOptionCount(count)
                .send({ from: this.account })
                .on('receipt', (_receipt) => { resolve(_receipt); })
                .on('error', (_error) => { reject(_error); });
        });
    }

    // creates user account in dApp, given name of account holder
    createUser(name) {
        return new Promise((resolve, reject) => {
            this.contract.methods.createUser(name)
                .send({ from: this.account })
                .on('receipt', (_receipt) => { resolve(_receipt); })
                .on('error', (_error) => { reject(_error); });
        });
    }

    // creates poll with given topic, from invoker's account
    createPoll(title) {
        return new Promise((resolve, reject) => {
            this.contract.methods.createPoll(title)
                .send({ from: this.account })
                .on('receipt', (_receipt) => { resolve(_receipt); })
                .on('error', (_error) => { reject(_error); });
        });
    }

}

export default Bridge;
