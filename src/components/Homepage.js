import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/blogs");
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = () => {
    navigate("/create");
  };

  const handleBlogClick = (id) => {
    navigate(`/blogs/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={handleCreate}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 cursor-pointer"
      >
        Create Blog
      </button>
      <h1 className="text-2xl font-bold mb-4 mt-6">Blogs</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {blogs.map((elem) => (
            <li
              key={elem.id}
              className="p-4 border rounded shadow cursor-pointer"
              onClick={() => handleBlogClick(elem.id)}
            >
              <h2 className="text-xl font-semibold">{elem.title}</h2>
              <p className="mt-2">{elem.blog}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Homepage;
