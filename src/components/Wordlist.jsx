import { useState } from "react";
import { inject, observer } from "mobx-react";
import styles from "./wordlist.module.css";
import editIcon from "../assets/images/icons/edit.svg";
import removeIcon from "../assets/images/icons/remove.svg";

/*const initialTable = [
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
]; */

const Wordlist = ({ wordsStore }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedRow, setEditedRow] = useState(null);
  const [showSaveButton, setShowSaveButton] = useState(false);

  const words = wordsStore.words;

  // Валидация на пустые поля:
  const checkEmptyFields = () => {
    if (!editedRow) return true;
    const requiredFields = ["english", "transcription", "russian", "tags"];
    for (let field of requiredFields) {
      if (!editedRow[field] || editedRow[field].trim() === "") {
        return true; // есть пустые поля
      }
    }
    return false;
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedRow({ ...words[index] });
    setShowSaveButton(true);
  };

  const handleInputChange = (field, value) => {
    setEditedRow((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (checkEmptyFields()) {
      alert("Заполните, пожалуйста, все поля!");
      return;
    }

    //Обновляем слово через стор:
    await wordsStore.updateWord(editedRow);

    setEditingIndex(null);
    setEditedRow(null);
    setShowSaveButton(false);
  };

  const handleRemove = async (index) => {
    const id = words[index].id;
    await wordsStore.deleteWord(id);

    //Если удаляем редактируемую строку — сбрасываем редактор:
    if (editingIndex === index) {
      setEditingIndex(null);
      setEditedRow(null);
      setShowSaveButton(false);
    }
  };

  if (!words.length) {
    return <div className={styles.emptyMessage}>Список слов пуст</div>;
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ENGLISH</th>
            <th>TRANSCRIPT.</th>
            <th>RUSSIAN</th>
            <th>TAGS</th>
            <th className={styles.actions}>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word, index) => {
            const isEditing = editingIndex === index;

            return (
              <tr key={word.id}>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedRow.english}
                      onChange={(e) =>
                        handleInputChange("english", e.target.value)
                      }
                      className={styles.input}
                      style={{
                        border:
                          editedRow.english.trim() === ""
                            ? "1px solid red"
                            : undefined,
                      }}
                    />
                  ) : (
                    word.english
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedRow.transcription}
                      onChange={(e) =>
                        handleInputChange("transcription", e.target.value)
                      }
                      className={styles.input}
                      style={{
                        border:
                          editedRow.transcription.trim() === ""
                            ? "1px solid red"
                            : undefined,
                      }}
                    />
                  ) : (
                    word.transcription
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedRow.russian}
                      onChange={(e) =>
                        handleInputChange("russian", e.target.value)
                      }
                      className={styles.input}
                      style={{
                        border:
                          editedRow.russian.trim() === ""
                            ? "1px solid red"
                            : undefined,
                      }}
                    />
                  ) : (
                    word.russian
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedRow.tags}
                      onChange={(e) =>
                        handleInputChange("tags", e.target.value)
                      }
                      className={styles.input}
                      style={{
                        border:
                          editedRow.tags.trim() === ""
                            ? "1px solid red"
                            : undefined,
                      }}
                    />
                  ) : (
                    word.tags
                  )}
                </td>
                <td className={styles.actions}>
                  {isEditing && showSaveButton && (
                    <button
                      className={styles.iconButton}
                      onClick={() => handleSave(index)}
                      aria-label="Save"
                    >
                      V
                    </button>
                  )}
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

const InjectedWordlist = inject("wordsStore")(observer(Wordlist));

export default InjectedWordlist;
