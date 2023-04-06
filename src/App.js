import Add from "./Add";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nave from "./Nav";
import Employe from "./Employe.js";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Nave />
        <>
          <Routes>
            <Route path="/" element={<Add />} />
            <Route path="/view" element={<Employe />} />
          </Routes>
        </>
      </div>
    </BrowserRouter>
  );
};

export default App;
