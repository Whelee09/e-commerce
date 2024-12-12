import Header from "./components/Header";
import Producto from "./components/Producto";
import BotonesCategorias from "./components/BotonesCategorias";
import ProductForm from "./components/ProductForm";
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
    deleteProducto,
    filterByCategory,
    handleCreateProduct,
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

        <BotonesCategorias filterByCategory={filterByCategory} />

        <div className="row mt-5">
          {productos.map((producto) => (
            <Producto
              key={producto.idProducto}
              producto={producto}
              addToCart={addToCart}
              deleteProducto={deleteProducto}
            />
          ))}
        </div>

        <ProductForm
          categories={[
            { id: 1, nombre: "Guitarras" },
            { id: 2, nombre: "Baterias" },
            { id: 3, nombre: "Ukeleles" },
            // Add more categories as needed
          ]}
          onSubmit={handleCreateProduct}
        />
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
