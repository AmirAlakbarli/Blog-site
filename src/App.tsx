import { Route, Routes } from "react-router-dom";
import BlogDetails from "./pages/BlogDetails";
import Home from "./pages/Home";
import NewBlog from "./pages/NewBlog";

function App() {

  return (
    <div className="App">
      <div className="w-10/12 max-w-7xl m-auto">
        <h3 className="text-2xl font-medium text-center my-8">
          Blog React application
        </h3>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/new-blog" element={<NewBlog />} />
          <Route path="/blog/:id/edit" element={<NewBlog />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
