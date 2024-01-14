import './checkout-item.styles'
import {CheckoutItemContainer, ImageContainer, BaseSpan, Quantity, Arrow, Value, RemoveButton} from './checkout-item.styles';

import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, removeItemFromCart, deleteItemFromCart } from '../../store/cart/cart.action';

const Checkout = ({cartItem}) => {
  const {name, imageUrl, price, quantity} = cartItem
  // const {addItemToCart, deleteItemFromCart, removeItemFromCart} = useContext(CartContext)
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)

  const addItem = () => dispatch(addItemToCart(cartItems, cartItem))
  const deleteItem = () => dispatch(deleteItemFromCart(cartItems, cartItem))
  const removeItem = () => dispatch(removeItemFromCart(cartItems, cartItem))
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan> {name} </BaseSpan>
      <Quantity>
        <Arrow onClick={deleteItem}>
          &#10094;
        </Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItem}>
          &#10095;
        </Arrow>
      </Quantity>
      <BaseSpan> {price}</BaseSpan>
      <RemoveButton onClick={removeItem}>
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  )
}

export default Checkout;
