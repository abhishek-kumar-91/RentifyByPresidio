const Property = require("../models/propertySchema")


const addProperty = async(req, res) => {
  try {
    const newProperty = await Property.create(req.body);
    res.status(201).json(newProperty);
    console.log(newProperty)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}


const getProperty =  async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteProperty =  async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


const editData =  async (req, res) => {
  try {
    const { place, images, area, bedrooms, bathrooms, hospitalsNearby, collegesNearby } = req.body;
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    property.place = place;
    property.images = images;
    property.area = area;
    property.bedrooms = bedrooms;
    property.bathrooms = bathrooms;
    property.hospitalsNearby = hospitalsNearby;
    property.collegesNearby = collegesNearby;

    await property.save();
    res.json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
module.exports = {addProperty, getProperty, deleteProperty, editData}
