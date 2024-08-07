import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api/";

const getProducts = () => {
  return axios.get(`${API_URL}products/`);
};

const createProduct = (productData) => {
  const formData = new FormData();
  for (const key in productData) {
    formData.append(key, productData[key]);
  }
  return axios.post(`${API_URL}products/create/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const productService = {
  getProducts,
  createProduct,
};

export default productService;
