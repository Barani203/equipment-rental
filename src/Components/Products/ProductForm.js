import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import axios from 'axios';
import { useHistory } from "react-router";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const ProductForm = ({ title, requestURL, requestMethod, oldProduct }) => {
  const history = useHistory();
  const [product, setProduct] = useState({
    name: '',
    category: [],
    price: '',
    thumbnail: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    price: '',
    thumbnail: ''
  });
  const [showModal, setShowModal] = useState(false);
  const supportedThumnbnailMimeTypes = ['image/jpeg', 'image/webp', 'image/png'];

  useEffect(() => {
    if (oldProduct) {
      Object.keys(product).forEach(key => {
        product[key] = oldProduct[key];
      })
      setProduct({ ...product });
    }
    // eslint-disable-next-line
  }, []);

  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let file = (e.target.files) ? (e.target.files[0]) : (null);

    switch (name) {
      case 'name':
        if (!value) {
          errors.name = "Name cannot be empty";
        }
        else {
          errors.name = "";
        }
        product[name] = value;
        break;
      case 'price':
        if (!value) {
          errors.price = "Price cannot be empty";
        }
        else {
          errors.price = "";
        }
        if (value < 0) {
          value = 0;
        }
        product[name] = value;
        break;
      case 'thumbnail':
        if (supportedThumnbnailMimeTypes.includes(file.type)) {
          errors.thumbnail = "";
        } else {
          errors.thumbnail = "File type not supported";
        }
        product[name] = file;
        break;

      default:
        break;
    }
    setProduct({ ...product });
    setErrors({ ...errors });
  }

  const canSubmit = () => {
    var flag = true;
    if (product.name === "" || product.price === "" || product.file === null) {
      flag = false;
    }
    Object.keys(errors).forEach(key => {
      if (errors[key] !== "")
        flag = false;
    });
    return flag;
  }

  let handleSubmit = (e) => {
    e.preventDefault();

    let data = new FormData();
    Object.keys(product).forEach(key => {
      if (key === "category") {
        product[key] = JSON.stringify(product[key]);
      }
      data.append(key, product[key]);
    });

    var config = {
      method: requestMethod,
      url: requestURL,
      headers: {
        'access-token': localStorage.getItem("accessToken")
      },
      data: data
    };

    axios(config).then(response => {
      if (response.data.error) {
        toast.error("Failed: " + response.data.error, { autoClose: 5000 });
        console.log(response.data.error);
      }
      else if (response.data.success) {
        toast.success("Success", { autoClose: 5000 });
        history.replace("/products");
        // console.log(response.data.success);
      }
    });
  }

  return (
    <>
      <div className="row my-4 justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 darkTransparentBackground px-5 py-4">
          <h1 className="text-center text-primary">{title}</h1>
          <hr />
          <form>
            <div className="form-group">
              <label htmlFor="name" className="text-warning">Name</label>
              <input name="name" type="text" className="form-control" onChange={handleChange} value={product.name} />
              <span className="text-danger">{errors.name}</span>
            </div>
            <div className="form-group">
              <label htmlFor="price" className="text-warning">Price</label>
              <input name="price" type="number" className="form-control" onChange={handleChange} value={product.price} />
              <span className="text-danger">{errors.price}</span>
            </div>
            <div className="form-group">
              <label htmlFor="thumbnail" className="text-warning">Upload Thumbnail</label>
              <input name="thumbnail" type="file" className="form-control-file border border-dark text-white-50" accept="image/*" onChange={handleChange} />
              <span className="text-danger">{errors.thumbnail}</span>
            </div>
            <button type="submit" className="btn btn-primary mt-2" onClick={handleSubmit} disabled={!canSubmit()}>Submit</button>

            <Modal show={showModal} tabIndex="-1">
              <Modal.Header>
                <h5 className="modal-title">Add Category</h5>
                <button type="button" className="close" onClick={() => { setShowModal(false) }}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </Modal.Header>
              <Modal.Body>
                <div class="form-check form-check-inline">
                  <input name="category" class="form-check-input" type="checkbox" value="option1" />
                  <label class="form-check-label">1</label>
                </div>
                {/* <button type="submit" className="btn btn-primary" onClick={ handleSubmit } disabled={!canSubmit()}>Submit</button> */}
              </Modal.Body>
              <Modal.Footer>
                <button type="button" className="btn btn-secondary" onClick={() => { setShowModal(false) }}>Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </Modal.Footer>
            </Modal>
            <button type="button" className="btn btn-primary" onClick={() => { setShowModal(true) }}>
              Launch
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProductForm;