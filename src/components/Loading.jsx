import styles from "./loading.module.css";

const Loading = () => {
  return (
    <div className={styles.thecube}>
      <div className={`${styles.cube} ${styles.c1}`}></div>
      <div className={`${styles.cube} ${styles.c2}`}></div>
      <div className={`${styles.cube} ${styles.c4}`}></div>
      <div className={`${styles.cube} ${styles.c3}`}></div>
    </div>
  );
};

export default Loading;
