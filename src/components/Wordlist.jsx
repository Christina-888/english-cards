import { useState } from "react";
import styles from "./wordlist.module.css";
import editIcon from "../assets/images/icons/edit.svg";
import removeIcon from "../assets/images/icons/remove.svg";

const initialTable = [
  {
    firstItem: "World",
    secondItem: "[wɜːld]",
    thirdItem: "Мир",
    fourthItem: "World",
    isApproved: true,
  },
  {
    firstItem: "Mother",
    secondItem: "[ˈmʌðə]",
    thirdItem: "Мама",
    fourthItem: "Family",
    isApproved: true,
  },
  {
    firstItem: "Sun",
    secondItem: "[sʌn]",
    thirdItem: "Солнце",
    fourthItem: "Nature",
    isApproved: true,
  },
  {
    firstItem: "Brother",
    secondItem: "[ˈbɹʌðə(ɹ)]",
    thirdItem: "Брат",
    fourthItem: "Family",
    isApproved: true,
  },
  {
    firstItem: "Wind",
    secondItem: "[wɪnd]",
    thirdItem: "Ветер",
    fourthItem: "Nature",
    isApproved: true,
  },
  {
    firstItem: "Blue",
    secondItem: "[bluː]",
    thirdItem: "Голубой",
    fourthItem: "Colors",
    isApproved: true,
  },
  {
    firstItem: "Wolf",
    secondItem: "[wʊlf]",
    thirdItem: "Волк",
    fourthItem: "Animals",
    isApproved: true,
  },
  {
    firstItem: "Yellow",
    secondItem: "[ˈjeləʊ]",
    thirdItem: "Жёлтый",
    fourthItem: "Colors",
    isApproved: true,
  },
];

const Table = ({ showTags = true, isEmpty = false }) => {
  const [tableData, setTableData] = useState(initialTable);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedRow, setEditedRow] = useState(null);
  const [showSaveButton, setShowSaveButton] = useState(false);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedRow({ ...tableData[index] });
    setShowSaveButton(true);
  };

  const handleInputChange = (field, value) => {
    setEditedRow((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = (index) => {
    const updatedTable = [...tableData];
    updatedTable[index] = editedRow;
    setTableData(updatedTable);
    setEditingIndex(null);
    setEditedRow(null);
    setShowSaveButton(false);
    console.log("Сохранено:", editedRow);
  };

  const handleRemove = (index) => {
    const updatedTable = [...tableData];
    updatedTable.splice(index, 1);
    setTableData(updatedTable);
    if (editingIndex === index) {
      setEditingIndex(null);
      setEditedRow(null);
      setShowSaveButton(false);
    }
  };

  if (isEmpty) {
    return <div className={styles.emptyMessage}>Список слов пуст</div>;
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ENGLISH</th>
            <th>TRANSCRIPTION</th>
            <th>RUSSIAN</th>
            {showTags && <th>TAGS</th>}
            <th className={styles.actions}>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((el, index) => {
            const isEditing = editingIndex === index;

            return (
              <tr key={index}>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedRow.firstItem}
                      onChange={(e) =>
                        handleInputChange("firstItem", e.target.value)
                      }
                      className={styles.input}
                    />
                  ) : (
                    el.firstItem
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedRow.secondItem}
                      onChange={(e) =>
                        handleInputChange("secondItem", e.target.value)
                      }
                      className={styles.input}
                    />
                  ) : (
                    el.secondItem
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedRow.thirdItem}
                      onChange={(e) =>
                        handleInputChange("thirdItem", e.target.value)
                      }
                      className={styles.input}
                    />
                  ) : (
                    el.thirdItem
                  )}
                </td>
                {showTags && (
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedRow.fourthItem}
                        onChange={(e) =>
                          handleInputChange("fourthItem", e.target.value)
                        }
                        className={styles.input}
                      />
                    ) : (
                      el.fourthItem
                    )}
                  </td>
                )}
                <td className={styles.actions}>
                  {/* Кнопка Save (V) показывается только при редактировании */}
                  {isEditing && showSaveButton && (
                    <button
                      className={styles.iconButton}
                      onClick={() => handleSave(index)}
                      aria-label="Save"
                    >
                      V
                    </button>
                  )}

                  {/* Кнопка Edit скрывается при редактировании */}
                  {!isEditing && (
                    <button
                      className={styles.iconButton}
                      onClick={() => handleEdit(index)}
                      aria-label="Edit"
                    >
                      <img className={styles.edit} src={editIcon} alt="Edit" />
                    </button>
                  )}

                  <button
                    className={styles.iconButton}
                    onClick={() => handleRemove(index)}
                    aria-label="Remove"
                  >
                    <img
                      className={styles.remove}
                      src={removeIcon}
                      alt="Remove"
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
