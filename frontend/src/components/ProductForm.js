import React, { useState } from 'react';
import productService from '../services/productService';

const ProductForm = ({ onProductCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProduct = {
        title,
        description,
        date,
        price,
        category,
        excerpt,
        featured_image: featuredImage,
      };
      await productService.createProduct(newProduct);
      onProductCreated(); // Trigger the refresh of the product list
      setTitle('');
      setDescription('');
      setDate('');
      setPrice('');
      setCategory('');
      setExcerpt('');
      setFeaturedImage(null);
    } catch (error) {
      console.error('Failed to create product', error);
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
        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
      <div>
        <label>Featured Image</label>
        <input
          type="file"
          onChange={(e) => setFeaturedImage(e.target.files[0])}
        />
      </div>
      <button type="submit">Create Product</button>
    </form>
  );
};

export default ProductForm;
