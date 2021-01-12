import React from 'react';
import { withRouter, Link} from 'react-router-dom';


class SignupForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            storename: '',
            storeaddress:'',
            firstname: '',
            lastname: '',
            email: '',
            currentUser: 'noUser'
        };

        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(e) {
        e.preventDefault();

        const user = Object.assign({}, this.state);
        this.props.processForm(user);
    };

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        }) 
    }



    render() {
        return (
        <div>
            <nav className="navbar navbar-default navbar-expand-lg navbar-light">
                <div className="navbar-header d-flex col">
                    <a className="navbar-brand" href="/">Text To Order</a>  		
                    <button type="button" data-target="#navbarCollapse" data-toggle="collapse" className="navbar-toggle navbar-toggler ml-auto">
                        <span className="navbar-toggler-icon"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                </div>
                <div id="navbarCollapse" className="collapse navbar-collapse justify-content-start">
                    {this.state.currentUser==='noUser'? 
                    <ul className="nav navbar-nav navbar-right ml-auto">
                    <li className="nav-item"><Link className="nav-link" to='/merchants/login'>Sign In</Link></li>
                    <li className="nav-item"><Link className="btn btn-primary get-started-btn mt-1 mb-1" to='/merchants/signup'>Sign Up</Link></li>
                    </ul>
                    : 
                    <div>
                    <li className="nav-item"><Link className="nav-link" to='/merchants/signup'>Sign Up</Link></li>
                    <li className="nav-item"><Link className="btn btn-primary" to='/#'>Logout</Link></li>
                    </div>}		
                </div>
            </nav>
            <div className="slogan-1">Boost Your Business</div>
            <div className="slogan-2">Pay a much lower service fee</div>

            <div className="cooking-splash"></div>

            <div className="signup-form mer-signup">
                <form onSubmit={this.handleSubmit}>
                    <h2>Partner with us</h2>
                    <hr/>
                    <p>{this.props.session.info === undefined ? 'Please fill in this form to create an account!': this.props.session.info }</p>
                    <div className="form-group">
                        <div className="input-group mer-input">
                            <input type="text" value={this.state.storename} onChange={this.update("storename")} className="form-control" name="storename" placeholder="Store Name" required="required"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-map-pin"></i></span>
                            <input type="text" value={this.state.storeaddress} onChange={this.update("storeaddress")} className="form-control" name="storeaddress" placeholder="Store Address" required="required"/>
                        </div>
                    </div>
                    <div className="form-group mer-firstname">
                        <div className="input-group">
                            <input type="text" value={this.state.firstname} onChange={this.update("firstname")} className="form-control" name="firstname" placeholder="First Name" required="required"/>
                        </div>
                    </div>
                    <div className="form-group mer-lastname">
                        <div className="input-group">
                            <input type="text" value={this.state.lastname} onChange={this.update("lastname")} className="form-control" name="lastname" placeholder="Last Name" required="required"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group mer-input">
                            <input type="email" value={this.state.email} onChange={this.update("email")} className="form-control" name="email" placeholder="Contact Email" required="required"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary btn-lg mer-input" value="Get Started" />
                    </div>
                </form>
                { this.props.session.info && <div className="alert alert-success">Thanks for reaching out! We will send an email for you to veirify your account. After you confirm it, we will follow up soon!</div>}
            </div>
        </div>
        )}

    }


export default withRouter(SignupForm);