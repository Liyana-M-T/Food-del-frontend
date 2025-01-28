import React, { useContext, useState } from 'react'
import './NavBar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
const NavBar = ({setShowLogin}) => {

  const [menu,setMenu] = useState("home")
  const {getTotalCartAmount,token,setToken} = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('token');
      setToken('');
      navigate('/');
    }
  };


  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className='logo'/></Link>
      <ul className='navbar-menu'>
    <Link to={"/"}><li onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</li></Link>
    <Link to={"/menu"}><li onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</li></Link>
    <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile app</a>
    <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact us</a>
  </ul>

<div className="navbar-right">
    <img src={assets.search_icon} alt="" />
    <div className="navbar-search-icon">
    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
    <div className={getTotalCartAmount()===0?"":"dot"}></div>
    </div>
    {!token? <button className='signIn-btn' onClick={()=>setShowLogin(true)}>sign In</button> 
    : <div className="navbar-profile">
      <img src={assets.profile_icon} alt="" />
      <ul className="nav-profile-dropdown">
        <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
        <hr />
        <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
      </ul>
    </div>  }
    
</div>
    </div>
  )
}

export default NavBar
