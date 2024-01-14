import {ProductCartContainer, Footer, Name, Price} from './product-card.styles'
import Button from '../button/button'
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { BUTTON_TYPE_CLASSES } from '../button/button';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { CategoryItem } from '../../store/categories/category.types';
import { FC } from 'react';

type ProductCardProps = {
    product: CategoryItem
}

const ProductCard: FC<ProductCardProps> = ({product}) => {
    const { name, price, imageUrl } = product;
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)
    // const {addItemToCart} = useContext(CartContext)

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product))
    return (
        <ProductCartContainer>
            <img src={imageUrl} alt={`${name}`} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>
        </ProductCartContainer>
    )
    
}

export default ProductCard