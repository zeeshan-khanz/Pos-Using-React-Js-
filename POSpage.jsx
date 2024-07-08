import React, { useEffect, useState } from 'react';
import mainlayout from '../layouts/mainlayout';
import axios from 'axios';

function POSpage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('products');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addProductToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      const updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1, totalAmount: item.price * (item.quantity + 1) };
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      const newProduct = { ...product, quantity: 1, totalAmount: product.price };
      setCart([...cart, newProduct]);
    }
  };

  const removeProduct = (product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let newTotalAmount = 0;
    cart.forEach((item) => {
      newTotalAmount += item.totalAmount;
    });
    setTotalAmount(newTotalAmount);
  }, [cart]);

  return (
    <mainlayout>
      <div className="row">
        <div className="col-lg-8">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="row">
              {products.map((product, key) => (
                <div className="col-lg-4" key={key}>
                  <div className="border" onClick={() => addProductToCart(product)}>
                    <p>{product.name}</p>
                    <img src={product.img} className="img-fluid" alt={product.name} />
                    <p>${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="col-lg-4">
            <div className="table-responsive bg-dark">
              <table className="table table-responsive table-dark table-hover">
                <thead>
                  <tr>
                    <td>#</td>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Qty</td>
                    <td>Total</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((cartProduct, key) => (
                    <tr key={key}>
                      <td>{cartProduct.id}</td>
                      <td>{cartProduct.name}</td>
                      <td>{cartProduct.price}</td>
                      <td>{cartProduct.quantity}</td>
                      <td>{cartProduct.totalAmount}</td>
                      <td>
                        <button className="btn btn-danger btn-sm" onClick={() => removeProduct(cartProduct)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h2 className="px-2 text-white">Total Amount: ${totalAmount}</h2>
            </div>
          </div>
        </div>
      </div>
    </mainlayout>
  );
}

export default POSpage;