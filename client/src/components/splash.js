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
<nav className="navbar navbar-default navbar-expand-lg navbar-light">
	<div className="navbar-header d-flex col">
		<a className="navbar-brand" href="#">Brand Name</a>  		
		<button type="button" data-target="#navbarCollapse" data-toggle="collapse" className="navbar-toggle navbar-toggler ml-auto">
			<span className="navbar-toggler-icon"></span>
			<span className="icon-bar"></span>
			<span className="icon-bar"></span>
			<span className="icon-bar"></span>
		</button>
	</div>
	<div id="navbarCollapse" className="collapse navbar-collapse justify-content-start">
		<ul className="nav navbar-nav">
			<li className="nav-item"><a href="#" className="nav-link">Home</a></li>
			<li className="nav-item"><a href="#" className="nav-link">About</a></li>			
			<li className="nav-item dropdown">
				<a data-toggle="dropdown" className="nav-link dropdown-toggle" href="#">Services <b className="caret"></b></a>
				<ul className="dropdown-menu">					
					<li><a href="#" className="dropdown-item">Digital Marketing</a></li>
				</ul>
			</li>
			<li className="nav-item active"><a href="#" className="nav-link">Pricing</a></li>
			<li className="nav-item"><a href="#" className="nav-link">Blog</a></li>
			<li className="nav-item"><a href="#" className="nav-link">Contact</a></li>
		</ul>
		<form className="navbar-form form-inline">
			<div className="input-group search-box">								
				<input type="text" id="search" className="form-control" placeholder="Search here..."/>
				<span className="input-group-addon"><i className="material-icons">&#xE8B6;</i></span>
			</div>
		</form>
		{this.state.currentUser==='noUser'? 
		<ul className="nav navbar-nav navbar-right ml-auto">
         <li className="nav-item"><Link className="nav-link" to='/login'>Login</Link></li>
		 <li className="nav-item"><Link className="btn btn-primary get-started-btn mt-1 mb-1" to='/signup'>Signup</Link></li>
		</ul>
		 : 
		 <div>
		 <li className="nav-item"><Link className="nav-link" to='/signup'>Signup</Link></li>
		 <li className="nav-item"><Link className="btn btn-primary" to='/#'>Logout</Link></li>
		 </div>}		
	</div>
</nav>
                <div className="splash">
                    <h1>Text To Order</h1>
                </div>
            </div>
        )
    }

}
// do not need export default Splash
export default connect(mapStateToProps, null)(Splash);
