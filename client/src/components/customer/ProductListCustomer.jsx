import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cartSlice";


const ProductListCustomer = () => {
  const [products, setProducts] = useState([]);

  // Get userId from Redux
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/product/getAllProducts"
        );
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  // Add to cart
  const handleAddToCart = (product) => {
  console.log("CLICKED", product);

  if (!userId) {
    alert("Please login first");
    return;
  }

  dispatch(addToCart({
    userId,
    productId: product.product_id,
    name: product.name,
    price: product.price,
  }));
};

  return (
    <div className="container-fluid bg-white p-5">
      <h2 className="text-center mb-4">Product List</h2>

      <div className="row">
        {products.map((product) => (
          <div className="col-md-3 mb-4" key={product.product_id}>
            <div className="card shadow-sm h-100">
              <img
                src={product.picture_link}
                alt={product.name}
                style={{ height: "200px", objectFit: "cover" }}
              />

              <div className="card-body text-center">
                <h5>{product.name}</h5>
                <p className="text-success fw-bold">${product.price}</p>
                <p>Stock: {product.stock}</p>

                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListCustomer;