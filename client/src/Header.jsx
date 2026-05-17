import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'
import { logout } from "./features/authSlice";

export default function Header() {
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div style={{ width: '100%', backgroundColor: '#f8f9fa', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <div style={{ textAlign: 'center', padding: '16px' }}>
        <h3 className="fw-bold">Welcome to Mini Shop</h3>
        <p>Redux Toolkit Demo Store</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '12px', gap: '24px' }}>
        {role === "customer" && (
          <nav className="nav gap-4">
            <Link className="nav-link" to="/clist">Product List</Link>
            <Link className="nav-link" to="/cart">Cart</Link>
            <Link className="nav-link" to="/profile">Profile</Link>
            <button 
              className="nav-link text-danger" 
              onClick={handleLogout}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Logout
            </button>
          </nav>
        )}

        {role === "admin" && (
          <nav className="nav gap-4">
            <Link className="nav-link" to="/alist">Product List</Link>
            <Link className="nav-link" to="/register">Register Product</Link>
            <button 
              className="nav-link text-danger" 
              onClick={handleLogout}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Logout
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}