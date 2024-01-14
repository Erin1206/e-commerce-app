import { CategoryItem } from "../categories/category.types";
import {CART_ACTION_TYPES, CartItem} from "./cart.types";
import { ActionWithPayload, createAction, withMatcher } from "../../utils/reducer/reducer.utils";

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
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

const deleteCartItem = (cartItems: CartItem[], productToRemove: CartItem): CartItem[] => {
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

const removeCartItem = (cartItems: CartItem[], productToRemove: CartItem): CartItem[] => 
    // find if cartItems contains productToAdd
   cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)
    
export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>

export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen => 
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean))

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems))

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    return setCartItems(newCartItems)
}
export const deleteItemFromCart = (cartItems: CartItem[], productToRemove:CartItem) => {
    const newCartItems = deleteCartItem(cartItems, productToRemove)
    return setCartItems(newCartItems)
}

export const removeItemFromCart = (cartItems: CartItem[], productToRemove:CartItem) => {
    const newCartItems = removeCartItem(cartItems, productToRemove)
    return setCartItems(newCartItems)
}