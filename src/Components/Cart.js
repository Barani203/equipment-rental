import { useState, useEffect } from 'react';
import axios from 'axios';
import { orderPaymentStatus } from './Constants';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const Cart = ({ history }) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState([]);

  var config = {
    method: 'GET',
    headers: {
      'access-token': localStorage.getItem("accessToken")
    }
  };

  const getData = async () => {
    //fetch products
    config.url = process.env.REACT_APP_SERVER_URL + '/products';
    let products, cartProducts;
    var response = await axios(config);
    // console.log(response.data)
    if (response.data) {
      products = response.data;
    }

    //fetch cart products
    config.url = process.env.REACT_APP_SERVER_URL + '/cart';
    response = await axios(config);
    // console.log(response.data)
    if (response.data) {
      cartProducts = response.data;
    }

    //adding product details to cart products
    let tempData = []
    // console.log(products, cartProducts);
    if (products && cartProducts) {
      cartProducts.forEach(id => {
        let product = products.find(product => product._id === id);
        product.pricePerUnit = product.price;
        if (product) {
          if (!product.quantity) {
            product.quantity = 1;
          }
          tempData.push(product);
        }
      });
    }
    tempData.reverse();
    setData(tempData);
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    //update total when changes are done to cart
    const updateTotal = () => {
      let sum = 0;
      data.forEach(product => {
        sum += parseFloat(product.price);
      })
      setTotal(sum);
    }
    updateTotal();
  }, [data]);

  const setQuantity = (id, quantity) => {
    data.forEach(product => {
      if (product._id === id) {
        if (quantity < 0) {
          quantity = 1;
        }
        product.quantity = quantity;
        product.price = (Math.round(product.pricePerUnit * product.quantity * 100)) / 100;
      }
    });
    setData([...data]);
  }

  const getCurrenyINRformat = (val) => {
    val = parseFloat(val);
    return val.toLocaleString("en-IN", {
      style: 'currency',
      currency: 'INR',
    })
  }

  const removeFromCart = (productId) => {
    config.method = "POST";
    config.url = process.env.REACT_APP_SERVER_URL + '/cart/removeProduct';
    config.data = { "productId": productId };
    axios(config).then(response => {
      if (response.data.error) {
        console.log("Error: ", response.data.error);
      }
    });
    setData([...data.filter(product => (product._id !== productId))]);
  }

  const createOrder = async () => {
    let response = await axios({
      method: "POST",
      url: process.env.REACT_APP_SERVER_URL + "/orders",
      headers: {
        'access-token': localStorage.getItem("accessToken")
      },
      data: {
        productDetails: data,
        timestamp: new Date()
      }
    });
    if (response && response.data)
      return response.data;
    return { error: { message: "couldn't create order" } };
  }

  const payBill = async () => {
    let orderDetails = await createOrder();
    console.log("orderDetails: ", orderDetails);
    if (orderDetails.error) {
      toast.error(orderDetails.error.message, { autoClose: 5000 });
      return;
    }

    var options = {
      "key": process.env.RAZORPAY_KEY_ID,
      "amount": orderDetails.amount / 100, //dividing by 100 to convert from paise to rupee
      "currency": "INR",
      "name": "Equipment rental potal",
      "description": "Test Transaction",
      "order_id": orderDetails.id,
      "handler": async function (response) {
        console.log("Payment Success: ",
          response.razorpay_payment_id,
          response.razorpay_order_id,
          response.razorpay_signature
        );

        //add the razorpay response to order details in DB
        await axios({
          method: "PUT",
          url: process.env.REACT_APP_SERVER_URL + "/orders/" + orderDetails.id,
          headers: {
            'access-token': localStorage.getItem("accessToken")
          },
          data: {
            paymentStatus: orderPaymentStatus.PAID,
            razorpayResponse: response
          }
        });

        //redirect to success payment page to empty the cart and raise toast
        history.push("/payment-success/" + orderDetails.id);
      }
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', async function (response) {
      console.log("Payment Failed ",
        response.error.code,
        response.error.description,
        response.error.source,
        response.error.step,
        response.error.reason,
        response.error.metadata.order_id,
        response.error.metadata.payment_id);

      //add the razorpay response to order details in DB
      await axios({
        method: "PUT",
        url: process.env.REACT_APP_SERVER_URL + "/orders/" + orderDetails.id,
        headers: {
          'access-token': localStorage.getItem("accessToken")
        },
        data: {
          paymentStatus: orderPaymentStatus.FAILED,
          razorpayResponse: response.error
        }
      });

      toast.error("Payment Failed", { autoClose: 5000 });
    });
    rzp1.open();
  }

  return (
    <div className="container px-4 px-lg-5 my-5">
      {console.log(data)}
      <header>
        <h1 className=" text-primary text-center">My Cart</h1>
      </header>
      <hr />
      {
        (data && data.length > 0) ? (
          <>
            {
              <div style={{ marginBottom: "100px" }}>
                {
                  data.map(product => (
                    <div className="card p-5 mt-2" key={product._id}>
                      <button className="border-0 position-absolute" style={{ top: "0.5rem", right: "0.5rem" }} onClick={() => removeFromCart(product._id)}><i className="fa fa-times"></i></button>
                      <div className="row">
                        <div className="col-12 col-md-6 col-lg-5 col-xl-4">
                          <div className="d-flex h-100 justify-content-center align-items-center p-3 bg-secondary">
                            <div className="bg bg-dark">
                              <img src={process.env.REACT_APP_SERVER_URL + "/thumbnail/" + product.thumbnail} onError={(e) => { e.target.onerror = null; e.target.src = "https://place-hold.it/300x300/666" }} className="img-fluid d-block rounded border border-white" alt="thumbnail" />
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-7 col-xl-8">
                          <div className="card-body border h-100">
                            <h2 className="card-title">{product.name}</h2>
                            <h5 className="card-subtitle mb-2 text-muted"> {getCurrenyINRformat(product.price)} </h5>
                            <div className="input-group mt-2 mt-md-2 mt-lg-3">
                              <span className="input-group-text bg-white w-75 text-center">Quantity</span>
                              <input type="number" className="form-control w-25" min="1" value={product.quantity} onChange={(e) => setQuantity(product._id, e.target.value)} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            }
            <div className="bg-dark d-flex justify-content-between fixed-bottom px-5 py-4 mx-3">
              <h5 className="text-white">Total Price: <span>{total}</span></h5>
              <button className="btn btn-primary" onClick={payBill}>Pay</button>
            </div>
          </>

        ) : (<h5 className="text-center text-info">Cart is empty</h5>)
      }
    </div>
  );
}

export default Cart;