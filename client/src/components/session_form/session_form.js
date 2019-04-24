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
       if (this.props.formType === 'signup') {
        return (
            <div>
            <form onSubmit={this.putUserToDB}>
                <div>Sign Up</div>
                <label>Username:
                    <input type="text" value={this.state.username} onChange={this.update("username")} />
                </label>
                <label>Password:
                    <input type="password" value={this.state.password} onChange={this.update("password")} />
                </label>
                <label>Confirm Password:
                    <input type="password" value={this.state.password2} onChange={this.update("password2")} />
                    
                </label>
                <label>Email:
                    <input type="email" value={this.state.email} onChange={this.update("email")} />
                </label>
                <input type="submit" value="Submit" />
            </form>
          </div>
        )
       }else {        
        return (
           <div>

            <form onSubmit={this.handleLogin}> 
                <div>Log In</div>
                <label>Username:
                    <input type="text" value={this.state.username} onChange={this.update("username")} />
                </label>
                <label>Password:
                    <input type="password" value={this.state.password} onChange={this.update("password")} />
                </label>
                <input type="submit" value="Submit" />
            </form>

           </div>
        )}

    }

    
}

export default withRouter(SessionForm);