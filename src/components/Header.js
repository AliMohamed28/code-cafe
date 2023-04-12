import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CoffeeLogo from '../images/logo.svg';
import './Header.css';
import CartIcon from '../images/cart.svg';

function Header({ title, cart }) {
  const cartQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="header-component">
      <Link to="/code-cafe">
        <img src={CoffeeLogo} alt="Coffee logo" />
        <h1>{title}</h1>
      </Link>
      <div className="menu">
        <Link to="/cart">
          <img src={CartIcon} alt="Cart" />
          <div className="badge">{cartQuantity}</div>
        </Link>
      </div>
    </header>
  );
}
Header.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    itemId: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  })).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
