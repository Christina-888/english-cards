import { useState, useRef, useEffect, useContext } from "react";
import WordsContext from "../contexts/WordsContext";
import Loading from "./Loading";
import styles from "./cards.module.css";

/*const CardItems = () => {
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
  ]; */

const Cards = ({
  word,
  transcription,
  translation,
  showTranslation,
  show,
  setButtonRef,
}) => {
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
  const { words, loading } = useContext(WordsContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [learnedWords, setLearnedWords] = useState([]);

  const nextCard = () => {
    setCurrentIndex(currentIndex + 1 >= words.length ? 0 : currentIndex + 1);
    setShowTranslation(false);
  };

  const prevCard = () => {
    setCurrentIndex(currentIndex - 1 < 0 ? words.length - 1 : currentIndex - 1);
    setShowTranslation(false);
  };

  const handleShowTranslation = () => {
    setShowTranslation(true);
    const currentWordId = words[currentIndex]?.id;
    if (currentWordId && !learnedWords.includes(currentWordId)) {
      setLearnedWords([...learnedWords, currentWordId]);
    }
  };

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

  if (loading) return <Loading />;
  if (!words.length) return <p>Слов нет для отображения.</p>;

  return (
    <div>
      <div className={styles.cardsContainer}>
        <div className={styles.carouselBtns}>
          <button className={styles.carouselBtn} onClick={prevCard}>
            &lt;
          </button>
        </div>
        <Cards
          key={words[currentIndex].id}
          word={words[currentIndex].english}
          transcription={words[currentIndex].transcription}
          translation={words[currentIndex].russian}
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
        {currentIndex + 1} / {words.length}
      </p>
      <p className={styles.result}>
        You learned {learnedWords.length}{" "}
        {learnedWords.length === 1 ? "word" : "words"}
      </p>
    </div>
  );
};

export default CardItems;
