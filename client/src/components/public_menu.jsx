import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        currentUser: state.session
    }
}

class PublicMenu extends React.Component {
    
    constructor(props) {

        super(props);

        this.state = {

        }
    }


    render() {

        return (
            <div>
            <div className="container">
    <div className="row">
        <div className="col-lg-10 mx-auto col-12 text-center mb-3">
            <h1 className="mt-0 text-primary">Our Menu</h1>
            <p className="lead">Begin with a selection from our award winning beverage menu or choose a wine from our extensive wine list. Our wine list features over 100 different vintages and has received the chamber of commerce award of excellence.</p>
        </div>
        <div className="col-12 mt-4">
            <h3 className="text-center">Cocktails</h3>
            <hr className="accent my-5"/>
        </div>
        <div className="card-columns">
            <div className="card card-body">
                <span className="float-right font-weight-bold">$10</span>
                <h6 className="text-truncate">Chocolate Martini</h6>
                <p className="small">Tito's Vodka and White Créme de Cacao dusted with hand shaved chocolate.</p>
            </div>
            <div className="card card-body">
                <span className="float-right font-weight-bold">$9</span>
                <h6 className="text-truncate">Summer Breeze Martini</h6>
                <p className="small">Hendrick’s Gin, St. Germain Elderflower Liqueur and Brancot Sauvignon Blanc with a floater of Cristalino Cava Brut.</p>
            </div>
            <div className="card card-body">
                <span className="float-right font-weight-bold">$9</span>
                <h6 className="text-truncate">Sweet Heat Margarita</h6>
                <p className="small">Jalapeño infused tequila, triple sec, pineapple juice, lime.</p>
            </div>
            <div className="card card-body">
                <span className="float-right font-weight-bold">$10</span>
                <h6 className="text-truncate">Prickly Pear</h6>
                <p className="small">New Amsterdam Vodka and Pear liquer in a sugar rimmed glass.</p>
            </div>
            <div className="card card-body">
                <span className="float-right font-weight-bold">$9</span>
                <h6>classNameic Martini</h6>
                <p className="small">Seagrams Gin, Dry Vermouth, pickle juice, olive juice.</p>
            </div>
            <div className="card card-body">
                <span className="float-right font-weight-bold">$10</span>
                <h6 className="text-truncate">Ruby Red Rosemary Refresher</h6>
                <p className="small">House infused rosemary vodka, St. Germaine Elderflower liqueur, grapefruit juice and a splash of soda.</p>
            </div>
        </div>
        <div className="col-12 mt-4">
            <h3 className="text-center">Starters</h3>
            <hr className="accent my-5"/>
        </div>
        <div className="card-columns">
            <div className="card card-body">
                <span className="float-right font-weight-bold">$9.95</span>
                <h6 className="text-truncate">Fried Shrimp</h6>
                <p className="small">Sustainably raised Argentine red shrimp, fried golden brown and served with chipotle mayonnaise for dipping.</p>
                <span className="font-weight-bold small">Add marinara or tartar: $2</span>
            </div>
            <div className="card card-body">
                <span className="float-right font-weight-bold">$8.95</span>
                <h6 className="text-truncate">Tuscan Bruschetta</h6>
                <p className="small">Crusty sliced Italian bread topped with basil, extra virgin olive oil, chopped tomatoes, garlic and fresh mozzarella cheese. Baked until it is nice and crispy and served with a side of balsamic reduction.</p>
            </div>
            <div className="card card-body">
                <span className="float-right font-weight-bold">$7.95</span>
                <h6 className="text-truncate">Quesadilla</h6>
                <p className="small">Jack and cheddar cheese, chopped mild green chilies in a pan grilled flour tortilla. Served with sour cream, guacamole and fresh pico de gallo.</p>
                <div className="font-weight-bold small">Add Chili: $2</div>
                <div className="font-weight-bold small">Add BBQ Pulled Pork: $2</div>
            </div>
            <div className="card card-body">
                <span className="float-right font-weight-bold">$9.95</span>
                <h6 className="text-truncate">Wings</h6>
                <p className="small">A dozen of our crispy, tasty chicken wings. Select 1 of our 4 seasonings.</p>
                <div className="font-weight-bold small">classNameic Sweet BBQ</div>
                <div className="font-weight-bold small">Hot Buffalo Sauce</div>
                <div className="font-weight-bold small">Sriracha Honey Fish Sauce</div>
                <div className="font-weight-bold small">Scorching Hot Habanero</div>
            </div>
            <div className="card card-body">
                <span className="float-right font-weight-bold">$8.95</span>
                <h6 className="text-truncate">Ultimate Nacho Platter</h6>
                <p className="small">
                    House made corn tortilla chips, melted cheddar-Jack cheese, mild Anaheim chile salsa, refried beans, guacamole &amp; sour cream</p>
            </div>
            <div className="card card-body">
                <span className="float-right font-weight-bold">$10</span>
                <h6 className="text-truncate">Stuffed Clams</h6>
                <p className="small">Three large stuffies with chopped clams, medium spiced chouriço Portuguese sausage, chopped bacon, onions, peppers, a touch of crushed red pepper, bread crumbs and spices, topped with bacon.</p>
            </div>
        </div>
        <div className="col-12 mt-4">
            <h3 className="text-center">Main Plates</h3>
            <hr className="accent my-5"/>
        </div>
        <div className="card-columns">
            <div className="card card-body">
                <span className="float-right font-weight-bold">$17.95</span>
                <h6 className="text-underline">Fat Tuesday Salad</h6>
                <p className="small">New Orleans style hot sliced Cajun chicken breast with mixed greens, tomatoes, cucumbers and hard-cooked eggs with warm, spicy honey mustard dressing topped with crumbled bacon..</p>
                <span className="font-weight-bold small"></span>
            </div>
            <div className="card card-body">
                <span className="float-right font-weight-bold">$25.95</span>
                <h6>Braised Boneless Beef Short Ribs</h6>
                <p className="small">
                    Braised low and slow, resulting in meat that is deeply flavored, sublimely succulent and tender as can be imagined, yet maintaining a wonderful texture. Served on a bed of garlic smashed potatoes. Served with choice of additional side. </p>
            </div>
            <div className="card card-body">
                <span className="float-right font-weight-bold">$15.95</span>
                <h6>Jambalaya</h6>
                <p className="small">
                    Shrimp, chicken, andouille sausage, rice and traditional jambalaya vegetables and spices. Garnished with sweet red and yellow pepper confetti.</p>
            </div>
            <div className="card card-body">
                <span className="float-right font-weight-bold">$12.95</span>
                <h6>Stuffed Jumbo Shrimp</h6>
                <p className="small">
                    Crabmeat, chopped scallops, mushrooms, Jack cheese, seasoned bread crumbs, white wine and butter stuffing.
                </p>
            </div>
            <div className="card card-body">
                <span className="float-right font-weight-bold">$25.95</span>
                <h6>Sirloin Steak Tips</h6>
                <p className="small">
                    Chunks of tender, flavorful marinated sirloin sautéed with garlic and black pepper, finished with button mushrooms and a beef demi-glace. (Degree of doneness will vary slightly due to variations in size of chunks). Accompanied by Gorgonzola spiked garlic
                    smashed potatoes. Served with choice of additional side.</p>
            </div>
            <div className="card card-body">
                <span className="float-right font-weight-bold">$14.95</span>
                <h6>Pasta Pomodoro</h6>
                <p className="small">
                    Fresh roasted garlic rigatoni with a light sauce of extra virgin California olive oil, fresh chopped tomatoes, basil, garlic, black pepper and a dash of crushed red pepper. Garnished with sun dried tomatoes and shaved parmesan.
                </p>
            </div>
        </div>
        <div className="col-12 mt-4">
            <hr className="accent my-5"/>
        </div>
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


export default connect(mapStateToProps, null)(PublicMenu);