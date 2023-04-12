// import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from 'react-router-dom';
import { useReducer } from 'react';
import Header from './components/Header';
import Cart from './components/Cart';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Details from './components/Details';
import DetailItem from './components/DetailItem';
import { cartReducer, CartTypes, initialCartState } from './reducers/cartReducer';
import { items } from './items';

function App() {
  // const [items, setItems] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);
  const addToCart = (itemId) => dispatch({ type: CartTypes.ADD, itemId });

  // useEffect(() => {
  //   axios.get('/api/items')
  //     .then((result) => setItems(result.data))
  //     .catch(console.error);
  // }, []);
  return (
    <Router className="App">
      <Header title="My Cafe" cart={cart} />
      {items.length === 0
        ? <div>Loading...</div>
        : (
          <Routes>
            <Route path="/code-cafe" element={<Home items={items} />} />
            <Route path="/cart" element={<Cart cart={cart} items={items} dispatch={dispatch} />} />
            <Route path="/details" element={<Details items={items} />}>
              <Route path=":id" element={<DetailItem items={items} addToCart={addToCart} />} />
              <Route index element={<div>No Item Selected</div>} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
    </Router>
  );
}

export default App;
