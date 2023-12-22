import React from 'react';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './checkout-item.styles'
import {CheckoutItemContainer, ImageContainer, BaseSpan, Quantity, Arrow, Value, RemoveButton} from './checkout-item.styles.jsx';

const Checkout = ({cartItem}) => {
  const {name, imageUrl, price, quantity} = cartItem
  const {addItemToCart, deleteItemFromCart, removeItemFromCart} = useContext(CartContext)

  const addItem = () => addItemToCart(cartItem)
  const deleteItem = () => deleteItemFromCart(cartItem)
  const removeItem = () => removeItemFromCart(cartItem)
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
