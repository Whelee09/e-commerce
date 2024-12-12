const BotonesCategorias = ({ filterByCategory }) => {
    return (
      <div className="d-flex justify-content-around my-3 justify-content-center">
        <button
          className="btn"
          onClick={() => filterByCategory(1)}
        >
          Guitarras
        </button>
        <button
          className="btn"
          onClick={() => filterByCategory(2)}
        >
          Baterias
        </button>
        <button
          className="btn"
          onClick={() => filterByCategory(3)}
        >
          Ukeleles
        </button>
        <button
          className="btn"
          onClick={() => filterByCategory(null)}
        >
          Ver Todo
        </button>
      </div>
    );
  };
  export default BotonesCategorias;