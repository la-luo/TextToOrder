import React from 'react';
import Menu from './menu';
import { connect } from 'react-redux';
import { fetchItems } from '../../actions/item_actions';

const mapStateToProps = (state) => {
    return {
        session: state.session,
        items: state.items
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchItems: merchantId => dispatch(fetchItems(merchantId))
    }
}

class merDashboard extends React.Component {
    constructor(props) {
        super(props);
        var session = this.props.session;
        
        this.state = {
            email: session.email,
            phone: session.phone,
            firstname: session.firstname,
            lastname: session.lastname,
            storename: session.storename,
            address: session.address,
            intro: session.intro,
            showHome: true,
            showMenu: false,
            showOrders: false,
            showSettings: false
        
        }

        this.showHome = this.showHome.bind(this);
        this.showMenu = this.showMenu.bind(this);
        this.showOrders = this.showOrders.bind(this);
        this.showSettings = this.showSettings.bind(this);


    }

    componentDidMount(){
        this.props.fetchItems(this.props.session.id);
    }

    showHome(e) {
        e.preventDefault();
        this.setState({ showHome: true, showMenu: false, showOrders: false, showSettings: false});
    }

    showMenu(e) {
        e.preventDefault();
        this.setState({ showHome: false, showMenu: true, showOrders: false, showSettings: false});
    }

    showOrders(e) {
        e.preventDefault();
        this.setState({ showHome: false, showMenu: false, showOrders: true, showSettings: false});
    }

    showSettings(e) {
        e.preventDefault();
        this.setState({ showHome: false, showMenu: false, showOrders: false, showSettings: true});
    }



    render() {
        const {email, 
               phone,
               firstname, 
               lastname, 
               storename, 
               address, 
               intro,
               showHome,
               showMenu,
               showOrders,
               showSettings} = this.state;
        let dashboardContent;

        if (showHome) {
            dashboardContent = (<form>
             <div className="row">
                 <div className="col-md-6 mb-3">
                     <label>Email</label>
                     <input disabled className="form-control" placeholder={email} />
                 </div>
                 <div className="col-md-6 mb-3">
                     <label>Phone</label>
                     <input disabled className="form-control" placeholder={phone} />
                 </div>
             </div>
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

             <input type="submit" className="btn btn-profile-success" value="Update your profile"/>

            </form>);
        } else if (showMenu) {
            dashboardContent = <Menu /> 
        } else if (showOrders) {
            dashboardContent = <div>orders</div>
        } else {
            dashboardContent = <div>settings</div>
        }

        return (
            <div className="home">
            <div className="container-fluid display-table">
                    <div className="col-md-2 col-sm-1 hidden-xs display-table-cell v-align box" id="navigation">
                        <div className="logo">
                            <a href="home.html">Text To Order</a>
                        </div>
                        <div className="navi">
                            <ul>
                                <li className={this.state.showHome ? 'active': null}><a onClick={this.showHome}><i className="fa fa-home" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Home</span></a></li>
                                <li className={this.state.showMenu ? 'active': null}><a onClick={this.showMenu}><i className="fa fa-list-alt" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Menu</span></a></li>
                                <li className={this.state.showOrders ? 'active': null}><a onClick={this.showOrders}><i className="fa fa-calendar" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Orders</span></a></li>
                                <li className={this.state.showSettings ? 'active': null}><a onClick={this.showSettings}><i className="fa fa-cog" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Setting</span></a></li>
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
                            {dashboardContent}
                        </div>
                    </div>

            </div>
        </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(merDashboard);