// Createblog.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Createblog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const blog = { title, blog: content };

    try {
      const response = await fetch("http://localhost:8080/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        navigate("/");
      }

      const data = await response.json();
      console.log("Blog created:", data);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  const handleHomepage = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={handleHomepage}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 cursor-pointer"
      >
        Homepage
      </button>
      <h1 className="text-2xl font-bold mb-4">Create Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            rows="4"
            required
          />
        </div>
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
}

export default Createblog;
