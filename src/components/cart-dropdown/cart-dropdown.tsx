import { useNavigate } from 'react-router-dom'
import Button from '../button/button'
// import { CartContext } from '../../contexts/cart.context'
import CartItem from '../cart-item/cart-item'
import {CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles'
import { useSelector } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector'

const CartDropdown = () => {
    // const {cartItems} = useContext(CartContext)
    const cartItems = useSelector(selectCartItems)
    const navigate = useNavigate()

    const goToCheckoutHandler = () => {
        navigate('/checkout')
    }
    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? cartItems.map((item) => (
                        <CartItem key={item.id} cartItem={item}/>
                    )) : (
                        <EmptyMessage>Your cart is empty</EmptyMessage>
                    )
                }
              
            </CartItems>
            <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>

            

        </CartDropdownContainer>
    )
}

export default CartDropdown