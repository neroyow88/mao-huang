import React from "react";

export default function Card() {
  return (
    <div id="cards-container">
      <div id="background-container">
        <img src="background.png"></img>
      </div>
      <div id="card-item-container">
        <div id="card-01">{FlipCard(1)}</div>
        <div id="card-02">{FlipCard(2)}</div>
        <div id="card-03">{FlipCard(3)}</div>
      </div>
    </div>
  );
}

function FlipCard(index: number): JSX.Element {
  const convertIndex = index < 10 ? `0${index}` : index;
  return (
    <div className="flip-card" key={`flip-card-${convertIndex}`}>
      <div className="flip-card-inner" key={`flip-card-inner-${convertIndex}`}>
        <div
          className="flip-card-front"
          key={`flip-card-front-${convertIndex}`}
        >
          <img src={`poker_${convertIndex}_front.png`} />
        </div>
        <div className="flip-card-back" key={`flip-card-back-${convertIndex}`}>
          <img src={`poker_${convertIndex}_back.png`} />
        </div>
      </div>
    </div>
  );
}
