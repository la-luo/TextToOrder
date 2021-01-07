import React from 'react';
import {connect} from 'react-redux';
import { withRouter} from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
        session: state.session
    }
};

const mapDispatchToProps = dispatch => {
    return {

    }
}

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name:'',
            category:'',
            price:'',
            description: ''
        }
    }

    render() {
        const session = this.props.session;
        return (
            <form>
             <div className="row">
                 <div className="col-md-3 mb-3">
                     <label>Email</label>
                     <input disabled className="form-control" placeholder={session.email} />
                 </div>
                 <div className="col-md-3 mb-3">
                     <label>Phone</label>
                     <input disabled className="form-control" placeholder={session.phone} />
                 </div>
             </div>
            <div className="row">
                 <div className="col-md-3 mb-3">
                     <label>First Name</label>
                     <input className="form-control" placeholder={session.firstname} />
                 </div>
                 <div className="col-md-3 mb-3">
                     <label>Last Name</label>
                     <input className="form-control" placeholder={session.lastname} />
                 </div>
             </div>
             <div className="row col-md-8 long-input">
                <label>Store Name</label>
                <input className="form-control" placeholder={session.storename} />
                <label>Address</label>
                <input className="form-control" placeholder={session.address} />
                <label>Introduction</label>
                <textarea className="form-control" placeholder={session.intro} />
             </div>
             <div className="row">
                <div className="col-md-6">
                </div>
                <div className="col-md-3">
                    <input type="submit" className="btn btn-profile-success" value="Update"/>
                </div>
             </div>

            </form>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));