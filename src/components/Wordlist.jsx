import styles from "./wordlist.module.css"

/*const table = [ {
  firstItem: "English",
  secondItem: "Transcription",
  thirdItem: "Russian",
  fourthItem: "Tags",
  fifthItem: "Edit",
  sixthItem: "Delete",
} ,
{
  firstItem: "World",
  secondItem: "",
  thirdItem: "Мир",
  fourthItem: "",
  fifthItem: "",
  sixthItem: "",
},
{
  firstItem: "Mother",
  secondItem: "",
  thirdItem: "Мама",
  fourthItem: "",
  fifthItem: "",
  sixthItem: "",
},
];

const Table = () => {
  return (
    <>
      {table.map((el) => (
        <>
        firstItem={el.firstItem}
        secondItem={el.secondItem}
        thirdItem={el.thirdItem}
        fourthItem={el.fourthItem}
        fifthItem={el.fifthItem}
        sixthItem={el.sixthItem}
        </>
      ))}
    </>
  )
}

export default Table; */

const table = [
  {
    firstItem: "World",
    secondItem: "",
    thirdItem: "Мир",
    fourthItem: "",
    fifthItem: "",
    sixthItem: "",
  },
  {
    firstItem: "Mother",
    secondItem: "",
    thirdItem: "Мама",
    fourthItem: "",
    fifthItem: "",
    sixthItem: "",
  },
  {
    firstItem: "Sun",
    secondItem: "",
    thirdItem: "Солнце",
    fourthItem: "",
    fifthItem: "",
    sixthItem: "",
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