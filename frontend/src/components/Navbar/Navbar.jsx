import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets.js'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext.jsx'

function Navebar({ setShowLogin }) {

  const [menu, setMenu] = useState("home")
  const [search, setSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");

  const { getTotalCartAmount, token, setToken, admin_url } = useContext(StoreContext)
  const navigate = useNavigate()
  const { totalAmount } = getTotalCartAmount()

  const logout = () => {
    localStorage.removeItem('token')
    setToken("")
    navigate('/')
  }
  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    // navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
    setSearch(false);
  };

  return (
    <div className='navbar'>
      <Link to={'/'}> <img src={assets.logo} alt="logo" className='logo' /></Link>


      {
        search ?
          <div className="search-bar">
            <input  type="text"   placeholder="Search"    value={searchQuery}     onChange={(e) => setSearchQuery(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleSearch()}   />
            <button onClick={handleSearch}>Search</button>
          </div>
          : <ul className={search === true ? "navbar-menu navbar-menu-search" :" navbar-menu"}>
            <Link to={'/'} className={menu === "home" ? "active" : ""} onClick={() => setMenu("home")} > Home</Link>
            <a href='#explore-menu' className={menu === "menu" ? "active" : ""} onClick={() => setMenu("menu")} >  Menu </a>
            <a href='#app-download' className={menu === "mobile-app" ? "active" : ""} onClick={() => setMenu("mobile-app")} > Mobile-App </a>
            <a href='#footer' className={menu === "contact-us" ? "active" : ""} onClick={() => setMenu("contact-us")} > Contact-Us </a>
          </ul>
      }

      <div className={search === true ? "navbar-right navbar-right-search" :" navbar-right"}>
        <img onClick={() => { setSearch(!search) }} src={assets.search_icon} alt="search-icon" />
        <div className="navbar-search-icon">
          <Link to={'/cart'}> <img src={assets.basket_icon} alt="" /></Link>
          <div className={totalAmount ? "dot" : ""}></div>
        </div>
        {
          !token
            ? <button onClick={() => setShowLogin(true)}>Sign in</button>
            : <div className='navbar-profile'>
              <img src={assets.profile_icon} alt="" />
              <ul className='nav-profile-dropdown'>
                <li onClick={() => navigate('/myorders')} ><img src={assets.bag_icon} alt="orders" />   <p>Orders</p></li>
                <hr />
                <li>  <a href={`${admin_url}`} target="_blank" rel="noopener noreferrer">
                  <img src={assets.admin_icon} alt="admin icon" />    admin    </a>
                </li>
                <hr />
                <li onClick={logout} > <img src={assets.logout_icon} alt="logout" />Logout</li>
              </ul>

            </div>
        }
      </div>

    </div>
  )
}

export default Navebar