import {Fragment, useEffect} from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useDispatch } from 'react-redux';
import { sendCartData } from './store/cart-slice';

import Notification from './components/UI/Notification';

let isInitial=true;
function App() {
const dispatch=useDispatch()
const showcart=useSelector(state=>state.ui.cartIsVisible)
const notification=useSelector(state=>state.ui.notification)
const cart =useSelector((state)=>state.cart)

useEffect(()=>{
  if(isInitial){
    isInitial=false;
    return
  }
  dispatch(sendCartData(cart))
  
  },[cart,dispatch])
  return (
    <Fragment>
      {notification && <Notification 
      status={notification.status} 
      title={notification.title} 
      message={notification.message}/>}
    <Layout>
      {showcart && <Cart />}
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;
