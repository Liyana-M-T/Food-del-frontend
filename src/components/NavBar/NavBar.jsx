import React, { useContext, useState } from 'react'
import './NavBar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
const NavBar = ({setShowLogin}) => {

  const [menu,setMenu] = useState("home")
  
  const {getTotalCartAmount} = useContext(StoreContext);

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className='logo'/></Link>
      <ul className='navbar-menu'>
        <li onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</li>
        <li  onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</li>
        <li  onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile app</li>
        <li  onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact us</li>
      </ul>
<div className="navbar-right">
    <img src={assets.search_icon} alt="" />
    <div className="navbar-search-icon">
    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
    <div className={getTotalCartAmount()===0?"":"dot"}></div>
    </div>
    
    <button className='signIn-btn' onClick={()=>setShowLogin(true)}>sign In</button>
</div>
    </div>
  )
}

export default NavBar
