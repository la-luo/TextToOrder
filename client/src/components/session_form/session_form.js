import React from 'react';
import axios from "axios";
import { withRouter, Link } from 'react-router-dom';


class SessionForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            password2: '',
            email: '',
            name: ''
        };

        this.update = this.update.bind(this);
        this.putUserToDB = this.putUserToDB.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    putUserToDB(e) {
        e.preventDefault();

        const newUser = Object.assign({}, this.state);
        axios.post("http://localhost:5000/register", newUser);
    };

    handleLogin(e) {
        e.preventDefault();

        const {username, password} = this.state;
        const credentials = {username, password};
        axios.post("http://localhost:5000/login", credentials)
        .then(function(response){
            if (response.data.redirect === 'validUser'){
                window.location = "http://localhost:3000/#/userprofile/"
            } 
        });
    };

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        }) 
    }

    handleLogout(e) {
        e.preventDefault();
        axios("http://localhost:5000/logout")
        .then(function(response){
            if (response.data.redirect === 'noUser'){
                window.location = "http://localhost:3000/#/login/"
            } else if (response.data.redirect === 'validUser'){
                window.location = "http://localhost:3000/#/logout/"
            } 
        });
    }


    render() {
       
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


            <button onClick={this.handleLogout}>
                Log out    
            </button>
           </div>
        )
    }

    
}

export default SessionForm;