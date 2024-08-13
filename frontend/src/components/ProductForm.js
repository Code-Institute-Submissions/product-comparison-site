import React, { useState } from 'react';
import productService from '../services/productService';

const ProductForm = ({ onProductCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any existing errors
    try {
      const newProduct = {
        title,
        description,
        date,
        price,
        excerpt,
      };

      // Call the productService to create a new product
      await productService.createProduct(newProduct);

      // Trigger the refresh of the product list
      onProductCreated();

      // Reset form fields
      setTitle('');
      setDescription('');
      setDate('');
      setPrice('');
      setExcerpt('');
    } catch (error) {
      console.error('Failed to create product', error);
      setError('Failed to create product. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Excerpt</label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          required
        ></textarea>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Create Product</button>
    </form>
  );
};

export default ProductForm;
