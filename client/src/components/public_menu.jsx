import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        currentUser: state.session
    }
}

class PublicMenu extends React.Component {
    
    constructor(props) {

        super(props);

        this.state = {

        }
    }


    render() {

        return (
            <div>
                <h1>Menu</h1>

            </div>
        )
    }


}


export default connect(mapStateToProps, null)(PublicMenu);