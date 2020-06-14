// this class will manage all communication to smart contract
// via web3 bridge
class Bridge {

    constructor(web3, accounts, contract) {
        this.web3 = web3;
        this.accounts = accounts;
        this.contract = contract;
    }

}

export default Bridge;
