import Add from "./Add";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import CheckboxTable from "./CheckboxTable";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <>
          <Routes>
            <Route path="/add" element={<Add />} />
            <Route path="/edit" element={<CheckboxTable />} />
          </Routes>
        </>
      </div>
    </BrowserRouter>
  );
};

export default App;
