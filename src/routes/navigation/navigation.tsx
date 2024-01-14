import { Fragment} from "react"
import { Outlet } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import CartIcon from "../../components/cart-icon/cart-icon"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown"


import {NavigationContainer, LogoContainer, NavLinks, NavLink} from './navigation.styles'
import { selectCurrentUser } from "../../store/user/user.selector"
import { selectIsCartOpen } from "../../store/cart/cart.selector"
import { signOutStart } from "../../store/user/user.action"


const Navigation = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen = useSelector(selectIsCartOpen)
  const signOutUser = () => {
    dispatch(signOutStart())
  }

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
                {/* @ts-ignore */}
                <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                
              </div>
              
            ) : (
              <NavLink to='/auth'>SIGN IN</NavLink>
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

