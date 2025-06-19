import styles from "./enterWord.module.css";

const Form = () => {
  return (
    <form className={styles.formTable}>
      <div className={styles.formRow}>
        <input type="text" id="english" placeholder="English" required />
        <input
          type="text"
          id="transcription"
          placeholder="Transcription"
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
};

export default Form;
