// import { useState } from "react";
// import { Modal } from "react-bootstrap";
// import axios from 'axios';

// const ProductForm = () => {
//   const [product, setProduct] = useState({
//     name: '',
//     category: [],
//     price: '',
//     img: ''
//   });
//   const [errors, setErrors] = useState({
//     name: '',
//     price: ''
//   });

//   let handleChange = (e) => {
//     let name = e.target.name;
//     let value = e.target.value;
    
//     switch(name) {
//       case 'name': 
//         if(!value) {
//           errors.name = "Name cannot be empty";
//         }
//       break;
//       case 'price': 
//         if(!value) {
//           errors.name = "Price cannot be empty";
//         }
//       break;
//     }

//     // user[name] = value;
//     // setUser({ ...user });
//   }

//   let handleSubmit = (e) => {
//     e.preventDefault();

//     var config = {
//       method: 'POST',
//       url: process.env.REACT_APP_SERVER_URL+'/products',
//       headers: { 
//         'access-token': localStorage.getItem("accessToken")
//       }
//     };
//     axios(config).then(response => {
//       if(response.data.error) {
//         console.log(response.data.error);
//       }
//       else if(response.data.success) {
//         console.log(response.data.success);
//       }
//     });
//   }

//   return ( 
//     <>
//       {console.log(props.showModal)}
//       <Modal show={props.showModal} tabIndex="-1">
//         <Modal.Header>
//           <h5 className="modal-title">{ props.modalTitle }</h5>
//           <button type="button" className="close" onClick={props.closeModal}>
//             <span aria-hidden="true">&times;</span>
//           </button>
//         </Modal.Header>
//         <Modal.Body>
//           <form>
//             <div className="form-group">
//               <label htmlFor="name">Email address</label>
//               <input name="name" type="text" className="form-control" onChange={handleChange}/>
//               <span className="text-danger">{errors.name}</span>
//             </div>
//             <div className="form-group">
//               <label htmlFor="price">Price</label>
//               <input name="price" type="number" className="form-control" onChange={handleChange}/>
//               <span className="text-danger">{errors.price}</span>
//             </div>
//             <div class="form-check form-check-inline">
//               <input name="category" class="form-check-input" type="checkbox" value="option1" />
//               <label class="form-check-label">1</label>
//             </div>
//             {/* <button type="submit" className="btn btn-primary" onClick={ handleSubmit } disabled={!canSubmit()}>Submit</button> */}
//           </form>
//         </Modal.Body>
//         <Modal.Footer>
//           <button type="button" className="btn btn-secondary" onClick={props.closeModal}>Close</button>
//           <button type="button" className="btn btn-primary">Save changes</button>
//         </Modal.Footer>
//       </Modal>
//       <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
//         Launch demo modal
//       </button>
//     </>
//   );
// }
 
// export default ProductForm;