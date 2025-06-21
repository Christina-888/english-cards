import { Routes, Route, NavLink } from "react-router";
import Table from "./components/Wordlist";
import Form from "./components/EnterWord";
import CardItems from "./components/Cards";
import ErrorMessage from "./components/Missing";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Table />
                <Form />
              </>
            }
          />
          <Route path="/game" element={<CardItems />} />
          <Route path="*" element={<ErrorMessage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
