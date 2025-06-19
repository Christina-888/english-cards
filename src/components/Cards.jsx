import { useState } from "react";
import styles from "./cards.module.css";

const Cards = ({ word, transcription, translation, showTranslation, show }) => {
  return (
    <div className={styles.card}>
      <h1 className={styles.word}>{word}</h1>
      <p className={styles.transcription}>{transcription}</p>
      {showTranslation ? (
        <p className={styles.translation}>{translation}</p>
      ) : (
        <button className={styles.cardBtn} onClick={show}>
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
  };

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
    </div>
  );
};

export default CardItems;
