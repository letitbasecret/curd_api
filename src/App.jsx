import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Add from "./components/Add";
import Edit from "./components/Edit";
import Show from "./components/Show";
import NotFound from "./components/NotFound";
import Search from "./components/Search";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/show/:id" element={<Show />} />
          <Route path="*" element={<NotFound />} />
          <Route path="search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
