import { useState, useRef, useEffect } from "react";
import styles from "./cards.module.css";

const Cards = ({ word, transcription, translation, showTranslation, show, setButtonRef }) => {
  return (
    <div className={styles.card}>
      <h1 className={styles.word}>{word}</h1>
      <p className={styles.transcription}>{transcription}</p>
      {showTranslation ? (
        <p className={styles.translation}>{translation}</p>
      ) : (
        <button ref={setButtonRef} className={styles.cardBtn} onClick={show}>
          SHOW
        </button>
      )}
    </div>
  );
};

const CardItems = () => {
  const items = [
    {
      id: 1,
      word: "World",
      transcription: "[wɜːld]",
      translation: "Мир",
    },
    {
      id: 2,
      word: "Mother",
      transcription: "[ˈmʌðə]",
      translation: "Мама",
    },
    {
      id: 3,
      word: "Sun",
      transcription: "[sʌn]",
      translation: "Солнце",
    },
    {
      id: 4,
      word: "Brother",
      transcription: "[ˈbɹʌðə(ɹ)]",
      translation: "Брат",
    },
    {
      id: 5,
      word: "Wind",
      transcription: "[wɪnd]",
      translation: "Ветер",
    },
    {
      id: 6,
      word: "Blue",
      transcription: "[bluː]",
      translation: "Голубой",
    },
    {
      id: 7,
      word: "Wolf",
      transcription: "[wʊlf]",
      translation: "Волк",
    },
    {
      id: 8,
      word: "Yellow",
      transcription: "[ˈjeləʊ]",
      translation: "Жёлтый",
    },
  ];

  //Реализуем карусель:
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [learnedWords, setLearnedWords] = useState([]);

  const nextCard = () => {
    setCurrentIndex(currentIndex + 1 >= items.length ? 0 : currentIndex + 1);
    setShowTranslation(false);
  };

  const prevCard = () => {
    setCurrentIndex(currentIndex - 1 < 0 ? items.length - 1 : currentIndex - 1);
    setShowTranslation(false);
  };

  const handleShowTranslation = () => {
    setShowTranslation(true);
    //  setLearnedWords(learnedWords + 1);

    const currentWord = items[currentIndex].id;

    if (!learnedWords.includes(currentWord)) {
      setLearnedWords([...learnedWords, currentWord]);
    }
  };

  // Реализуем фокус на кнопке:
  const showButtonRef = useRef(null);

  const setShowButtonRef = (node) => {
    showButtonRef.current = node;
  };

  useEffect(() => {
    setShowTranslation(false);
    if (showButtonRef.current) {
      showButtonRef.current.focus();
    }
  }, [currentIndex]);

  return (
    <div>
      <div className={styles.cardsContainer}>
        <div className={styles.carouselBtns}>
          <button className={styles.carouselBtn} onClick={prevCard}>
            &lt;
          </button>
        </div>
        <Cards
          key={items[currentIndex].id}
          word={items[currentIndex].word}
          transcription={items[currentIndex].transcription}
          translation={items[currentIndex].translation}
          showTranslation={showTranslation}
          show={handleShowTranslation}
          setButtonRef={setShowButtonRef}
        />
        <div className={styles.carouselBtns}>
          <button className={styles.carouselBtn} onClick={nextCard}>
            &gt;
          </button>
        </div>
      </div>
      <p className={styles.counter}>
        {currentIndex + 1} / {items.length}
      </p>
      <p className={styles.result}>
        You learned {learnedWords.length} {""}
        {learnedWords.length === 1 ? "word" : "words"}
      </p>
    </div>
  );
};

export default CardItems;
