import PropTypes from 'prop-types';
import ItemType from '../types/item';
import { CartTypes } from '../reducers/cartReducer';

function CartRow({ cartItem, items, dispatch }) {
  const item = items.find((i) => i.itemId === cartItem.itemId);
  const removeItemFromCart = () => {
    dispatch({ type: CartTypes.REMOVE, itemId: item.itemId });
  };
  const addExtra = () => {
    dispatch({ type: CartTypes.ADD, itemId: item.itemId });
  };
  const removeExtra = () => {
    dispatch({ type: CartTypes.REMOVEEXTRA, itemId: item.itemId });
  };
  return (
    <tr>
      <td>{cartItem.quantity}</td>
      <td>{item.title}</td>
      <td>
        $
        {((item.salePrice ?? item.price) * cartItem.quantity).toFixed(2)}
      </td>
      <td>
        <button
          type="button"
          onClick={removeItemFromCart}
        >
          X
        </button>
      </td>
      <td>
        <button
          type="button"
          onClick={addExtra}
        >
          +
        </button>
      </td>
      <td>
        <button
          type="button"
          onClick={cartItem.quantity > 1 ? removeExtra : removeItemFromCart}
        >
          -
        </button>
      </td>

    </tr>
  );
}
CartRow.propTypes = {
  cartItem: PropTypes.shape({
    itemId: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(ItemType).isRequired,
};
export default CartRow;
