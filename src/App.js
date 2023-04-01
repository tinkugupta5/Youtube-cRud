import Add from "./Add";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nave from "./Nav";
import Employe from "./Employe.js";
import Deletemultiplerow from "./Deletemultiplerow";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Nave />
        <>
          <Routes>
            <Route path="/" element={<Add />} />
            <Route path="/view" element={<Employe />} />
            <Route path="/del" element={<Deletemultiplerow />} />
          </Routes>
        </>
      </div>
    </BrowserRouter>
  );
};

export default App;
