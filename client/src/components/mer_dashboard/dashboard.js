import React from 'react';
import Menu from './menu';
import Orders from './orders';
import Home from './home';
import { connect } from 'react-redux';
import { withRouter, Route, Link} from 'react-router-dom';
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

const Settings = () => (
    <div>Coming soon...</div>
)

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
        this.logout = this.logout.bind(this);

    }

    componentDidMount(){
        this.props.fetchItems(this.props.session.id);
    }

    showHome(e) {
        e.preventDefault();
        this.setState({ showHome: true, showMenu: false, showOrders: false, showSettings: false});
        this.props.history.push('/merchants/dashboard');
    }

    showMenu(e) {
        e.preventDefault();
        this.setState({ showHome: false, showMenu: true, showOrders: false, showSettings: false});
        this.props.history.push('/merchants/dashboard/menu');
    }

    showOrders(e) {
        e.preventDefault();
        this.setState({ showHome: false, showMenu: false, showOrders: true, showSettings: false});
        this.props.history.push('/merchants/dashboard/orders');
    }

    showSettings(e) {
        e.preventDefault();
        this.setState({ showHome: false, showMenu: false, showOrders: false, showSettings: true});
        this.props.history.push('/merchants/dashboard/settings');
    }

    logout(e) {
        localStorage.clear();
        this.setState({});
        this.props.history.push('/');
    }
 


    render() {
        const {
               firstname, 
               lastname, 
              } = this.state;

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
                                <div className="col-md-4">
                                    <div className="header-middle">
                                    </div>
                                </div>
                                <div className="col-md-1">
                                    <div className="header-rightside">
                                        <button className="btn btn-primary" onClick={this.logout}>Logout</button>
                                    </div>
                                </div>
                            </header>
                        </div>
                        <div className="user-dashboard">
                             <Route exact path={"/merchants/dashboard"} component={Home}/> 
                             <Route exact path={"/merchants/dashboard/menu"} component={Menu}/> 
                             <Route exact path={"/merchants/dashboard/orders"} component={Orders}/> 
                             <Route exact path={"/merchants/dashboard/settings"} component={Settings}/> 
                        </div>
                    </div>

            </div>
        </div>
        )
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(merDashboard));