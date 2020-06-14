import React from 'react';
import checkCompatibility from './checkCompatibility.js';
import Polling from './contracts/Polling.json';
import Bridge from './bridge.js';
import './App.css';


class DApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bridge: null, status: 'Checking compatibility ...' };
  }

  async componentDidMount() {
    try {
      const web3 = await checkCompatibility();
      const accounts = await web3.eth.getAccounts();
      let id = await web3.eth.net.getId();

      const contract = new web3.eth.Contract(
        Polling.abi,
        Polling.networks[id].address
      );

      this.setState({
        bridge: new Bridge(web3, accounts, contract)
      });
    } catch (error) {
      this.setState({ status: 'Incompatible browser !' });
    }
  }

  render() {
    if (this.state.bridge) {
      return (<div class="dApp">
        <h1 className="status">
          Obtained ...
        </h1>
      </div>);
    }

    return (
      <div className="dApp">
        <h2 className="status">{this.state.status}</h2>
      </div>
    );
  }
}

export default DApp;
