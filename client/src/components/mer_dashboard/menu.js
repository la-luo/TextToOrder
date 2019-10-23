import React from 'react';
import {connect} from 'react-redux';
import { createItem, fetchItems } from '../../actions/item_actions';

const mapStateToProps = (state) => {
    return {
        session: state.session,
        items: state.items
    }
};

const mapDispatchToProps = dispatch => {
    return {
        createItem: item_data => dispatch(createItem(item_data)),
        fetchItems: merchantId => dispatch(fetchItems(merchantId))
    }

}

class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name:'',
            category:'',
            price:'',
            description: '',
            items: []
        }

        this.merchantId = this.props.session.id;

        this.handldChange = this.handldChange.bind(this);
        this.handleAddSubmit = this.handleAddSubmit.bind(this);

    }

    componentDidMount(){
        this.props.fetchItems(this.merchantId);
        this.setState({items: this.props.items});
        
    }

    componentWillReceiveProps(nextProps) {
    }


    handldChange(field) {
        return (e) => {
            this.setState({[field]: e.target.value});
        }
    }

    handleAddSubmit(e) {
        e.preventDefault();

        const newItem = {
            merchant: this.props.session.id,
            name: this.state.name,
            category: this.state.category,
            price:this.state.price,
            Description: this.state.description
        }

        this.props.createItem(newItem);

       
    }


    render() {
        const items = this.props.items;

        if (!items) return <div />;

        return (
            <div>
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-6">
                            <h2>Manage Menu</h2>
                        </div>
                        <div className="col-sm-6">
                            <a href={`/menu/${this.merchantId}`} className="btn" data-toggle="modal"><i className="material-icons">restaurant_menu</i> <span>Preview Menu</span></a>	    
                            <a href="#addEmployeeModal" className="btn" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Item</span></a>					
                        </div>
                    </div>
                </div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>
                                <span className="custom-checkbox">
                                    <input type="checkbox" id="selectAll" />
                                    <label htmlFor="selectAll"></label>
                                </span>
                            </th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
      
                        {items.map((item, idx) => 
                          (
                            <tr key={idx}>
                                <td>
                                    <span className="custom-checkbox">
                                        <input type="checkbox" id="checkbox1" name="options[]" value="1"/>
                                        <label htmlFor="checkbox1"></label>
                                    </span>
                                </td>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                <td>
                                    <a href="#editEmployeeModal" className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                                    <a href="#deleteEmployeeModal" className="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                                </td>
                            </tr>)
                          )
                        }
                    </tbody>
                </table>
                <div className="clearfix">
                    <div className="hint-text">Showing <b>5</b> out of <b>15</b> entries</div>
                    <ul className="pagination">
                        <li className="page-item disabled"><a href="#">Previous</a></li>
                        <li className="page-item active"><a href="#" className="page-link">1</a></li>
                        <li className="page-item"><a href="#" className="page-link">2</a></li>
                        <li className="page-item"><a href="#" className="page-link">Next</a></li>
                    </ul>
                </div>
           </div>
        <div id="addEmployeeModal" className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={this.handleAddSubmit}>
                        <div className="modal-header">						
                            <h4 className="modal-title">Add Item</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                        <div className="modal-body">					
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" value={this.state.name} onChange={this.handldChange('name')} className="form-control" required/>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Category</label>
                                </div>
                                <select onChange={this.handldChange('category')} className="custom-select" id="inputGroupSelect01">
                                    <option defaultValue>Choose...</option>
                                    <option value="Appetizers">Appetizers</option>
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Desserts">Desserts</option>
                                    <option value="Drinks">Drinks</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Mains">Mains</option>
                                    <option value="Specials">Specials</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Price</label>
                                <input value={this.state.price} onChange={this.handldChange('price')} type="text" className="form-control" required/>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea value={this.state.description} onChange={this.handldChange('description')} className="form-control" required/>
                            </div>					
                        </div>
                        <div className="modal-footer">
                            <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel"/>
                            <input type="submit" className="btn btn-success" value="Add"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div id="editEmployeeModal" className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form>
                        <div className="modal-header">						
                            <h4 className="modal-title">Edit Item</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                        <div className="modal-body">					
                        <   div className="form-group">
                                <label>Name</label>
                                <input type="text" className="form-control" required/>
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <input type="email" className="form-control" required/>
                            </div>
                            <div className="form-group">
                                <label>Price</label>
                                <input typr="text" className="form-control" required/>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea className="form-control" required/>
                            </div>						
                        </div>
                        <div className="modal-footer">
                            <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel"/>
                            <input type="submit" className="btn btn-info" value="Save"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div id="deleteEmployeeModal" className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form>
                        <div className="modal-header">						
                            <h4 className="modal-title">Delete Item</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                        <div className="modal-body">					
                            <p>Are you sure you want to delete this Item?</p>
                            <p className="text-warning"><small>This action cannot be undone.</small></p>
                        </div>
                        <div className="modal-footer">
                            <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel"/>
                            <input type="submit" className="btn btn-danger" value="Delete"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
