import React from 'react';
import checkCompatibility from './checkCompatibility.js';

class DPolling extends React.Component {
    constructor(props) {
        super(props);
        this.state = { web3: undefined };
    }

    componentDidMount() {
        checkCompatibility().then((v) => {
            this.setState({
                web3: v
            });
        }, (r) => { });
    }

    render() {
        return (
            <div>
                <p>
                    Hello ...
                </p>
            </div>
        )
    }
}

export default DPolling;
