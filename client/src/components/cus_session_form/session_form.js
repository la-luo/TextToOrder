import React from 'react';
import { withRouter} from 'react-router-dom';


class SessionForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            password2: '',
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
                    <h2>Sign Up</h2>
                    <hr/>
                    <p>Please fill in this form to create an account!</p>
                    <div className="form-group">
                        <div className="input-group input-cus">
                            <input type="text" value={this.state.username} onChange={this.update("username")} className="form-control" name="username" placeholder="Username" required="required"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group input-cus">
                            <input type="email" value={this.state.email} onChange={this.update("email")} className="form-control" name="email" placeholder="Email Address" required="required"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group input-cus">
                            <input type="password" value={this.state.password} onChange={this.update("password")} className="form-control" name="password" placeholder="Password" required="required"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group input-cus">
                            <input type="password" value={this.state.password2} onChange={this.update("password2")} className="form-control" name="confirm_password" placeholder="Confirm Password" required="required"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="checkbox-inline"><input type="checkbox" required="required"/> I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary btn-lg" value="Sign up" />
                    </div>
                </form>
                <div className="text-center">Already have an account? 
                   <a href="/login">Login here</a>
                </div>
          </div>
        :<div className="signup-form">
            <form onSubmit={this.handleSubmit}> 
                <h2>Log In</h2>
                <hr/>
                <p>Welcome back!</p>
                <div className="form-group">
                    <div className="input-group input-cus">
                        <input type="text" value={this.state.username} onChange={this.update("username")} className="form-control" name="username" placeholder="Username" required="required"/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group input-cus">
                        <input type="password" value={this.state.password} onChange={this.update("password")} className="form-control" name="password" placeholder="Password" required="required"/>
                    </div>
                </div>
                <input type="submit" className="btn btn-primary btn-lg" value="Sign up" />
            </form>
            <div className="text-center">New to TextToOrder? Sign up
                <a href="/signup">Sign up</a>
            </div>
        </div>}
        </div>
        )}

    }


export default withRouter(SessionForm);