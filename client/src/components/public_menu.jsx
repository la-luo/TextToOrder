import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchItems} from '../actions/item_actions';
import { fetchBasicMerchant } from '../actions/session_actions';

const mapStateToProps = (state) => {
    return {
        items: state.items,
        session: state.session
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchItems: merchantId => dispatch(fetchItems(merchantId)),
        fetchBasicMerchant: merchantId => dispatch(fetchBasicMerchant(merchantId))
    }
};

class PublicMenu extends React.Component {
    
    constructor(props) {

        super(props);

        this.state = {
        }

        this.itemsByCategory = this.itemsByCategory.bind(this);
    }

    componentDidMount(){
        const merchantId = this.props.match.params.merchantId;

        this.props.fetchItems(merchantId);
        this.props.fetchBasicMerchant(merchantId);

    }

    itemsByCategory(items){
        console.log(items);
        var itemsDict = {
            Specials: [],
            Appetizers:[],
            Breakfast:[],
            Lunch: [],
            Mains: [],
            Desserts: [],
            Drinks: []
        };
        items.forEach(element => {
            switch(element.category){
                case 'Appetizers':
                    itemsDict.Appetizers.push(element);
                    break;
                case 'Breakfast':
                    itemsDict.Breakfast.push(element);
                    break;
                case 'Desserts':
                    itemsDict.Desserts.push(element);
                    break;
                case 'Drinks':
                    itemsDict.Drinks.push(element);
                    break;
                case 'Lunch':
                    itemsDict.Lunch.push(element);
                    break;
                case 'Mains':
                    itemsDict.Mains.push(element);
                    break;
                default:
                    itemsDict.Specials.push(element);
            }   
        });
        return itemsDict;
    }


