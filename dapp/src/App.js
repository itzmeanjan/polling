import React from 'react';
import { Redirect } from 'react-router-dom';
import checkCompatibility from './checkCompatibility.js';
import './App.css';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';


class DApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { web3: undefined, status: 'Checking compatibility ...', redirect: false };
  }

  componentDidMount() {
    checkCompatibility().then((v) => {
      this.setState({
        web3: v,
        status: 'Welcome to Polling :)',
        redirect: true
      });
    }, (r) => {
      this.setState({
        status: 'Incompatible browser !'
      });
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/polling" />
    }

    return (
      <div className="dApp">
        <h2 className="status">{this.state.status}</h2>
      </div>
    );
  }
}

export default DApp;
