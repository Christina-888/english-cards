import { useState, useRef, useEffect } from "react";
import { inject, observer } from "mobx-react";
import styles from "./cards.module.css";

const Card = ({
  word,
  transcription,
  translation,
  showTranslation,
  onShowClick,
  setButtonRef,
}) => {
  return (
    <div className={styles.card}>
      <h1 className={styles.word}>{word}</h1>
      <p className={styles.transcription}>{transcription}</p>
      {showTranslation ? (
        <p className={styles.translation}>{translation}</p>
      ) : (
        <button
          ref={setButtonRef}
          className={styles.cardBtn}
          onClick={onShowClick}
        >
          SHOW
        </button>
      )}
    </div>
  );
};

const CardItems = ({ wordsStore }) => {
  const items = wordsStore.words;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [learnedWords, setLearnedWords] = useState([]);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1 >= items.length ? 0 : prev + 1));
    setShowTranslation(false);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? items.length - 1 : prev - 1));
    setShowTranslation(false);
  };

  const handleShowTranslation = () => {
    setShowTranslation(true);

    const currentWordId = items[currentIndex].id;
    if (!learnedWords.includes(currentWordId)) {
      setLearnedWords((prev) => [...prev, currentWordId]);
    }
  };

  //Фокус на кнопке SHOW при смене карточки:
  const showButtonRef = useRef(null);

  useEffect(() => {
    setShowTranslation(false);
    if (showButtonRef.current) {
      showButtonRef.current.focus();
    }
  }, [currentIndex]);

  const currentItem = items[currentIndex];

  return (
    <div>
      <div className={styles.cardsContainer}>
        <div className={styles.carouselBtns}>
          <button className={styles.carouselBtn} onClick={prevCard}>
            &lt;
          </button>
        </div>
        <Card
          key={currentItem.id}
          word={currentItem.english}
          transcription={currentItem.transcription}
          translation={currentItem.russian}
          showTranslation={showTranslation}
          onShowClick={handleShowTranslation}
          setButtonRef={(node) => (showButtonRef.current = node)}
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
        You learned {learnedWords.length}{" "}
        {learnedWords.length === 1 ? "word" : "words"}
      </p>
    </div>
  );
};

const EnhancedCardItems = inject("wordsStore")(observer(CardItems));

export default EnhancedCardItems;
