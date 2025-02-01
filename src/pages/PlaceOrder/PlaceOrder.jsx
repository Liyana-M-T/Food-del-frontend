import React, { useContext, useState ,useEffect } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import {useNavigate , useLocation} from 'react-router-dom'

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const [paymentMode, setPaymentMode] = useState('online');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  const location = useLocation();
  const { discount,totalAmount,deliveryFee,finalTotal } = location.state || {};
  

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handlePaymentModeChange = (event) => {
    setPaymentMode(event.target.value);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    Object.entries(data).forEach(([key, value]) => {
      if (!value.trim()) {
        isValid = false;
        newErrors[key] = '*required';
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] }; 
        orderItems.push(itemInfo);
      }
    });
    
   
   let orderData = {
      items:orderItems, address:data, paymentMode, amount:finalTotal
    }
    
    try {
      const response = await axios.post(`${url}/api/order/placeOrder`, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        const { orderId, currency, receipt } = response.data;     

        if (paymentMode === 'online') {
          
          const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY, 
            currency: currency,
            order_id: orderId,
            receipt:  receipt,
            handler: function (response) {
              const paymentResponse = {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                orderId
              };
              verifyPayment(paymentResponse);
            },
            prefill: {
              name: `${data.firstname} ${data.lastname}`,
              email: data.email,
              contact: data.phone,
            },
            theme: {
              color: '#F37254',
            },
          };
          const razorpay = new window.Razorpay(options);
          razorpay.open();
        } else {
          navigate('/myorders');
        }
      }
    } catch (error) {
      console.log(error);
      alert('Error placing the order');
    }
  };

  const verifyPayment = async (paymentResponse) => {
    try {
      const response = await axios.post(`${url}/api/order/verify`, paymentResponse, {
        headers: { token },
      });

      if (response.data.success) {
        alert('Payment successful!');
        navigate('/myorders'); 
      } else {
        alert('Payment failed');
      }
    } catch (error) {
      console.log(error);
      alert('Error verifying the payment');
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, getTotalCartAmount, navigate]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <div>
            <input
              name="firstname"
              onChange={onChangeHandler}
              value={data.firstname}
              type="text"
              placeholder="First name"
            />
            {errors.firstname && <p className="error">{errors.firstname}</p>}
          </div>
          <div>
            <input
              name="lastname"
              onChange={onChangeHandler}
              value={data.lastname}
              type="text"
              placeholder="Last name"
            />
            {errors.lastname && <p className="error">{errors.lastname}</p>}
          </div>
        </div>
        <div>
          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Email address"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <input
            name="street"
            onChange={onChangeHandler}
            value={data.street}
            type="text"
            placeholder="Street"
          />
          {errors.street && <p className="error">{errors.street}</p>}
        </div>
        <div className="multi-fields">
          <div>
            <input
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              type="text"
              placeholder="City"
            />
            {errors.city && <p className="error">{errors.city}</p>}
          </div>
          <div>
            <input
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              type="text"
              placeholder="State"
            />
            {errors.state && <p className="error">{errors.state}</p>}
          </div>
        </div>
        <div className="multi-fields">
          <div>
            <input
              name="zipcode"
              onChange={onChangeHandler}
              value={data.zipcode}
              type="text"
              placeholder="Zip code"
            />
            {errors.zipcode && <p className="error">{errors.zipcode}</p>}
          </div>
          <div>
            <input
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              type="text"
              placeholder="Country"
            />
            {errors.country && <p className="error">{errors.country}</p>}
          </div>
        </div>
        <div>
          <input
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
            type="text"
            placeholder="Phone"
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        <div className="radio-group">
          <div className="radio-option">
            <input
              type="radio"
              id="online"
              name="paymentMode"
              value="online"
              checked={paymentMode === 'online'}
              onChange={handlePaymentModeChange}
            />
            <label htmlFor="online">Online Payment</label>
          </div>
          <div className="radio-option">
            <input
              type="radio"
              id="cod"
              name="paymentMode"
              value="cod"
              checked={paymentMode === 'cod'}
              onChange={handlePaymentModeChange}
            />
            <label htmlFor="cod">Cash on Delivery</label>
          </div>
        </div>
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Rs.{totalAmount}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>Rs.{deliveryFee}</p>
            </div>
            <hr />
            {discount > 0 && (
              <>
              <div className="cart-total-details">
                <p>Discount </p>
                <p>{discount}%</p>
              </div>
              <hr />
              </>
            )}
            <div className="cart-total-details">
              <b>Total</b>
              <b>Rs.{finalTotal}</b>
            </div>
          </div>
          <button className='payment-btn' type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
   </form>
  );
};

export default PlaceOrder;
