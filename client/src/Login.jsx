
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { login } from './features/authSlice';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {error}=useSelector(state=>state.auth)
  
  const handleLogin = async () => {
  const result = await dispatch(login({ email, password }));

  if (login.fulfilled.match(result)) {
    const role = result.payload.user.role;// amnas mistake 

    if (role === "admin") {
      navigate("/alist");
    } else {
      navigate("/clist");
    }
  }

  }
  
  return (
    <div className="d-flex justify-content-center mt-5">
        <div className="card shadow p-4" style={{ width: "400px" }}>
        <h4 className="text-center mb-4">Login</h4>
        <form>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="text" 
            className="form-control"
            onChange={e =>setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" 
            className="form-control"
            onChange={e =>setPassword(e.target.value)}
             />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button type="button" onClick={handleLogin} className="btn btn-primary w-100 mb-3">
            Login
          </button>
           <p>Not Registered? <Link to="/custReg">Create an account</Link> </p>
        </form>
       </div>
    </div>
  );
}

export default Login;
