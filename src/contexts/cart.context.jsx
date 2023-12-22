import { createContext, useEffect, useState } from "react";

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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: (() => {}),
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    totalPrice: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount)
        const newTotalPrice = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        setTotalPrice(newTotalPrice)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }
    const deleteItemFromCart = (productToAdd) => {
        setCartItems(deleteCartItem(cartItems, productToAdd))
    }

    const removeItemFromCart = (productToAdd) => {
        setCartItems(removeCartItem(cartItems, productToAdd))
    }
    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, deleteItemFromCart, removeItemFromCart, totalPrice }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider> // anything in the children has access to currentUser and setCurrentUser
}

