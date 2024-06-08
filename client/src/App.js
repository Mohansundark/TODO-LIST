import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import Home from "./pages/Home";
import Signup from "./pages/signup";
import Logout from "./pages/logout";
import Welcome from "./pages/welcome";
import Todo from "./pages/todo";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/todo" element={<Todo />} />
          {/* <Route path="/welcome" element={<Welcome />} /> */}
        </Routes>
        Mohansundar
      </div>
    </BrowserRouter>
  );
}

export default App;
