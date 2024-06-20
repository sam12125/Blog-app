import "./App.css";
import Homepage from "./components/Homepage";
import { Routes, Route } from "react-router-dom";
import Createblog from "./components/Createblog";
import Blogpost from "./components/Blogpost";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<Createblog />} />
        <Route path="/blogs/:id" element={<Blogpost />} />
      </Routes>
    </div>
  );
}

export default App;