    render() {
        const items = this.props.items;

        if (typeof items == "undefined" || items == null || items.length == null
        || items.length === 0) return <div />;
        
        const itemsDict = this.itemsByCategory(items);

        console.log(itemsDict);

        return (
            <div>
            <div className="container">
    <div className="row">
        <div className="col-12 mx-auto text-center ">
            <h1 className="mt-0 text-primary">{this.props.session.storename} {} Menu</h1>
            <br/>
            <p className="lead">{this.props.session.intro}</p>
            <br/>
        </div>
        {
            itemsDict.Specials.length > 0 && 
            <div>
                <div className="col-12 mt-4">
                    <h3 className="text-center">Specials</h3>
                    <hr className="accent my-5"/>
                </div>
                <div className="card-columns">
                    <div className="card card-body">
                        <span className="float-right font-weight-bold">$17.95</span>
                        <h6 className="text-underline">Fat Tuesday Salad</h6>
                        <p className="small">New Orleans style hot sliced Cajun chicken breast with mixed greens, tomatoes, cucumbers and hard-cooked eggs with warm, spicy honey mustard dressing topped with crumbled bacon..</p>
                        <span className="font-weight-bold small"></span>
                    </div>
                </div>
            </div>
        }
        {
            itemsDict.Appetizers.length > 0 && 
            <div>
                <div className="col-12 mt-4">
                    <h3 className="text-center">Appetizers</h3>
                    <hr className="accent my-5"/>
                </div>
                <div className="card-columns">
                    <div className="card card-body">
                        <span className="float-right font-weight-bold">$17.95</span>
                        <h6 className="text-underline">Fat Tuesday Salad</h6>
                        <p className="small">New Orleans style hot sliced Cajun chicken breast with mixed greens, tomatoes, cucumbers and hard-cooked eggs with warm, spicy honey mustard dressing topped with crumbled bacon..</p>
                        <span className="font-weight-bold small"></span>
                    </div>
                </div>
            </div>
        }
        {
            itemsDict.Breakfast.length > 0 && 
            <div>
                <div className="col-12 mt-4">
                    <h3 className="text-center">Breakfast</h3>
                    <hr className="accent my-5"/>
                </div>
                <div className="card-columns">
                    <div className="card card-body">
                        <span className="float-right font-weight-bold">$17.95</span>
                        <h6 className="text-underline">Fat Tuesday Salad</h6>
                        <p className="small">New Orleans style hot sliced Cajun chicken breast with mixed greens, tomatoes, cucumbers and hard-cooked eggs with warm, spicy honey mustard dressing topped with crumbled bacon..</p>
                        <span className="font-weight-bold small"></span>
                    </div>
                </div>
            </div>
        }
        {
            itemsDict.Lunch.length > 0 && 
            <div>
                <div className="col-12 mt-4">
                    <h3 className="text-center">Lunch</h3>
                    <hr className="accent my-5"/>
                </div>
                <div className="card-columns">
                    <div className="card card-body">
                        <span className="float-right font-weight-bold">$17.95</span>
                        <h6 className="text-underline">Fat Tuesday Salad</h6>
                        <p className="small">New Orleans style hot sliced Cajun chicken breast with mixed greens, tomatoes, cucumbers and hard-cooked eggs with warm, spicy honey mustard dressing topped with crumbled bacon..</p>
                        <span className="font-weight-bold small"></span>
                    </div>
                </div>
            </div>
        }
        {
            itemsDict.Mains.length > 0 && 
                <div className="col-12 mt-4">
                    <h3 className="text-center">Mains</h3>
                    <hr className="accent my-5"/>
                </div>
        }
        {
            itemsDict.Mains.length > 0 && itemsDict.Mains.map((item,idx) => (
            <div className="card-columns">
                <div className="card card-body">
                    <span className="float-right font-weight-bold">{item.price}</span>
                    <h6 className="text-underline">{item.name}</h6>
                    <p className="small">{item.description}</p>
                    <span className="font-weight-bold small"></span>
                </div>
            </div>
            ))
        }
         {
            itemsDict.Desserts.length > 0 && 
            <div>
                <div className="col-12 mt-4">
                    <h3 className="text-center">Desserts</h3>
                    <hr className="accent my-5"/>
                </div>
                <div className="card-columns">
                    <div className="card card-body">
                        <span className="float-right font-weight-bold">$17.95</span>
                        <h6 className="text-underline">Fat Tuesday Salad</h6>
                        <p className="small">New Orleans style hot sliced Cajun chicken breast with mixed greens, tomatoes, cucumbers and hard-cooked eggs with warm, spicy honey mustard dressing topped with crumbled bacon..</p>
                        <span className="font-weight-bold small"></span>
                    </div>
                </div>
            </div>
        }
         {
            itemsDict.Drinks.length > 0 && 
                <div className="col-12 mt-4">
                    <h3 className="text-center">Drinks</h3>
                    <hr className="accent my-5"/>
                </div>   
        }
        {
            itemsDict.Drinks.length > 0 && itemsDict.Drinks.map((item, idx) => (
            <div className="card-columns">
                <div className="card card-body">
                    <span className="float-right font-weight-bold">{item.price}</span>
                    <h6 className="text-underline">{item.name}</h6>
                    <p className="small">{item.description}</p>
                    <span className="font-weight-bold small"></span>
                </div>
            </div>
            ))
        }
        <div className="col-6 mx-auto">
            <div className="card card-body text-center">
                <h5 className="text-uppercase">Tuesday Only!</h5>
                <h6>Albondigas Soup</h6>
                <p className="small">
                    A steaming cup or bowl of Mexican meatball &amp; vegetable soup garnished with crispy tortilla strips and fresh cheddar-Jack cheese. If you like Mexican food try this!</p>
                <span className="float-right font-weight-bold">$7</span>
            </div>
        </div>
        <div className="col-12 mt-4">
            <hr className="accent my-5"/>
        </div>
    </div>
</div>

            </div>
        )
    }


}


export default connect(mapStateToProps, mapDispatchToProps)(PublicMenu);