import PropTypes from 'prop-types';
import { useState } from 'react';
import ItemType from '../types/item';
import './Cart.css';
import CartRow from './CartRow';

function Cart({ cart, items, dispatch }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [couponCode, setcouponCode] = useState('');
  const isFormValid = zipCode.length === 5 && name.trim();

  const subTotal = cart.reduce((acc, item) => {
    const detailItem = items.find((i) => i.itemId === item.itemId);
    const itemPrice = detailItem.salePrice ?? detailItem.price;
    return item.quantity * itemPrice + acc;
  }, 0);

  const setformattedcouponCode = (newCouponCode) => {
    const formatted = newCouponCode.toUpperCase();
    setcouponCode(formatted);
  };

  const submitOrder = (event) => {
    event.preventDefault();
    console.log('name: ', name);
    console.log('phone: ', phone);
    console.log('zipcode: ', zipCode);
  };
  return (
    <div className="cart-component">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (

        <>
          <table>
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Item</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <CartRow key={item.itemId} cartItem={item} items={items} dispatch={dispatch} />
              ))}
            </tbody>
          </table>
          <div>
            Subtotal: $
            {subTotal.toFixed(2)}
          </div>
          <h1>Checkout</h1>
          <form onSubmit={submitOrder}>
            <label htmlFor="name">
              Name
              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </label>
            <label htmlFor="phone">
              Phone Number
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
              />
            </label>
            <label htmlFor="zipcode">
              ZIP Code
              <input
                id="zipcode"
                type="text"
                maxLength="5"
                value={zipCode}
                onChange={(event) => setZipCode(event.target.value)}
                required
              />
            </label>
            <label htmlFor="couponCode">
              Coupon Code
              <input
                id="couponCode"
                type="text"
                inputMode="numeric"
                value={couponCode}
                onChange={(event) => setformattedcouponCode(event.target.value)}
              />
            </label>
            <button type="submit" disabled={!isFormValid}>
              Order Now
            </button>
          </form>
        </>
      )}

    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    itemId: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  })).isRequired,
  items: PropTypes.arrayOf(ItemType).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Cart;
