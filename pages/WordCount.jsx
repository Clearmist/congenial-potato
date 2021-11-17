import React from 'react';
import Image from 'next/image';
import UpArrow from '../assets/arrow_drop_up_black_48dp.svg';
import DownArrow from '../assets/arrow_drop_down_black_48dp.svg';
import styles from '../styles/Home.module.css'

function VisualTimer({ elapsedMS }) {
  const calc = (100 * elapsedMS) / 1500;
  const progress = calc > 100 ? 100 : calc;

  const style = {
    '--offset': 0,
    '--value': progress,
    '--over50': progress > 50 ? 1 : 0,
    '--bg': '#333',
  };

  return (
    <div className={styles.pie}>
      <div className={styles.pieSegment} style={style}></div>
    </div>
  );
}

export default function WordCount({ wordCount, setWordCount, elapsedMS }) {
  const handleIncrease = () => {
    setWordCount(wordCount + 1);
  }

  const handleDecrease = () => {
    if (wordCount > 1) {
      setWordCount(wordCount - 1);
    }
  }

  return (
    <div className={styles.wordCountContainer}>
      <div className={styles.wordCountChange} onClick={handleIncrease}>
        <Image src={UpArrow} alt="Increase word count" />
      </div>
      <div className={styles.wordCount}>
        {wordCount}
      </div>
      <div className={styles.wordCountChange} onClick={handleDecrease}>
        <Image src={DownArrow} alt="Decrease word count" />
      </div>
      <div className={styles.pieChartContainer}>
        <VisualTimer elapsedMS={elapsedMS} />
      </div>
    </div>
  );
}
