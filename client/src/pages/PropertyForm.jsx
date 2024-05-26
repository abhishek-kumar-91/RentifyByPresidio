// PropertyForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PropertyForm = () => {
  const [formData, setFormData] = useState({
    place: '',
    images: [],
    area: '',
    bedrooms: '',
    bathrooms: '',
    hospitalsNearby: '',
    collegesNearby: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/seller/addproperty', formData);
      console.log(response.data);
      alert("successfully added property")
      // Optionally, you can redirect the user to a different page or show a success message
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    
    <div className="max-w-md mx-auto p-8">
    
      <h2 className="text-2xl mb-4 "><Link to="/seller" className='mr-8 bg-black text-white px-2 rounded-xl text-sm'>back</Link>Add Property</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="place" className="block mb-1">Place</label>
          <input type="text" id="place" name="place" value={formData.place} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="images" className="block mb-1">Images</label>
          <input type="file" id="images" name="images" multiple onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="area" className="block mb-1">Area</label>
          <input type="text" id="area" name="area" value={formData.area} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="bedrooms" className="block mb-1">Bedrooms</label>
          <input type="number" id="bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="bathrooms" className="block mb-1">Bathrooms</label>
          <input type="number" id="bathrooms" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="hospitalsNearby" className="block mb-1">Hospitals Nearby</label>
          <input type="text" id="hospitalsNearby" name="hospitalsNearby" value={formData.hospitalsNearby} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="collegesNearby" className="block mb-1">Colleges Nearby</label>
          <input type="text" id="collegesNearby" name="collegesNearby" value={formData.collegesNearby} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
      </form>
    </div>
  );
};

export default PropertyForm;
