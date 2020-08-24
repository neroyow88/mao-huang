import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from "reactstrap";
import customStyle from "../styles/carousel.module.scss";

const items = [
  {
    src: "slider/promotion_slider_01.jpg",
  },
  {
    src: "slider/promotion_slider_02.png",
  },
  {
    src: "slider/promotion_slider_03.png",
  },
];

export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item, index: number) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={`slide-item-${index}`}
      >
        <img src={item.src} style={{ width: "100%" }} />
      </CarouselItem>
    );
  });

  return (
    <div id="slider-container">
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
          cssModule={customStyle}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
          cssModule={customStyle}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
          cssModule={customStyle}
        />
      </Carousel>
    </div>
  );
}
