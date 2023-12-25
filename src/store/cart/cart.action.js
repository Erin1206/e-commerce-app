import CART_ACTION_TYPES from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    )

    // If found, increment quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
            {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        )
    }
    
    // return new array wth modified cartItems/ new cart item
    return [...cartItems, { ...productToAdd, quantity: 1 }]
    
}

const deleteCartItem = (cartItems, productToRemove) => {
    // Find if cartItems contains productToRemove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToRemove.id
    );

    // If the item exists and its quantity is 1, remove it from the cart
    if (existingCartItem && existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
    } else if (existingCartItem) {
        // If the item exists and its quantity is more than 1, decrement the quantity
        return cartItems.map((cartItem) =>
            cartItem.id === productToRemove.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
        );
    }

    // Return the original cart items if the product is not found
    return cartItems;
    
    
    // return new array wth modified cartItems/ new cart item
    //return [...cartItems, { ...productToAdd, quantity: 1 }]
    
}

const removeCartItem = (cartItems, productToRemove) => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToRemove.id
    )

    // If found, increment quantity
    if (existingCartItem) {
        return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)
    }
}

export const setIsCartOpen = (boolean) => 
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}
export const deleteItemFromCart = (cartItems, productToAdd) => {
    const newCartItems = deleteCartItem(cartItems, productToAdd)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const removeItemFromCart = (cartItems, productToAdd) => {
    const newCartItems = removeCartItem(cartItems, productToAdd)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}