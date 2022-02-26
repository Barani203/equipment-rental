import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Nav from './Components/Nav';
import Products from './Components/Products/Products';
import AddProduct from './Components/Products/AddProduct';
import EditProduct from './Components/Products/EditProduct';
import Cart from './Components/Cart';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Orders from './Components/Orders';
import PaymentSuccess from './Components/PaymentSuccess';

function App() {
  return (
    <BrowserRouter>
      <h1 className="logo m-2">equipments</h1>
      <Nav />
      <div className="container-fluid">
        <Switch>
          <Route exact path="/home" component={Products}></Route>
          <Route path="/products/:id" component={Products}></Route>
          <Route path="/add-product" component={AddProduct}></Route>
          <Route path="/edit-product/:id" component={EditProduct}></Route>
          <Route path="/orders" component={Orders}></Route>
          <Route path="/cart" component={Cart}></Route>
          <Route path="/payment-success/:orderId" component={PaymentSuccess}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
