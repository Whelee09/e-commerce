import { useState } from "react";

export default function ProductForm({ categories, onSubmit }) {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagen_url: '',
    categoria: {
      id: '',
      nombre: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested categoria object
    if (name === 'categoria_id') {
      const selectedCategory = categories.find(cat => cat.id === parseInt(value));
      setFormData(prevState => ({
        ...prevState,
        categoria: {
          id: selectedCategory.id,
          nombre: selectedCategory.nombre
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    const { nombre, descripcion, precio, imagen_url, categoria } = formData;
    
    if (!nombre || !descripcion || !precio || !imagen_url || !categoria.id) {
      alert('Por favor, complete todos los campos');
      return;
    }

    // Convert precio to a number
    const productoData = {
      ...formData,
      precio: parseFloat(precio)
    };

    // Call the onSubmit prop with the product data
    onSubmit(productoData);

    // Optional: Reset form after submission
    setFormData({
      nombre: '',
      descripcion: '',
      precio: '',
      imagen_url: '',
      categoria: {
        id: '',
        nombre: ''
      }
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Crear Nuevo Producto</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="nombre" className="form-label">Nombre del Producto</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre de la guitarra"
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="categoria_id" className="form-label">Categoría</label>
          <select
            className="form-select"
            id="categoria_id"
            name="categoria_id"
            value={formData.categoria.id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar Categoría</option>
            {categories.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea
            className="form-control"
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="descripcion"
            rows="3"
            required
          ></textarea>
        </div>

        <div className="col-md-6">
          <label htmlFor="precio" className="form-label">Precio</label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              type="number"
              className="form-control"
              id="precio"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              step="0.01"
              min="0"
              placeholder="Precio del producto"
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <label htmlFor="imagen_url" className="form-label">URL de Imagen</label>
          <input
            type="url"
            className="form-control"
            id="imagen_url"
            name="imagen_url"
            value={formData.imagen_url}
            onChange={handleChange}
            placeholder="URL de la imagen del producto"
            required
          />
        </div>

        <div className="col-12">
          {formData.imagen_url && (
            <div className="mt-3 text-center">
              <img 
                src={formData.imagen_url} 
                alt="Vista previa" 
                className="img-fluid rounded"
                style={{ maxHeight: '300px', objectFit: 'cover' }}
              />
            </div>
          )}
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100">
            Crear Producto
          </button>
        </div>
      </form>
    </div>
  );
}