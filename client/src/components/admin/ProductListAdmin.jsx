import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE = "http://localhost:3001/api/product";

const ProductListAdmin = ({ refreshTrigger }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE}/getAllProducts`);
      setProducts(res.data);
    } catch (error) {
      console.log("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refreshTrigger]);

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${BASE}/deleteProduct/${productId}`);
        alert("Product deleted successfully");
        fetchProducts();
      } catch (error) {
        alert("Error deleting product: " + error.response?.data?.message);
      }
    }
  };

  const handleUpdate = async (product) => {
    const newPrice = prompt("Enter new price:", product.price);
    if (newPrice === null) return;

    try {
      await axios.put(`${BASE}/updateProduct/${product._id}`, {
        name: product.name,
        price: parseFloat(newPrice),
        stock: product.stock,
        picture_link: product.picture_link
      });
      alert("Product updated successfully");
      fetchProducts();
    } catch (error) {
      alert("Error updating product: " + error.response?.data?.message);
    }
  };

  if (loading) {
    return <div className="text-center p-5"><p>Loading products...</p></div>;
  }

  return (
    <div className="container-fluid bg-white p-5">
      <h2 className="text-center mb-4">Product List</h2>
      
      {products.length === 0 ? (
        <p className="text-center text-muted">No products found</p>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div className="col-md-3 mb-4" key={product._id}>
              <div className="card shadow-sm h-100">
                <img
                  src={product.picture_link}
                  alt={product.name}
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) => e.target.src = "https://via.placeholder.com/200"}
                />

                <div className="card-body text-center">
                  <h5>{product.name}</h5>
                  <p className="text-success fw-bold">${product.price}</p>
                  <p>Stock: {product.stock}</p>

                  <button 
                    onClick={() => handleUpdate(product)}
                    className="btn btn-primary m-2"
                  >
                    Update
                  </button>
                  <button 
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-danger m-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListAdmin;