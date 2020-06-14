import Web3 from 'web3';

// checks whether it's a modern dapp browser or not
// if yes, resolves by returning instance to web3 object
// which can be used for further interaction with blockchain
const checkCompatibility = () => new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
        if (window.ethereum) {
            let web3Provider = new Web3(window.ethereum);
            try {
                await window.ethereum.enable();
                resolve(web3Provider);
            } catch (error) {
                reject(error);
            }
        } else {
            reject("Use ethereum compatible browser");
        }
    });
});

export default checkCompatibility;
