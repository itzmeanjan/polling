import Web3 from 'web3';

const getMetaMask = () => new Promise((resolve, reject) => {
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


export default getMetaMask;
