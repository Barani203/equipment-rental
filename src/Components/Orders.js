import { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  var config = {
    method: 'GET',
    headers: {
      'access-token': localStorage.getItem("accessToken")
    }
  };

  const getDate = (timestamp, prefix = "") => {
    console.log(timestamp, new Date(timestamp))
    timestamp=new Date(timestamp);
    return prefix + timestamp.toLocaleDateString('en-IN', { dateStyle: 'medium' }) + " " + timestamp.toLocaleTimeString('en-IN', { timeStyle: 'short' });
  }

  const getCurrenyINRformat = (val) => {
    val = parseFloat(val);
    return val.toLocaleString("en-IN", {
      style: 'currency',
      currency: 'INR',
    })
  }

  useEffect(() => {
    //fetch orders
    config.url = process.env.REACT_APP_SERVER_URL + '/orders';
    (async () => {
      let response = await axios(config);
      if (response.data) {
        console.log(response.data);
        response.data.reverse();
        setOrders(response.data);
      }
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container px-4 px-lg-5 my-5">
      <header>
        <h1 className=" text-primary text-center">Rented Products</h1>
      </header>
      <hr />
      {
        (orders && orders.length > 0) ? (
          <div className='row d-flex justify-content-center'>
            {
              orders.map(order => (
                <div className="col-12 col-md-10 col-lg-8" key={order._id}>
                  <div className="card mt-3">
                    <div className="card-header d-flex">
                      <div>{(order.timestamp) ? getDate(order.timestamp) : ('')}</div>
                      <div className="ml-auto">{getCurrenyINRformat(order.orderDetails.amount/100)}</div>
                    </div>
                    <ul className="list-group list-group-flush">
                      {
                        order.productDetails.map((product, index) => (
                          <li className="list-group" key={index}>
                            <div className='row px-3'>
                            <span className='col-4 px-3'>{product.name}</span>
                            <span className='col-4 px-3'>Quantity: {product.quantity}</span>
                            <span className='col-4 px-3'>Price: {product.price}</span>
                            </div>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              ))
            }
          </div>
        ) : (<h5 className="text-center text-info">Empty</h5>)
      }
    </div>
  );
}

export default Orders;

