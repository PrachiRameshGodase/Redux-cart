import {Fragment, useEffect} from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useDispatch } from 'react-redux';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';

let isInitial=true;
function App() {
const dispatch=useDispatch()
const showcart=useSelector(state=>state.ui.cartIsVisible)
const notification=useSelector(state=>state.ui.notification)
const cart =useSelector((state)=>state.cart)

useEffect(()=>{
  const sendCartData=async()=>{
    dispatch(uiActions.showNotification({
      status:"pending",
      title:"Sending...",
      message:"Sending cart data...",
    }))
  const response=await fetch("https://redux-cart-68955-default-rtdb.firebaseio.com/cart.json",{
    method:"PUT",
    body:JSON.stringify(cart)
  })
  if(!response.ok){
    throw new Error("Sending cart data failed")
    
  }

  dispatch(uiActions.showNotification({
    status:"pending",
    title:"Success!",
    message:"Sending cart data successfully!",
  }))
  }

  if(isInitial){
    isInitial=false;
    return
  }
  sendCartData().catch((error)=>{
    dispatch(
      uiActions.showNotification({
      status:"error",
      title:"Error!",
      message:"Sending cart data failed!",
    }))
  })
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
