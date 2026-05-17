import { useState } from "react";
import axios from "axios";

const BASE = "http://localhost:3001/api/product";

export default function ProductRegister({ onProductAdded }) {
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [link, setLink] = useState("")
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!id || !name || !link || price <= 0 || stock < 0) {
      setError("Please fill all fields with valid values");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post(`${BASE}/createProduct`, {
        product_id: parseInt(id),
        name,
        price: parseFloat(price),
        stock: parseInt(stock),
        picture_link: link
      });

      setMessage(response.data.message);
      
      // Clear form
      setId("");
      setName("");
      setLink("");
      setPrice(0);
      setStock(0);

      // Callback to refresh product list if provided
      if (onProductAdded) {
        onProductAdded();
      }

      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Error creating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="text-center mb-4">Register Product</h4>

          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="mb-3">
            <label className="form-label">Product Id</label>
            <input
              className="form-control mb-2"
              type="number"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              className="form-control mb-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              step="0.01"
              className="form-control mb-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Stock</label>
            <input
              type="number"
              className="form-control mb-2"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Picture Link</label>
            <input
              type="text"
              className="form-control mb-2"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
            />
          </div>

          <div>
            <button 
              type="submit" 
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}