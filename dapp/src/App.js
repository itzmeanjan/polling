import React from 'react';
import checkCompatibility from './checkCompatibility.js';
import Polling from './contracts/Polling.json';
import Bridge from './bridge.js';
import './App.css';
import Home from './Home.js';

// main component, gets rendered first, after checking
// browser compatibility, tries to create bridge for talking to 
// blockchain
class DApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bridge: null, status: 'Checking compatibility ...', error: null };
  }

  // as soon as render is called for very first time, this method
  // to be called, where we'll check browser compatibility,
  // access accounts, and obtains network id of currently connected network,
  // then creates bridge for talking to blockchain ( i.e. smart contract methods )
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
        bridge: new Bridge(web3, accounts[0], contract),
        status: 'Welcome to Polling :)'
      });
    } catch (error) {
      this.setState({ error: 'Incompatible browser !' });
    }
  }

  render() {
    if (this.state.error) {
      return (<div className="dApp">
        <h2 className="error">
          {this.state.error}
        </h2>
      </div>);
    } else {
      if (this.state.bridge) {
        // getting to home page, where passing bridge
        // as a prop of react component
        return <Home bridge={this.state.bridge} />;
      }

      return (
        <div className="dApp">
          <h2 className="status">{this.state.status}</h2>
        </div>
      );
    }
  }
}

export default DApp;
