const Product = (props) => {
  const { product, addToCart, isAddedToCart } = props;

  const getCurrenyINRformat = (val) => {
    val = parseFloat(val);
    return val.toLocaleString("en-IN", {
      style: 'currency',
      currency: 'INR',
    })
  }

  return (
    <>
      <div className="card h-100">
        <div className="d-flex h-75 justify-content-center align-items-center p-3 bg-secondary">
          <div className="bg bg-primary">
            <img src={process.env.REACT_APP_SERVER_URL + "/thumbnail/" + product.thumbnail} onError={(e) => { e.target.onerror = null; e.target.src = "https://place-hold.it/300x300/666" }} className="img-fluid d-block rounded border border-white" alt="thumbnail" />
          </div>
        </div>
        <div className="card-body d-flex px-2">
          <div className="">
            <h5 className="text-truncate m-0" title={product.name}>{product.name}</h5>
            <small className="text-secondary">{getCurrenyINRformat(product.price)}</small>
          </div>
          <div className="d-flex ml-auto d-flex align-items-center">
            <button className="btn btn-primary"
              onClick={() => { addToCart(product._id); }}
              disabled={isAddedToCart(product._id)}><i className="fa fa-cart-plus"></i></button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;