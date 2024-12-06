import Header from "./components/Header";
import Producto from "./components/Producto";
import { useCart } from "./hooks/useCart";
function App() {
  const {
    productos,
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    addToCart,
    isEmpty,
    cartTotal,
    deleteProducto
  } = useCart();

    // Manejamos el estado de carga
    if (productos.length === 0) {
      return <p>Cargando productos...</p>;
    }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {productos.map((producto) => (
            <Producto
              key={producto.id}
              producto={producto}
              addToCart={addToCart}
              deleteProducto = {deleteProducto}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
