import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';


const mapStateToProps = (state) => {
    return {
        session: state.session
    }
};

class merDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }

    }


    render() {

        return (
            <div>
                <h3>Your Restaurant Information</h3>

                <h3>Your Menu</h3>

                <h3>Order History</h3>
            </div>
        )
    }

}

export default connect(mapStateToProps, null)(merDashboard);