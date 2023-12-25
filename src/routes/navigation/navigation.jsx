import { Fragment, useContext } from "react"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import CartIcon from "../../components/cart-icon/cart-icon"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown"
// import { UserContext } from "../../contexts/user.context"
// import { CartContext } from "../../contexts/cart.context"
import { signOutUser } from "../../utils/firebase/firebase.utils"


import {NavigationContainer, LogoContainer, NavLinks, NavLink} from './navigation.styles'
import { selectCurrentUser } from "../../store/user/user.selector"
import { selectIsCartOpen } from "../../store/cart/cart.selector"


const Navigation = () => {
  // const { currentUser } = useContext(UserContext);
  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen = useSelector(selectIsCartOpen)

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className="logo"></CrwnLogo>
        </LogoContainer>
        
        <NavLinks>
          <NavLink to='/shop'>SHOP</NavLink>
          {
            currentUser ? (
              <div>
                <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                
              </div>
              
            ) : (
              <NavLink className="nav-link" to='/auth'>SIGN IN</NavLink>
            )
            
          }
          <CartIcon/>
        </NavLinks>
        { isCartOpen && <CartDropdown/>}
      </NavigationContainer>
      <Outlet></Outlet>
    </Fragment>
  )
}

export default Navigation

