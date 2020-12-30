import React from 'react';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        currentUser: state.session
  }};

class Splash extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: '',

        }

    }

    componentDidMount(){
        if(this.props.currentUser.id) {
            this.setState({currentUser: this.props.currentUser.username});
        }
    }


    render() {
        //console.log(this.props.currentUser);

        return (
        <div>
        <nav className="navbar navbar-default navbar-expand-lg navbar-light">
            <div className="navbar-header d-flex col">
                <a className="navbar-brand" href="#">Text To Order</a>  		
                <button type="button" data-target="#navbarCollapse" data-toggle="collapse" className="navbar-toggle navbar-toggler ml-auto">
                <span className="navbar-toggler-icon"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                </button>
            </div>
            <div id="navbarCollapse" className="collapse navbar-collapse justify-content-start">
                {localStorage.getItem('jwtToken ') === null ? 
                <ul className="nav navbar-nav navbar-right ml-auto">
                    <li className="nav-item">
                    <Link className="nav-link" to='/login'>
                    Sign In</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="btn btn-primary get-started-btn mt-1 mb-1" to='/signup'>
                    Sign Up</Link>
                    </li>
                </ul>
                : 
                <ul className="nav navbar-nav navbar-right ml-auto">
                    <li className="nav-item">
                    <Link className="nav-link" to='/signup'>
                    Sign Up</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="btn btn-primary" to='/#'>
                    Logout</Link>
                    </li>
                </ul>
                }		
            </div>
        </nav>
        <section>
            <div className="intro">
                <h1>Text To Order</h1>
            </div>
            <div className="splash">
            </div>
        </section>
        <section>
            <div className="find-business">
                <h2>Find restaurants, cafes, shops...</h2>
            </div>
        </section>
        <footer>
            <a href="/merchants/signup">Become a Partner Restaurant</a>
        </footer>
        </div>
        )
    }

}
// do not need export default Splash
export default connect(mapStateToProps, null)(Splash);
