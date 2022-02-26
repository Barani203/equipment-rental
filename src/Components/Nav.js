import {NavLink, withRouter} from 'react-router-dom';

const Nav = ({ history }) => {
  let accessToken = localStorage.getItem("accessToken");
  // console.log("check",accessToken);

  const handleLogout = (e) => {
    localStorage.setItem("accessToken", "");
    history.push("/login");
  }

  return ( 
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-info">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {
            (accessToken) ? (
              <>
                <NavLink className="nav-link" to="/home">Home</NavLink>
                <NavLink className="nav-link" to="/cart">View Cart</NavLink>
                <NavLink className="nav-link" to="/Orders">Rented Products</NavLink>
              </>
            ) : (<></>)
          }
        </ul>
        <ul className="navbar-nav ml-auto">
          {
            (accessToken) ? (
              <li className="nav-link" onClick={ (e) => { handleLogout(e) }}>Logout</li>
            ) : (
              <>
                <NavLink className="nav-link" to="/login">Login</NavLink>
                <NavLink className="nav-link" to="/signup">Register</NavLink>
              </>
            )
          }
        </ul>
      </div>
    </nav>
    </> 
  );
}
 
export default withRouter(Nav);