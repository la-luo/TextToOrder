import React from 'react';
import { withRouter} from 'react-router-dom';


class SessionForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            storename: '',
            storeaddress:'',
            firstname: '',
            lastname: '',
            email: ''
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
            {this.props.formType === 'signup'?
            <div className="signup-form">
                <form onSubmit={this.handleSubmit}>
                    <h2>Partner with us</h2>
                    <hr/>
                    <p>Please fill in this form to create an account!</p>
                    <div className="form-group">
                        <div className="input-group">
                            <input type="text" value={this.state.storename} onChange={this.update("storename")} className="form-control" name="storename" placeholder="Store Name" required="required"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-map-pin"></i></span>
                            <input type="text" value={this.state.storeaddress} onChange={this.update("storeaddress")} className="form-control" name="storeaddress" placeholder="Store Address" required="required"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <input type="text" value={this.state.firstname} onChange={this.update("firstname")} className="form-control" name="firstname" placeholder="First Name" required="required"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <input type="text" value={this.state.lastname} onChange={this.update("lastname")} className="form-control" name="lastname" placeholder="Last Name" required="required"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <input type="email" value={this.state.email} onChange={this.update("email")} className="form-control" name="email" placeholder="Contact Email" required="required"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary btn-lg" value="Get Started" />
                    </div>
                </form>
          </div>
        :<div className="signup-form">
            <form onSubmit={this.handleSubmit}> 
                <h2>Log In</h2>
                <hr/>
                <p>Welcome back!</p>
                <div className="form-group">
                    <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-user"></i></span>
                        <input type="text" value={this.state.username} onChange={this.update("username")} className="form-control" name="username" placeholder="Username" required="required"/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                        <input type="password" value={this.state.password} onChange={this.update("password")} className="form-control" name="password" placeholder="Password" required="required"/>
                    </div>
                </div>
                <input type="submit" className="btn btn-primary btn-lg" value="Login" />
            </form>
            <div className="text-center">Want to become a partner restaurant?
                <a href="/restaurant/signup">Sign up</a>
            </div>
        </div>}
        </div>
        )}

    }


export default withRouter(SessionForm);