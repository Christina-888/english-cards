import "./App.css";
import Table from "./components/Wordlist";
import Form from "./components/EnterWord";
import CardItems from "./components/Cards";
import ErrorMessage from "./components/Missing";
import Header from "./components/Header";

function App() {
  return (
    <>
      <div>
        <Header />
        <Table />
        <Form />
        <CardItems />
        <ErrorMessage />
      </div>
    </>
  );
}

export default App;
