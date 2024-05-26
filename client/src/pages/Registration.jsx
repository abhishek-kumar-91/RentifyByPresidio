import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Registration() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("buyer");
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/v1/user/register', {firstName, lastName, email, phone, password, userType});
      alert('Registration successful');
      navigate("/login")
      
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    if (name === "userType") {
      setUserType(value);
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
          <h1 className="mt-4 mb-2 text-2xl font-bold">Registration</h1>
          <form className="flex flex-col w-[70%]" onSubmit={handleRegisterSubmit}>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="outline-blue-400 border border-gray-800 px-4 py-2 rounded-full my-2"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="outline-blue-400 border border-gray-800 px-4 py-2 rounded-full my-2"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="outline-blue-400 border border-gray-800 px-4 py-2 rounded-full my-2"
            />

<input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="phoneNumber"
              className="outline-blue-400 border border-gray-800 px-4 py-2 rounded-full my-2"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="outline-blue-400 border border-gray-800 px-4 py-2 rounded-full my-2"
            />
            <select
             name="userType"
        className="p-4 border mb-2 border-black rounded-full"
        onChange={handleRegisterChange}
        value={userType}
            >
              <option  value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
            <button className="bg-blue-500 text-white outline-none rounded-full py-2 hover:bg-blue-700">
              Registration
            </button>
          </form>
          <p className="text-xs mt-2 ">Already have an account! <Link to="/login" className="underline text-blue-500 font-bold text-lg">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Registration;
