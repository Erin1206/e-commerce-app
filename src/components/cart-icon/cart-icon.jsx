import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './cart-icon.styles.scss';

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen } = useContext(CartContext)
    const toggleDropdown = () => {
        setIsCartOpen(!isCartOpen)
      }
    return (
        <div className='cart-icon-container' onClick={toggleDropdown}>
            <ShoppingIcon classname='shopping-icon'/>
            <span className='item-count'>0</span>
        </div>
    );
};

export default CartIcon;

