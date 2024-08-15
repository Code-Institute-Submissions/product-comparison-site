import React, { useState, useEffect } from "react";
import productService from "../services/productService";

const ProductForm = ({ onProductCreated, user }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [error, setError] = useState("");

  // Admin check
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Assuming the user object has an `isAdmin` flag or you could check the user's role
    if (user && (user.is_superuser || user.is_staff)) {
      setIsAdmin(true);
    } else {
      setError("You do not have permission to access this page.");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
      setError("You do not have permission to perform this action.");
      return;
    }
    setError(""); // Clear any existing errors

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
      setTitle("");
      setDescription("");
      setDate("");
      setPrice("");
      setExcerpt("");
    } catch (error) {
      console.error("Failed to create product", error);
      setError("Failed to create product. Please try again.");
    }
  };

  if (!isAdmin) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

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
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Create Product</button>
    </form>
  );
};

export default ProductForm;
