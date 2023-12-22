import { Fragment, useContext } from "react"
import { Outlet, Link } from "react-router-dom"
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import CartIcon from "../../components/cart-icon/cart-icon"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown"
import { UserContext } from "../../contexts/user.context"
import { CartContext } from "../../contexts/cart.context"
import { signOutUser } from "../../utils/firebase/firebase.utils"

import './navigation.styles.scss'


const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext)

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to='/'>
          <CrwnLogo className="logo"></CrwnLogo>
        </Link>
        
        <div className="nav-links-container">
          <Link className="nav-link" to='/shop'>SHOP</Link>
          {
            currentUser ? (
              <div>
                <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
                
              </div>
              
            ) : (
              <Link className="nav-link" to='/auth'>SIGN IN</Link>
            )
            
          }
          <CartIcon/>
        </div>
        { isCartOpen && <CartDropdown/>}
      </div>
      <Outlet></Outlet>
    </Fragment>
  )
}

export default Navigation

