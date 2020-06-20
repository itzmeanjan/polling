import React from 'react';

// Home page of polling dApp
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = { status: 'Welcome to Polling !', needToRegister: false }
    }

    // called after first rendering of scene,
    // decides whether to navigate user to Register page or not
    async componentDidMount() {
        try {
            const res = await this.props.bridge.amIRegistered();

            this.setState({ needToRegister: res });
        } catch (e) {
            this.setState({ status: e });
        }

    }

    render() {

        if (this.needToRegister) {
            return (
                <div>
                    <h1>To be implemented ...</h1>
                </div>
            )
        }
        return (
            <div>
                <h1>{this.state.status}</h1>
            </div>
        )

    }

}

export default Home;
