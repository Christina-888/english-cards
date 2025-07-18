import { Routes, Route, NavLink } from "react-router";
import { useState, useEffect } from "react";
import WordsContext from "./contexts/WordsContext";
import Table from "./components/Wordlist";
import Form from "./components/EnterWord";
import CardItems from "./components/Cards";
import ErrorMessage from "./components/Missing";
import Header from "./components/Header";
import "./App.css";

const App = () => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  // const baseUrl = "http://itgirlschool.justmakeit.ru";

  const fetchWords = async () => {
    setLoading(true);
    const response = await fetch(`/api/words`);
    const data = await response.json();
    setWords(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchWords();
  }, []);

  const addWord = async (newWord) => {
    setLoading(true);
    const response = await fetch("/api/words/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWord),
    });
    const data = await response.json();
    setWords((words) => [...words, data]);
    setLoading(false);
  };

  const updateWord = async (updatedWord) => {
    setLoading(true);
    const response = await fetch(`/api/words/${updatedWord.id}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedWord),
    });
    const data = await response.json();
    setWords(words.map((word) => (word.id === updatedWord.id ? data : word)));
    setLoading(false);
  };

  const deleteWord = async (id) => {
    setLoading(true);
    await fetch(`/api/words/${id}/delete`, {
      method: "POST",
    });
    setLoading(false);
    setWords(words.filter((word) => word.id !== id));
  };

  return (
    <WordsContext.Provider
      value={{
        words: words,
        fetchWords: fetchWords,
        addWord,
        updateWord,
        deleteWord,
        loading,
      }}
    >
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
    </WordsContext.Provider>
  );
};

export default App;
