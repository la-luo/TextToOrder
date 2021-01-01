import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import '../stylesheet/checkout.scss';

// styles for VGS Collect fields
const styles = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI"',
}

const CollectForm = ({orderId}) => {
  const [form, setForm] = useState({});
  const [isLoaded, scriptLoaded] = useState(false);

  // script loading
  useEffect(() => {
    const script = document.createElement("script");
    script.src = 'https://js.verygoodvault.com/vgs-collect/2.2.1/vgs-collect.js';
    script.async = true;
    script.onload = () => scriptLoaded(true);
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
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <div className="checkout container-fluid px-1 px-md-2 px-lg-4 py-5 mx-auto">
        <div className="row d-flex justify-content-center">
                <div className="card border-0">
                    <div className="row justify-content-center">
                        <h3 className="mb-4">Credit Card Checkout</h3>
                    </div>
                    <form onSubmit={handleSubmit} className="row justify-content-center">
                        <div className="mb-4"> 
                            <small className="text-sm text-muted">Payment amount</small>
                            <div className="pay-amount">
                                <h2 className=""><span className="text-md font-weight-bold mr-2">$</span><span className="text-danger">59.49</span></h2>
                            </div> 
                            <small className="text-sm text-muted">Order Code</small>
                            <h5 className="mb-5">{orderId}</h5> 
                        </div>
                        <div className="col-sm-10">
                            <div id="cc-holder" className="form-field"></div>
                            <div id="cc-number" className="form-field"></div>
                            <div className="form-field-group">
                                <div id="cc-expiration-date" className="form-field"></div>
                                <div id="cc-cvc" className="form-field"></div>
                            </div>
                        </div>
                        <div className="col-sm-10">
                            <button type="submit" className="btn-pay text-center mt-4">Confirm</button>
                        </div>
                    </form>
                </div>
        </div>
    </div>

  )
}

class Checkout extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount(){
        this.orderId = this.props.match.params.orderId;
        console.log('orderid from url:', this.orderId);

    }


    render(){
        return (
            <CollectForm orderId={this.orderId}/>
        )
    }

}

export default connect(null, null)(Checkout);