import { useContext } from 'react'
// import { CartContext } from '../../contexts/cart.context'
import CheckoutItem from '../../components/checkout-item/checkout-item'
import {CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles'
import { useSelector } from 'react-redux'
import { selectCartItems, selectTotalPrice } from '../../store/cart/cart.selector'
import PaymentForm from '../../components/payment-form/payment-form'

const Checkout = () => {
    // const {cartItems, totalPrice} = useContext(CartContext)
    const cartItems = useSelector(selectCartItems)
    const totalPrice = useSelector(selectTotalPrice)
    return (
      <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <Total>TOTAL: ${totalPrice}</Total>
      <PaymentForm/>
    </CheckoutContainer>
    )
}

export default Checkout