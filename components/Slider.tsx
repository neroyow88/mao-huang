import React from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from "reactstrap";
import customBrowserStyle from "../styles/module/carousel.module.scss";
import customMobileStyle from "../styles/module/carouselMobile.module.scss";

const items = [
  {
    src: "slider/promotion_slider_01.jpg",
  },
  {
    src: "slider/promotion_slider_02.jpg",
  },
  {
    src: "slider/promotion_slider_03.jpg",
  },
];

function renderSlider(props: Props) {
  const {
    isMobile,
    activeIndex,
    updateActiveIndex,
    animating,
    updateAnimating,
  } = props;

  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === items.length - 1 ? 0 : props.activeIndex + 1;
    updateActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? items.length - 1 : props.activeIndex - 1;
    updateActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    updateActiveIndex(newIndex);
  };

  const slides = items.map((item, index: number) => {
    const url = isMobile ? `mobile/${item.src}` : item.src;
    return (
      <CarouselItem
        onExiting={() => updateAnimating(true)}
        onExited={() => updateAnimating(false)}
        key={`slide-item-${index}`}
      >
        <img src={url} style={{ width: "100%" }} />
      </CarouselItem>
    );
  });

  const customStyle = isMobile ? customMobileStyle : customBrowserStyle;
  const indicator = isMobile ? null : (
    <CarouselIndicators
      items={items}
      activeIndex={activeIndex}
      onClickHandler={goToIndex}
      cssModule={customStyle}
    />
  );

  return (
    <div id="slider-container">
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        {indicator}
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

export { renderSlider };
