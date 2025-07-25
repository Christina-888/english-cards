import { Routes, Route, NavLink } from "react-router";
import { Provider } from "mobx-react";
import { useEffect } from "react";
import wordsStore from "./store/WordsStore";
import Table from "./components/Wordlist";
import Form from "./components/EnterWord";
import CardItems from "./components/Cards";
import ErrorMessage from "./components/Missing";
import Header from "./components/Header";
import "./App.css";

function App() {
  useEffect(() => {
    wordsStore.fetchWords();
  }, []); //для загрузки данных один раз при старте;

  return (
    <Provider store={wordsStore}>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Table />
                <Form />
              </>
            }
          />
          <Route
            path="/game"
            element={
              <>
                <Header />
                <CardItems />
              </>
            }
          />
          <Route path="*" element={<ErrorMessage />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
