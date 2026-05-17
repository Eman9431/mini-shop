import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CustomerRegister() {

  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
//the role is automatically set to "customer" when registering, so we don't need a separate state for it.
  const registerCustomer = async () => {
    try {
      const res = await axios.post("http://localhost:3001/api/user/register", {
        userName,
        email,
        phoneno,
        password,
        role: "customer",
        
      });

      setMsg(res.data.message);
      setIsRegistered(true);
    } catch (error) {
      setMsg(error.response?.data?.message || "Something went wrong");
      setIsRegistered(false);
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        
        <h4 className="text-center mb-4">Customer Registration</h4>

        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Customer Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setPhoneno(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Button */}
        <button onClick={registerCustomer} className="btn btn-primary w-100">
          Register
        </button>

        {/* Message */}
        {msg && (
          <div className={`mt-3 text-center ${isRegistered ? "text-success" : "text-danger"}`}>
            {msg}
          </div>
        )}

        {/* Login Link */}
        {isRegistered && (
          <div className="text-center mt-2">
            <Link to="/">Click here to Login</Link>
          </div>
        )}

        {/* Already have account */}
        <div className="text-center mt-3">
          <small>
            Already have an account? <Link to="/">Login</Link>
          </small>
        </div>

      </div>
    </div>
  );
}

export default CustomerRegister;