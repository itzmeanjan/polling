import React from 'react';
import { Redirect } from 'react-router-dom';
import checkCompatibility from './checkCompatibility.js';
import './App.css';


class DApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { web3: undefined, status: 'Checking compatibility ...', redirect: false };
  }

  componentDidMount() {
    checkCompatibility().then((v) => {
      this.setState({
        web3: v,
        status: 'Welcome to Polling :)'
      });
    }, (r) => {
      this.setState({
        status: 'Incompatible browser !'
      });
    });
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to="/polling" />);
    }

    setTimeout(() => {
      this.setState((state) => {
        return {
          ...state,
          redirect: true
        };
      })
    }, 1500);

    return (
      <div className="dApp">
        <h2 className="status">{this.state.status}</h2>
      </div>
    );
  }
}

export default DApp;
