import React from 'react';
import getMetaMask from './getMetaMask.js';
import './App.css';


class DApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { web3: undefined, status: 'Checking compatibility ...' };
  }

  componentDidMount() {
    getMetaMask().then((v) => {
      this.setState({
        web3: v,
        status: 'Welcome to Polling :)'
      });
    }, (reason) => {
      this.setState({
        status: 'Incompatible browser !'
      });
    });
  }

  render() {
    return (
      <div className="dApp">
        <h2 className="status">{this.state.status}</h2>
      </div>
    );
  }
}

export default DApp;
