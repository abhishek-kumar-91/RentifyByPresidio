// PropertyList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [editProperty, setEditProperty] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/seller/getproperty');
        setProperties(response.data);
      } catch (error) {
        console.error('Error:', error);
        // Handle error (e.g., show an error message)
      }
    };

    fetchProperties();
  }, [editProperty]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/seller//delete/${id}`);
      setProperties(properties.filter(property => property._id !== id));
      alert('Property deleted successfully');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete property');
    }
  };
  const handleEdit = (property) => {
    setEditProperty(property);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProperty({ ...editProperty, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:8080/api/v1/seller/edit/${editProperty._id}`, editProperty);
      alert('Property updated successfully');
      setEditProperty(null);
      // Optionally, you can fetch the updated properties and update the state
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update property');
    }
  };

  const handleExit = () => {
    setEditProperty(null);
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl mb-4">Properties</h2>
      <ul>
        {properties.map(property => (
          <li key={property._id} className="border rounded-md p-4 mb-2 flex justify-between items-center">
            <div className="flex items-center">
              <img src={property.images[0]} alt={property.place} className="w-24 h-24 rounded-md mr-4" />
              <div>
                <h3 className="text-lg font-semibold">{property.place}</h3>
                <p>Area: {property.area}</p>
                <p>Bedrooms: {property.bedrooms}</p>
                <p>Bathrooms: {property.bathrooms}</p>
              </div>
            </div>
            <div>
              <button onClick={() => handleEdit(property)} className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2">Edit</button>
              <button onClick={() => handleDelete(property._id)} className="bg-red-500 text-white px-3 py-1 rounded-md">Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {editProperty && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-2xl mb-4">Edit Property</h2>
            <input type="text" name="place" value={editProperty.place} onChange={handleChange} className="w-full px-4 py-2 border rounded-md mb-2" />
            {/* Add input fields for other property details */}
            <div className="flex justify-between">
              <button onClick={handleExit} className="bg-gray-500 text-white px-4 py-2 rounded-md">Exit</button>
              <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyList;





