import { useState, useContext } from "react";
import WordsContext from "../contexts/WordsContext";
import Loading from "./Loading";
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

const Table = ({ showTags = true, isEmpty = false }) => {
  const { words, updateWord, deleteWord, loading } = useContext(WordsContext);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedRow, setEditedRow] = useState(null);

  const checkEmptyFields = () => {
    if (!editedRow) return true;

    //Валидация на пустые поля:
    return (
      !editedRow.english?.trim() ||
      !editedRow.transcription?.trim() ||
      !editedRow.russian?.trim() ||
      (showTags && !editedRow.tags?.trim())
    );
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    const word = words[index];
    setEditedRow({
      english: word.english,
      transcription: word.transcription || "",
      russian: word.russian,
      tags: word.tags || "",
    });
  };

  const handleInputChange = (field, value) => {
    setEditedRow((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (checkEmptyFields()) {
      alert("Заполните, пожалуйста, все поля!");
      return;
    }
    try {
      const wordToUpdate = {
        ...words[editingIndex],
        english: editedRow.english,
        transcription: editedRow.transcription,
        russian: editedRow.russian,
        tags: editedRow.tags,
      };
      await updateWord(wordToUpdate);
      setEditingIndex(null);
      setEditedRow(null);
    } catch (error) {
      alert("Ошибка сохранения! Попробуйте, please, ещё раз.");
      console.error(error);
    }
  };

  const handleRemove = (index) => {
    deleteWord(words[index].id)
      .then(() => {
        if (editingIndex === index) {
          setEditingIndex(null);
          setEditedRow(null);
        }
      })
      .catch((error) => {
        alert("Ошибка удаления! Попробуйте, please, ещё раз.");
        console.log(error);
      });
  };

  if (loading) {
    return <Loading />;
  }

  if (isEmpty || words.length === 0) {
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
            {showTags && <th>TAGS</th>}
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
                        border: !editedRow.english.trim()
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
                        border: !editedRow.transcription.trim()
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
                        border: !editedRow.russian.trim()
                          ? "1px solid red"
                          : undefined,
                      }}
                    />
                  ) : (
                    word.russian
                  )}
                </td>
                {showTags && (
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
                          border: !editedRow.tags.trim()
                            ? "1px solid red"
                            : undefined,
                        }}
                      />
                    ) : (
                      word.tags
                    )}
                  </td>
                )}
                <td className={styles.actions}>
                  {isEditing ? (
                    <>
                      <button
                        className={styles.iconButton}
                        onClick={handleSave}
                        aria-label="Save"
                      >
                        V
                      </button>
                      <button
                        className={styles.iconButton}
                        onClick={() => {
                          setEditingIndex(null);
                          setEditedRow(null);
                        }}
                        aria-label="Cancel"
                      >
                        X
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className={styles.iconButton}
                        onClick={() => handleEdit(index)}
                        aria-label="Edit"
                      >
                        <img
                          className={styles.edit}
                          src={editIcon}
                          alt="Edit"
                        />
                      </button>
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
                    </>
                  )}
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
