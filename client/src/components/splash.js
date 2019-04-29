import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        currentUser: state.session
  }};

class Splash extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: 'noUser',

        }

    }

    componentDidMount(){
        if(this.props.currentUser.id) {
            this.setState({currentUser: this.props.currentUser.username});
        }
    }


    render() {
        console.log(this.props.currentUser);

        return (
            <div>
                
                {this.state.currentUser==='noUser'? <div><Link to='/signup'>Signup</Link>
                <Link to='/login'>Login</Link></div>: <div><p>Hello {this.state.currentUser}</p><p>logout</p></div>}
                <div className="splash">
                </div>
            </div>
        )
    }

}
// do not need export default Splash
export default connect(mapStateToProps, null)(Splash);
