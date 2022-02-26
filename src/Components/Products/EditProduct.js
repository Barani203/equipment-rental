import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductForm from "./ProductForm";
import axios from 'axios';

import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure() 

const EditProduct = ({history}) => {
  let params = useParams();
  let productId = params.id;

  const [product, setProduct] = useState(null);

  useEffect(() => {
    //get product from server
    var config = {
      method: process.env.REACT_APP_SERVER_URL + '/products/' + productId,
      url: "GET",
      headers: {
        'access-token': localStorage.getItem("accessToken")
      }
    };

    axios(config).then(response => {
      if (response.data.error) {
        history.push("/products");
        toast.error("Failed: "+response.data.error, {autoClose: 5000});
        console.log(response.data.error);
      }
      else if (response.data) {
        setProduct(response.data);
      }
    });
    // eslint-disable-next-line
  }, []);
  return ( 
    <>
      {
        (product) ? (
          <ProductForm 
            title={"Edit Product"} 
            type={"edit"}
            requestURL={process.env.REACT_APP_SERVER_URL + '/products/' + productId} 
            oldProduct={product}
            requestMethod={"POST"}
          />
        ) : (
          <></>
        )
      }
      
    </>
  );
}
 
export default EditProduct;