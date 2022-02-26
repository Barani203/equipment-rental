import ProductForm from "./ProductForm";

const AddProduct = () => {
  return ( 
    <>
      <ProductForm 
        title={"Add Product"} 
        type={"add"}
        requestURL={process.env.REACT_APP_SERVER_URL + '/products'} 
        requestMethod={"POST"} />
    </>
  );
}
 
export default AddProduct;