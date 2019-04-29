import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';


const mapStateToProps = (state) => {
    return {
        session: state.session
    }
};

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }

    }


    render() {

        return (
            <div>
                <p>dashboard</p>
            </div>
        )
    }

}

export default connect(mapStateToProps, null)(Dashboard);