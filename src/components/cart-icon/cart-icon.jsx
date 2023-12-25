import { useContext } from 'react';
// import { CartContext } from '../../contexts/cart.context';
import {ShoppingIcon, CartIconContainer, ItemCount} from'./cart-icon.styles.jsx';

import { useDispatch,useSelector } from 'react-redux';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector.js';
import { setIsCartOpen } from '../../store/cart/cart.action.js';

const CartIcon = () => {
    // const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext)
    const dispatch = useDispatch()
    const isCartOpen = useSelector(selectIsCartOpen)
    const cartCount = useSelector(selectCartCount)

    const toggleDropdown = () => {
        dispatch(setIsCartOpen(!isCartOpen))
      }
    return (
        <CartIconContainer onClick={toggleDropdown}>
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;

