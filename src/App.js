import { useEffect } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
const showcart=useSelector(state=>state.ui.cartIsVisible)

const cart =useSelector((state)=>state.cart)
useEffect(()=>{
  fetch("https://redux-cart-68955-default-rtdb.firebaseio.com/cart.json",{
    method:"PUT",
    body:JSON.stringify(cart)
  })
},[cart])
  return (
    <Layout>
      {showcart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
