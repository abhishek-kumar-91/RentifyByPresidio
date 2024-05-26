// BuyerPropertyList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BuyerPropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    area: '',
    bedrooms: '',
    bathrooms: ''
  });

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
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredProperties = properties.filter(property => {
    return (
      (!filters.area || property.area.includes(filters.area)) &&
      (!filters.bedrooms || property.bedrooms === parseInt(filters.bedrooms)) &&
      (!filters.bathrooms || property.bathrooms === parseInt(filters.bathrooms))
    );
  });

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl mb-4">Properties</h2>
      <div className="mb-4">
        <input
          type="text"
          name="area"
          value={filters.area}
          onChange={handleFilterChange}
          placeholder="Filter by area"
          className="w-full px-4 py-2 border rounded-md mb-2"
        />
        <input
          type="number"
          name="bedrooms"
          value={filters.bedrooms}
          onChange={handleFilterChange}
          placeholder="Filter by bedrooms"
          className="w-full px-4 py-2 border rounded-md mb-2"
        />
        <input
          type="number"
          name="bathrooms"
          value={filters.bathrooms}
          onChange={handleFilterChange}
          placeholder="Filter by bathrooms"
          className="w-full px-4 py-2 border rounded-md mb-2"
        />
      </div>
      <ul>
        {filteredProperties.map(property => (
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
              <button onClick={() => alert(`Seller Details: ${property.sellerDetails}`)} className="bg-blue-500 text-white px-3 py-1 rounded-md">I'm interested</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BuyerPropertyList;
