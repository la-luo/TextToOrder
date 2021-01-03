import React from 'react';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
    return {
        session: state.session,
    }
};


class Orders extends React.Component {
    

    render() {
        const orders = this.props.session.orders;
        return (
            <div>
                <div className="table-wrapper">
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-6">
                            <h2>Order History</h2>
                        </div>
                        <div className="col-sm-6">
                        </div>
                    </div>
                </div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Timestamps</th>
                        </tr>
                    </thead>
                    <tbody>
      
                        {orders.map((order, idx) => 
                          (
                            <tr key={idx}>
                                <td>{order._id}</td>
                                <td>{order.items.join(', ')}</td>
                                <td>{order.total}</td>
                                <td>{order.timestamps}</td>
                            </tr>)
                          )
                        }
                    </tbody>
                </table>
                <div className="clearfix">
                    <div className="hint-text">Showing <b>{orders.length}</b> out of <b>{orders.length}</b> entries</div>
                    <ul className="pagination">
                        <li className="page-item disabled"><a href="#">Previous</a></li>
                        <li className="page-item"><a href="#" className="page-link">1</a></li>
                        <li className="page-item"><a href="#" className="page-link">Next</a></li>
                    </ul>
                </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, null)(Orders);