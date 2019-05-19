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
                <p>Your Restaurant List</p>
                <label>
                    <input placeholder="New Restaurant Name" />
                </label>
                <label>
                    <input placeholder="New Restaurant Address" />
                </label>
                <label>
                    <input placeholder="New Restaurant Introduction" />
                </label>

            </div>
        )
    }

}

export default connect(mapStateToProps, null)(Dashboard);