import { Fragment, useContext} from "react"
import { Outlet } from "react-router-dom"
import { useSelector} from "react-redux"
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import CartIcon from "../../components/cart-icon/cart-icon"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown"


import {NavigationContainer, LogoContainer, NavLinks, NavLink} from './navigation.styles'
import { selectIsCartOpen } from "../../store/cart/cart.selector"

//@ts-ignore
import {signOut} from 'aws-amplify/auth'
import { UserContext } from "../../contexts/user.context"

const Navigation = () => {
  const {loggedIn,setLoggedIn} = useContext(UserContext)
  const isCartOpen = useSelector(selectIsCartOpen)

  const signOutUser = async () => {
    try {
      await signOut();
      setLoggedIn(false)
    } catch (error) {
      console.log('error signing out: ', error);
    }
    
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
            loggedIn ? (
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

