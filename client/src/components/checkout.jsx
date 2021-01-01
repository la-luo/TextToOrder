import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchOrder } from '../actions/order_actions';
import '../stylesheet/checkout.scss';

// styles for VGS Collect fields
const styles = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI"',
}

const CollectForm = ({order, history}) => {
  const [form, setForm] = useState({});
  const [isLoaded, scriptLoaded] = useState(false);
  const orderCode = String(order._id);

  function useIsMounted() {
    const isMounted = React.useRef(true);
  
    React.useEffect(() => {
      return () => {
        isMounted.current = false;
      };
    }, []);
  
    return isMounted;
  }

  const isMounted = useIsMounted();

  // script loading
  useEffect(() => {
    const script = document.createElement("script");
    script.src = 'https://js.verygoodvault.com/vgs-collect/2.2.1/vgs-collect.js';
    script.async = true;
    script.onload = () => {
      if (isMounted.current) {
        scriptLoaded(true);
      }
    }
    document.body.appendChild(script);
  });

  // VGS Collect initialization
  useEffect(() => {
    if (isLoaded) {
      const vgsForm = window.VGSCollect.create('tntm9hmug6z', 'SANDBOX', (state) => {
        console.log(state);
      });
      setForm(vgsForm);

      vgsForm.field('#cc-holder', {
        type: 'text',
        name: 'card_holder',
        placeholder: 'Card holder',
        validations: ['required'],
        css: styles,
      });

      vgsForm.field('#cc-number', {
        type: 'card-number',
        name: 'card_number',
        successColor: '#4F8A10',
        errorColor: '#D8000C',
        placeholder: 'Card number',
        showCardIcon: true,
        validations: ['required', 'validCardNumber'],
        css: styles,
      });

      vgsForm.field('#cc-cvc', {
        type: 'card-security-code',
        name: 'card_cvc',
        successColor: '#4F8A10',
        errorColor: '#D8000C',
        placeholder: 'CVC',
        maxLength: 3,
        validations: ['required', 'validCardSecurityCode'],
        css: styles,
      });

      vgsForm.field('#cc-expiration-date', {
        type: 'card-expiration-date',
        name: 'card_exp',
        successColor: '#4F8A10',
        errorColor: '#D8000C',
        placeholder: 'MM / YY',
        validations: ['required', 'validCardExpirationDate'],
        css: styles,
      });
    }
  }, [isLoaded]);

  // VGS Collect form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    form.submit(
      '/post',
      {},
      (status, response) => {
        console.log(status, response);
        history.push('/success');
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <div className="checkout container-fluid">
        <div className="row d-flex">
                <div className="card border-0">
                    <div className="row">
                        <h3 className="row-title">Credit Card Checkout</h3>
                    </div>
                    <form onSubmit={handleSubmit} className="checkout-form">
                        <div className="row"> 
                            <h5>Payment Amount</h5>
                            <div className="pay-amount">
                                <h2 className=""><span className="text-md font-weight-bold mr-2">$</span><span className="text-danger">{order.total}</span></h2>
                            </div>
                            <h5>Items</h5>
                            <small className="text-sm text-muted">{order.items}</small>
                            <h5>Order ID</h5> 
                            <small className="text-sm text-muted">{orderCode}</small>
                        </div>
                        <div className="row">
                            <div id="cc-holder" className="form-field"></div>
                            <div id="cc-number" className="form-field"></div>
                            <div className="form-field-group">
                                <div id="cc-expiration-date" className="form-field"></div>
                                <div id="cc-cvc" className="form-field"></div>
                            </div>
                        </div>
                        <div className="row">
                            <button type="submit" className="btn-pay text-center mt-4">Confirm</button>
                        </div>
                    </form>
                </div>
        </div>
    </div>

  )
}

const mapStateToProps = (state) => {
    return {
        order: state.order,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchOrder: orderId => dispatch(fetchOrder(orderId))
    }
};

class Checkout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount(){
        const orderId = this.props.match.params.orderId;
        console.log('orderid from url:', orderId);
        this.props.fetchOrder(orderId);

    }


    render(){
        if (typeof this.props.order == "undefined" || this.props.order == null) {
          return <div />;
        } else {
          return (
            <CollectForm order={this.props.order} history={this.props.history}/>
          )
        }  
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);