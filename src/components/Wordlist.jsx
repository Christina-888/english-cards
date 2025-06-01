import styles from "./wordlist.module.css"
import editIcon from "../assets/images/icons/edit.svg"
import removeIcon from "../assets/images/icons/remove.svg"

const table = [
  {
    firstItem: "World",
    secondItem: "[wɜːld]",
    thirdItem: "Мир",
    fourthItem: "World",
    fifthItem: <img className={styles.edit} src={editIcon} alt="Edit" />,
    sixthItem: <img className={styles.remove} src={removeIcon} alt="Remove" />,
  },
  {
    firstItem: "Mother",
    secondItem: "[ˈmʌðə]",
    thirdItem: "Мама",
    fourthItem: "Family",
    fifthItem: <img className={styles.edit} src={editIcon} alt="Edit" />,
    sixthItem: <img className={styles.remove} src={removeIcon} alt="Remove" />, 
  },
  {
    firstItem: "Sun",
    secondItem: "[sʌn]",
    thirdItem: "Солнце",
    fourthItem: "Nature",
    fifthItem: <img className={styles.edit} src={editIcon} alt="Edit" />,
    sixthItem: <img className={styles.remove} src={removeIcon} alt="Remove" />, 
  },
  {
    firstItem: "Brother",
    secondItem: "[ˈbɹʌðə(ɹ)]",
    thirdItem: "Брат",
    fourthItem: "Family",
    fifthItem: <img className={styles.edit} src={editIcon} alt="Edit" />,
    sixthItem: <img className={styles.remove} src={removeIcon} alt="Remove" />, 
  },
  {
    firstItem: "Wind",
    secondItem: "[wɪnd]",
    thirdItem: "Ветер",
    fourthItem: "Nature",
    fifthItem: <img className={styles.edit} src={editIcon} alt="Edit" />,
    sixthItem: <img className={styles.remove} src={removeIcon} alt="Remove" />, 
  },
  {
    firstItem: "Blue",
    secondItem: "[bluː]",
    thirdItem: "Голубой",
    fourthItem: "Colors",
    fifthItem: <img className={styles.edit} src={editIcon} alt="Edit" />,
    sixthItem: <img className={styles.remove} src={removeIcon} alt="Remove" />, 
  },
  {
    firstItem: "Wolf",
    secondItem: "[wʊlf]",
    thirdItem: "Волк",
    fourthItem: "Animals",
    fifthItem: <img className={styles.edit} src={editIcon} alt="Edit" />,
    sixthItem: <img className={styles.remove} src={removeIcon} alt="Remove" />, 
  },
  {
    firstItem: "Yellow",
    secondItem: "[ˈjeləʊ]",
    thirdItem: "Жёлтый",
    fourthItem: "Colors",
    fifthItem: <img className={styles.edit} src={editIcon} alt="Edit" />,
    sixthItem: <img className={styles.remove} src={removeIcon} alt="Remove" />, 
  },
];

const Table = () => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ENGLISH</th>
          <th>TRANSCRIPTION</th>
          <th>RUSSIAN</th>
          <th>TAGS</th>
          <th>EDIT</th>
          <th>DELETE</th>
        </tr>
      </thead>
      <tbody>
        {table.map((el, index) => (
          <tr key={index}>
            <td>{el.firstItem}</td>
            <td>{el.secondItem}</td>
            <td>{el.thirdItem}</td>
            <td>{el.fourthItem}</td>
            <td>{el.fifthItem}</td>
            <td>{el.sixthItem}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;