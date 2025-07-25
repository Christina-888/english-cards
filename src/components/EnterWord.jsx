import { useState } from "react";
import { inject, observer } from "mobx-react";
import styles from "./enterWord.module.css";

const Form = ({ wordsStore }) => {
  const [formData, setFormData] = useState({
    english: "",
    transcription: "",
    russian: "",
    tags: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Валидация обязательных полей:
    const { english, transcription, russian } = formData;
    if (!english.trim() || !transcription.trim() || !russian.trim()) {
      alert("Пожалуйста, заполните все обязательные поля!");
      return;
    }

    //Добавляем слово через стор:
    await wordsStore.addWord(formData);

    setFormData({
      english: "",
      transcription: "",
      russian: "",
      tags: "",
    });
  };

  const handleReset = () => {
    setFormData({
      english: "",
      transcription: "",
      russian: "",
      tags: "",
    });
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
          value={formData.english}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          id="transcription"
          placeholder="Transcript."
          value={formData.transcription}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          id="russian"
          placeholder="Russian"
          value={formData.russian}
          onChange={handleChange}
          required
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

const EnhancedForm = inject("wordsStore")(observer(Form));

export default EnhancedForm;
