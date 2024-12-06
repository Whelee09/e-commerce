export default function Producto({ producto, addToCart, deleteProducto }) {
  const { nombre, descripcion, precio, imagen_url } = producto;

  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-4">
        <img className="img-fluid" src={imagen_url} alt="imagen guitarraa" />
      </div>
      <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">{nombre}</h3>
        <p>{descripcion}</p>
        <p className="fw-black text-primary fs-3">$ {precio}</p>
        <button
          type="button"
          className="btn btn-dark w-100"
          onClick={() => addToCart(producto)}
        >
          Agregar al Carrito
        </button>
        <button
          type="button"
          className="btn btn-danger w-100 mt-4"
          onClick={() => deleteProducto(producto.id)}
        >Eliminar Producto</button>
      </div>
    </div>
  );
}
