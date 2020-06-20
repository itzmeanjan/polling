import React from 'react';

// Home page of polling dApp
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = { status: 'Welcome to Polling !', needToRegister: false }
    }

    render() {

        return (
            <div>
                <h1>{this.state.status}</h1>
            </div>
        )

    }

}

export default Home;
