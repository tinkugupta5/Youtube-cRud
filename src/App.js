import Add from "./Add";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nave from "./Nav";
import CheckboxTable from "./CheckboxTable";
import Deletemultiplerow from "./Deletemultiplerow";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Nave />
        <>
          <Routes>
            <Route path="/" element={<Add />} />
            <Route path="/view" element={<CheckboxTable />} />
            <Route path="/del" element={<Deletemultiplerow />} />
          </Routes>
        </>
      </div>
    </BrowserRouter>
  );
};

export default App;
