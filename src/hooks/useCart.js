import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db_guitars.js";

function useCart() {
  const initialCartState = () => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  };
  const [data] = useState(db);
  const [cart, setCart] = useState(initialCartState);
  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(selectedItem) {
    const itemExists = cart.findIndex(
      (cartItem) => cartItem.id === selectedItem.id
    );
    if (itemExists >= 0) {
      // If the item is already in the cart, increase its quantity
      if (cart[itemExists].quantity >= MAX_ITEMS) return;
      const updateCart = [...cart];
      updateCart[itemExists].quantity += 1;
      setCart(updateCart);
    } else {
      // If the item is not in the cart, add it with a quantity of 1
      setCart((prevCart) => [...prevCart, { ...selectedItem, quantity: 1 }]);
    }
  }

  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map((guitar) => {
      if (guitar.id === id && guitar.quantity < MAX_ITEMS) {
        return { ...guitar, quantity: guitar.quantity + 1 };
      }
      return guitar;
    });
    setCart(updatedCart);
  }

  function decreaseQuantity(id) {
    const updateCart = cart.map((guitar) => {
      if (guitar.id === id && guitar.quantity > MIN_ITEMS) {
        return { ...guitar, quantity: guitar.quantity - 1 };
      } else {
        return guitar;
      }
    });
    setCart(updateCart);
  }

  function clearCart() {
    setCart([]);
    localStorage.removeItem("cart");
  }

  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const totalPrice = useMemo(
    () =>
      cart.reduce(
        (total, currentValue) =>
          total + currentValue.price * currentValue.quantity,
        0
      ),
    [cart]
  );

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty,
    totalPrice,
  };
}

export default useCart;
