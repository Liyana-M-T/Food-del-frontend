import React ,{useState} from 'react'
import NavBar from './Components/NavBar/NavBar'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import {Route, Routes} from 'react-router-dom'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Menu from './pages/Menu/Menu'
import MyOrders from './pages/MyOrders/MyOrders'
import Verify from './pages/Verify/Verify'


const App = () => {
  const [category, setCategory] = useState('All');
  const[showLogin,setShowLogin]=useState(false)

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin} />:<></>}
    <div className='app'>
      <NavBar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home category={category} setCategory={setCategory}/>}/>
        <Route path='/menu' element={<Menu category={category} setCategory={setCategory}/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App
