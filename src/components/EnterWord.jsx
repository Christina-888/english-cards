const enterTable = [
  {
    firstItem: "English",
    secondItem: "Transcription",
    thirdItem: "Russian",
    fourthItem: "Tags",
    fifthItem: "Add",
    sixthItem: "Clear"
  }
]

const EnterTable = () => {
  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <th>English</th>
          <th>Transcription</th>
          <th>Russian</th>
          <th>Tags</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </tbody>
    </table>
  );
};

export default EnterTable;