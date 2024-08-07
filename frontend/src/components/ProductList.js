import React, { useEffect, useState } from 'react';
import productService from '../services/productService';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    productService.getProducts()
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>{product.date}</p>
            <p>Price: ${product.price}</p>
            {product.featured_image && (
              <img src={product.featured_image} alt={product.title} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
