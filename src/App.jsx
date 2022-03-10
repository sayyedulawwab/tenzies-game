/* eslint-disable react/button-has-type */
import { nanoid } from 'nanoid';
import React from 'react';
import Confetti from 'react-confetti';
import Die from './components/Die';

function App() {
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }
  function allNewDice() {
    const newDice = [];

    for (let index = 0; index < 10; index += 1) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rollCount, setRollCount] = React.useState(0);
  const [highScore, setHighScore] = React.useState(
    () => JSON.parse(localStorage.getItem('highScore')) || 0
  );

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      // eslint-disable-next-line consistent-return
      setHighScore(prevHighScore => {
        if (prevHighScore === 0) return rollCount;
        if (prevHighScore > rollCount) return rollCount;
        if (prevHighScore < rollCount) return prevHighScore;
      });
    }
  }, [dice]);

  React.useEffect(() => {
    localStorage.setItem('highScore', JSON.stringify(highScore));
  }, [highScore]);

  function rollDice() {
    if (!tenzies) {
      setDice(oldDice =>
        oldDice.map(die => (die.isHeld ? die : generateNewDie()))
      );
      setRollCount(() => rollCount + 1);
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setRollCount(() => 0);
    }
  }

  function holdDice(id) {
    setDice(prevDice =>
      prevDice.map(die =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main className="bg-cyan-900 m-0 p-5 h-screen flex flex-col justify-center items-center">
      {tenzies && <Confetti />}
      <section className="bg-white h-[600px] w-[600px] rounded flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold ">Tenzies</h1>
        <p className="p-5 m-5">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>

        <h3 className="high-score">
          🏆 High Score: {highScore ? `${highScore} Roll` : '__'}
        </h3>
        <h3 className="rolled">
          {rollCount ? `You rolled ${rollCount} times` : ''} 🎲
        </h3>
        <section className="grid gap-3 grid-cols-5 content-center h-3/5">
          {diceElements}
        </section>
        <button
          className="bg-purple-600 text-white m-8 px-8 py-3 rounded"
          onClick={rollDice}
        >
          {tenzies ? 'New Game' : 'Roll'}
        </button>
      </section>
    </main>
  );
}

export default App;
