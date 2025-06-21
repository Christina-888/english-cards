import styles from "./missing.module.css";
import spacemanImg from "../assets/images/jpeg/spaceman.jpg";

const ErrorMessage = () => {
  return (
    <div className={styles.errorContainer}>
      <img className={styles.img} src={spacemanImg} alt="spaceman" />
      <p className={styles.paragraph}>HOUSTON, WE HAVE 404!</p>
      <p className={styles.paragraphSecond}>
        Practice makes perfect, so return to{" "}
        <a href="/" className={styles.mainLink}>
          main
        </a>
      </p>
    </div>
  );
};

export default ErrorMessage;
