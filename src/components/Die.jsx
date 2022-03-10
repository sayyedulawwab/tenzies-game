/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

function Die({ value, isHeld, holdDice }) {
  return (
    <div
      className={`px-5 py-3 w-12 h-12 m-auto shadow-md font-bold text-lg cursor-pointer rounded ${
        isHeld && 'bg-green-500'
      }`}
      onClick={holdDice}
    >
      {value}
    </div>
  );
}

export default Die;
