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
        var session = this.props.session;
        
        this.state = {
            email: session.email,
            firstname: session.firstname,
            lastname: session.lastname,
            storename: session.storename,
            address: session.address,
            intro: session.intro
        }

    }


    render() {
        const {email, firstname, lastname, storename, address, intro} = this.state;
        return (
            <div className="home">
            <div className="container-fluid display-table">
                    <div className="col-md-2 col-sm-1 hidden-xs display-table-cell v-align box" id="navigation">
                        <div className="logo">
                            <a href="home.html">Text To Order</a>
                        </div>
                        <div className="navi">
                            <ul>
                                <li className="active"><a href="#"><i className="fa fa-home" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Home</span></a></li>
                                <li><a href="#"><i className="fa fa-list-alt" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Menu</span></a></li>
                                <li><a href="#"><i className="fa fa-calendar" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Orders</span></a></li>
                                <li><a href="#"><i className="fa fa-cog" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Setting</span></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-10 col-sm-11 display-table-cell v-align">
                        <div className="row">
                            <header>
                                <div className="col-md-7">
                                    <nav className="navbar-default pull-left">
                                        <div className="navbar-header">
                                        <a>Welcome back {firstname} {lastname}!</a>
                                        </div>
                                    </nav>
                                </div>
                                <div className="col-md-5">
                                    <div className="header-rightside"></div>
                                </div>
                            </header>
                        </div>
                        <div className="user-dashboard">
                           <label>Email {email}</label>
                           <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>First Name</label>
                                    <input className="form-control" placeholder={firstname} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Last Name</label>
                                    <input className="form-control" placeholder={lastname} />
                                </div>
                            </div>
                            <label>Store Name</label>
                            <input className="form-control" placeholder={storename} />
                            <label>Address</label>
                            <input className="form-control" placeholder={address} />
                            <label>Introduction</label>
                            <textarea className="form-control" placeholder={intro} />

                        </div>
                    </div>

            </div>


        </div>
        )
    }

}

export default connect(mapStateToProps, null)(merDashboard);