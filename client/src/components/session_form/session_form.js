import React from 'react';
import axios from "axios";
import { withRouter } from 'react-router-dom';


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

        this.putUserToDB = this.putUserToDB.bind(this);
    }

    putUserToDB(e) {
        e.preventDefault();

        const newUser = Object.assign({}, this.state);
        axios.post("http://localhost:3001/api/users/register", newUser);
    };


    render() {
       
        return (
           <div>
            <div>Sign Up</div>
           </div>
        )
    }

    
}

export default SessionForm;