import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';


const mapStateToProps = (state) => {
    return {
        session: state.session
    }
};

class cusDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }

    }


    render() {

        return (
            <div>
                <h1>Your Order History</h1>

            </div>
        )
    }

}

export default connect(mapStateToProps, null)(cusDashboard);