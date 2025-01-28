import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const [promoCode, setPromoCode] = useState(""); 
  const [discount, setDiscount] = useState(0); 
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const handlePromoCodeSubmit = async () => {
    if (!promoCode) {
        setError("Please enter a promo code.");
        return;
    }

    try {
        const response = await axios.post(`${url}/api/promocode/validate`, { code: promoCode });
        
        if (response.data.message === "Promo code is valid") {
            setDiscount(response.data.discount); 
            setError("");
        } else {
            setError("Invalid promo code.");
        }
    } catch (err) {
        setError("Failed to apply promo code. Please try again.");
        console.error("Error applying promo code:", err);
    }
};


  const totalAmount = getTotalCartAmount();
  const deliveryFee = totalAmount === 0 ? 0 : 20;
  const finalTotal = totalAmount + deliveryFee - (totalAmount * discount) / 100;

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list.map((item) => {
          console.log(cartItems,"111");
          
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id} className="cart-items-title cart-items-item">
                <img src={url + "/images/" + item.image} alt="" />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${item.price * cartItems[item._id]}</p>
                <p onClick={() => removeFromCart(item._id)} className="cross">
                  x
                </p>
                <hr />
              </div>
            );
          }
        })}
      </div>

      <div className="cart-bottom">
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
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input
                type="text"
                value={promoCode}
                onChange={handlePromoCodeChange}
                placeholder="Promo Code"
              />
              <button onClick={handlePromoCodeSubmit}>Submit</button>
            </div>
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;