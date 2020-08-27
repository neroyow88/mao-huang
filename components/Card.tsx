import React from "react";

function renderCard(props: Props): JSX.Element {
  const { isMobile } = props;
  if (isMobile) {
    return _cardMobile();
  } else {
    return _cardBrowser();
  }
}

function _cardMobile(): JSX.Element {
  return (
    <div id="cards-container-mobile">
      <div id="card-item-container">
        {_roundCard(1, "爱情猫")}
        {_roundCard(2, "招财猫")}
        {_roundCard(3, "波斯猫")}
      </div>
    </div>
  );
}

function _roundCard(index: number, label: string): JSX.Element {
  const convertIndex = index < 10 ? `0${index}` : index;
  return (
    <div id={`card-${convertIndex}`}>
      <img src={`mobile/card/poker_${convertIndex}_front.png`} />
      <div className="label-container">{label}</div>
    </div>
  );
}

function _cardBrowser(): JSX.Element {
  return (
    <div id="cards-container-browser">
      <div id="background-container">
        <img src="background.png"></img>
      </div>
      <div id="card-item-container">
        {_flipCard(1)}
        {_flipCard(2)}
        {_flipCard(3)}
      </div>
    </div>
  );
}

function _flipCard(index: number): JSX.Element {
  const convertIndex = index < 10 ? `0${index}` : index;
  return (
    <div id={`card-${convertIndex}`}>
      <div className="flip-card" key={`flip-card-${convertIndex}`}>
        <div
          className="flip-card-inner"
          key={`flip-card-inner-${convertIndex}`}
        >
          <div
            className="flip-card-front"
            key={`flip-card-front-${convertIndex}`}
          >
            <img src={`card/poker_${convertIndex}_front.png`} />
          </div>
          <div
            className="flip-card-back"
            key={`flip-card-back-${convertIndex}`}
          >
            <img src={`card/poker_${convertIndex}_back.png`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export { renderCard };
