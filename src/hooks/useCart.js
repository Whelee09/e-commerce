import { useEffect, useState, useMemo } from "react";

const useCart = () => {
  const [productos, setProductos] = useState([]); // Cargamos productos de la API
  const [cart, setCart] = useState(() => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  });

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  // Fetch de productos al montar el componente
  useEffect(() => {
    fetch("http://localhost:3001/productos")
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error fetching productos:", error));
  }, []);

  const deleteProducto = (id)=>{
    console.log("eliminando producto: " + id)
  }
  // Sincronizamos el carrito con el localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExist >= 0) {
      if (cart[itemExist].quantity >= MAX_ITEMS) return;

      const updateCart = [...cart];
      updateCart[itemExist].quantity++;
      setCart(updateCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  };

  const increaseQuantity = (id) => {
    const updateCart = cart.map((item) =>
      item.id === id && item.quantity < MAX_ITEMS
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updateCart);
  };

  const decreaseQuantity = (id) => {
    const updateCart = cart.map((item) =>
      item.id === id && item.quantity > MIN_ITEMS
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updateCart);
  };

  const clearCart = () => setCart([]);

  // Estados derivados
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.precio, 0),
    [cart]
  );

  return {
    productos,
    cart,
    setCart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty,
    cartTotal,
    deleteProducto
  };
};

export { useCart };
