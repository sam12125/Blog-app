import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Blogpost() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchBlog = async () => {
    try {
      const response = await fetch(`http://localhost:8080/blogs/${id}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setBlog(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate("/")}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 cursor-pointer"
      >
        Back to Homepage
      </button>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : blog ? (
        <div className="mt-6 p-4 border rounded shadow">
          <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
          <p className="mt-2">{blog.blog}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Blogpost;
