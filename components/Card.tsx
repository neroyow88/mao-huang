import React from "react";

function renderCard() {
  return (
    <div id="cards-container">
      <div id="background-container">
        <img src="background.png"></img>
      </div>
      <div id="card-item-container">
        <div id="card-01">{_flipCard(1)}</div>
        <div id="card-02">{_flipCard(2)}</div>
        <div id="card-03">{_flipCard(3)}</div>
      </div>
    </div>
  );
}

function _flipCard(index: number): JSX.Element {
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

export { renderCard };
