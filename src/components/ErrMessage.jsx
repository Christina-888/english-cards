import styles from "./errMessage.module.css";

const ErrorMessage = ({ message = "Ошибка: страница не найдена!" }) => {
  return <div className={styles.error}>{message}</div>;
};

export default ErrorMessage;
