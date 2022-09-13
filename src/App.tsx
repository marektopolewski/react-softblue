import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Header from "./header/Header";
import Experience from "./pages/Experience";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Comments from "./comments/Comments";

import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/services" element={<Services />} />
      </Routes>
      <Comments/>
    </BrowserRouter>
  );
};

export default App;
