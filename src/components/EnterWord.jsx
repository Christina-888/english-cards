import { useState, useContext } from "react";
import WordsContext from "../contexts/WordsContext";
import styles from "./enterWord.module.css";

/*const Form = () => {
  return (
    <form className={styles.formTable}>
      <div className={styles.formRow}>
        <input type="text" id="english" placeholder="English" required />
        <input
          type="text"
          id="transcription"
          placeholder="Transcript."
          required
        />
        <input type="text" id="russian" placeholder="Russian" required />
        <input type="text" id="tags" placeholder="Tags" />
        <button className={styles.btn} type="submit" id="add">
          Add
        </button>
        <button className={styles.btn} type="reset" id="clear">
          Clear
        </button>
      </div>
    </form>
  );
};*/

const Form = () => {
  const { addWord } = useContext(WordsContext);
  const [formData, setFormData] = useState({
    english: "",
    transcription: "",
    russian: "",
    tags: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.english.trim() || !formData.russian.trim()) {
      alert("Пожалуйста, введите данные!");
      return;
    }
    try {
      await addWord(formData);
      setFormData({ english: "", transcription: "", russian: "", tags: "" });
    } catch (error) {
      alert("Ошибка добавления слова! Попробуйте, please, ещё раз.");
      console.log(error);
    }
  };

  const handleReset = () => {
    setFormData({ english: "", transcription: "", russian: "", tags: "" });
  };

  return (
    <form
      className={styles.formTable}
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <div className={styles.formRow}>
        <input
          type="text"
          id="english"
          placeholder="English"
          required
          value={formData.english}
          onChange={handleChange}
        />
        <input
          type="text"
          id="transcription"
          placeholder="Transcript."
          value={formData.transcription}
          onChange={handleChange}
        />
        <input
          type="text"
          id="russian"
          placeholder="Russian"
          required
          value={formData.russian}
          onChange={handleChange}
        />
        <input
          type="text"
          id="tags"
          placeholder="Tags"
          value={formData.tags}
          onChange={handleChange}
        />
        <button className={styles.btn} type="submit" id="add">
          Add
        </button>
        <button className={styles.btn} type="reset" id="clear">
          Clear
        </button>
      </div>
    </form>
  );
};

export default Form;
