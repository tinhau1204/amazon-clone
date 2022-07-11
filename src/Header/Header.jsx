import React from 'react'
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import {Link, useLocation} from "react-router-dom";
import {useStateValue} from '../StateProvider.jsx';
import {auth} from '../firebase';
function Header() {
  const [{basket,user},dispatch] = useStateValue();
  const location = useLocation();
  const handleAuthentication = () =>{
    if(user){
      auth.signOut();
      alert('See you later');
    }
  }
  if (location.pathname === '/login') return null;
  return (
    <div className='header'>
      <Link to='/'>
      <img src='https://pngimg.com/uploads/amazon/amazon_PNG11.png' alt="amazon logo" className='header__logo'/>
      </Link>

      <div className="header__search">
        <input className='header__searchInput' type="text" />
        <SearchIcon className='header__searchInput-icon'/>
      </div>

      <div className="header__nav">
          <Link to= {!user && '/login'}>
        <div 
        onClick={handleAuthentication}
        className="header__option">
          <span className='header__optionLineOne'>
            Hello,{user ? `${user.email}` : 'Guest' }
          </span>
          <span className='header__optionLineTwo'>
            {user ? 'Sign out' : 'Sign in' }
          </span>
        </div> 
          </Link>
        
        <div className="header__option">
          <span className='header__optionLineOne'>
            Returns
          </span>
          <span className='header__optionLineTwo'>
            &amp; Orders
          </span>
        </div>
        
        <div className="header__option">
           <span className='header__optionLineOne'>
            Your
          </span>
          <span className='header__optionLineTwo'>
            Prime
          </span>       
        </div>
        <Link to='/checkout'>
          <div className="header__optionBasket" >
              <ShoppingBasketIcon />
              <span className='header__optionLineTwo header__basketCount'>{basket?.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header