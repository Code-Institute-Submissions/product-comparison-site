// src/services/productService.js

import api from './api'; // Import the configured Axios instance from api.js

const getProducts = () => {
  return api.get(`products/`);
};

const createProduct = (productData) => {
  const formData = new FormData();
  for (const key in productData) {
    formData.append(key, productData[key]);
  }

  // You no longer need to manually add the Authorization header,
  // because it's handled by the interceptor in api.js
  return api.post(`products/create/`, formData, {
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
