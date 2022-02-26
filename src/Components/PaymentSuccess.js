import { useEffect } from "react";
import axios from 'axios';
import { orderPaymentStatus } from "./Constants";
import { useParams } from "react-router";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const PaymentSuccess = ({history}) => {
  // If the payment is successful, empty the cart, raise a taost and redirect to orders page
  let params = useParams();

  useEffect(() => {
    const action = async () => {
      let orderId = params.orderId;
      console.log(orderId);

      //fetch order
      let order = await axios({
        method: "GET",
        url: process.env.REACT_APP_SERVER_URL + "/orders/" + orderId,
        headers: {
          'access-token': localStorage.getItem("accessToken")
        }
      });

      //check payment status
      if (order && order.data && order.data.paymentStatus === orderPaymentStatus.PAID) {
        // empty the cart
        console.log("check")
        let response = await axios({
          method: "delete",
          url: process.env.REACT_APP_SERVER_URL + '/cart',
          headers: {
            'access-token': localStorage.getItem("accessToken")
          }
        });
        console.log(response);
        if(!response.data.error) {
          //success toast
          toast.success("Order Placed", { autoClose: 5000 });
        }

        //redirect to orders page
        history.replace("/orders");
      }
    }
    action();
    // eslint-disable-next-line
  }, []);

  return (
    <>
    </>
  );
}

export default PaymentSuccess;