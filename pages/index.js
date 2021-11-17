import React from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import wordList from '../words/words-1.json';
import WordCount from './WordCount';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function buildRandomPhrase(wordCount) {
  const wordListLength = wordList.length;
  const phrase = [];

  for (let i = 0; i < wordCount; i++) {
    phrase.push(wordList[getRandomInt(wordListLength)]);
  }

  return phrase.join(' ');
}

export default function Home() {
  const [list, updateList] = React.useState([]);
  const [loopCount, setLoopCount] = React.useState(0);
  const [wordCount, setWordCount] = React.useState(2);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const newPhrase = buildRandomPhrase(wordCount);

      console.log(`Appending "${newPhrase}" to the list.`);

      list.push(newPhrase);

      if (list.length > 6) {
        list.shift();
      }

      setLoopCount(loopCount++);

      updateList(list);

      setLoopCount(loopCount++);
    }, 1500);

    return () => clearInterval(interval);
  }, [wordCount]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Word Masher</title>
        <meta name="description" content="A single syllable random phrase generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <WordCount wordCount={wordCount} setWordCount={setWordCount} />

      <main className={styles.main}>
        {list.map((phrase, index) => {
          const classes = [styles.phrase];

          if (index === list.length - 1) {
            classes.push(styles.recent);
          }

          return (
            <span className={classes.join(' ')} key={phrase}>
              {phrase}
            </span>
          );
        })}
      </main>
    </div>
  );
}
