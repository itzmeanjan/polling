const Polling = artifacts.require('Polling');

module.exports = (deployer) => {
    deployer.deploy(Polling);
};
