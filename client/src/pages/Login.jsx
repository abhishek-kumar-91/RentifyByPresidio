import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios"


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/user/login', {email, password});

      const token = response.data.token;
      const userType = response.data.user.userType;
      console.log(response)
      // Store token in local storage or session storage
      localStorage.setItem('token', token);
      setUserType(userType);
      if (userType === 'buyer') {
        navigate("/")
      }
      if (userType === 'seller') {
        navigate("/seller")
      }
    
      alert('Login successful');
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

 
 

  return (
    <div className="w-scree h-screen flex items-center justify-center">
      <div className="flex items-center w-[80%] justify-evenly">
        <div>
          <img
            className="ml-4"
            width={"250px"}
            src="https://png.pngtree.com/png-vector/20221101/ourmid/pngtree-house-property-logo-real-estate-design-buildings-clipart-png-image_6405730.png"
            alt="twitter-logo"
          />
        </div>
        <div>
          <div className="my-6">
            <h1 className="font-bold text-5xl">Happening now.</h1>
          </div>
          <h1 className="mt-4 mb-2 text-2xl font-bold">Login</h1>
          <form className="flex flex-col w-[70%]" onSubmit={handleLoginSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="outline-blue-400 border border-gray-800 px-4 py-2 rounded-full my-2"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="outline-blue-400 border border-gray-800 px-4 py-2 rounded-full my-2"
            />
            <button className="bg-blue-500 text-white outline-none rounded-full py-2 hover:bg-blue-700">
              Login
            </button>
          </form>
          <p className="text-xs mt-2 ">Don't have an account! <Link to="/registration" className="underline text-blue-500 font-bold text-lg">Create Account</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
