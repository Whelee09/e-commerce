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
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await fetch("http://10.14.32.214:8080/productos/listar");
      if (!response.ok) {
        throw new Error("Error fetching productos");
      }
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error("Error fetching productos:", error);
    }
  };
  // Sincronizamos el carrito con el localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const deleteProducto = async (id) => {
    console.log("el id es " + id);

    try {
      const response = await fetch(`http://10.14.32.214:8080/productos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("No se pudo eliminar el producto");
      }

      // Eliminar el producto también del estado local

      setProductos((prevProductos) =>
        prevProductos.filter((producto) => producto.idProducto !== id)
      );
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

  const handleCreateProduct = async (newProduct) => {
    try {
      const response = await fetch('http://10.14.32.214:8080/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct)
      });
  
      if (!response.ok) {
        throw new Error('Error al crear el producto');
      }
  
      const createdProduct = await response.json();
      
      // Update local state with the new product
      setProductos([...productos, createdProduct]);
      
      // Optional: Show success message
      alert('Producto creado exitosamente');
    } catch (error) {
      console.error('Error:', error);
      alert('No se pudo crear el producto');
    }
  };

  const filterByCategory = async (categoryId) => {
    if (categoryId === null) {
      fetchProductos();
      return;
    }

    try {
      const response = await fetch(
        `http://10.14.32.214:8080/productos/listarPorCategoria/${categoryId}`
      );
      if (!response.ok) {
        throw new Error("Error al filtrar productos por categoría");
      }
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error("Error filtrando productos por categoría:", error);
    }
  };

  const addToCart = (item) => {
    const itemExist = cart.findIndex(
      (guitar) => guitar.idProducto === item.idProducto
    );
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
    deleteProducto,
    filterByCategory,
    handleCreateProduct,
  };
};

export { useCart };
