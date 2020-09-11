import React from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from "reactstrap";
import customBrowserStyle from "../styles/module/Carousel.module.scss";
import customMobileStyle from "../styles/module/CarouselMobile.module.scss";
import { ImageHandler } from "./ImageHandler";
import { dataSource } from "../model/DataSource";

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

interface Props {}

interface State {
  activeIndex: number;
  animating: boolean;
}

class Slider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      activeIndex: 0,
      animating: false,
    };

    this._renderIndicator = this._renderIndicator.bind(this);
    this._renderSlides = this._renderSlides.bind(this);
    this._next = this._next.bind(this);
    this._previous = this._previous.bind(this);
    this._goToIndex = this._goToIndex.bind(this);
  }

  public render(): JSX.Element {
    const { activeIndex } = this.state;
    const { isMobile } = dataSource.systemModel;
    const customStyle = isMobile ? customMobileStyle : customBrowserStyle;

    return (
      <div id="slider-container">
        <Carousel
          activeIndex={activeIndex}
          next={this._next}
          previous={this._previous}
        >
          {this._renderIndicator()}
          {this._renderSlides()}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={this._previous}
            cssModule={customStyle}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={this._next}
            cssModule={customStyle}
          />
        </Carousel>
      </div>
    );
  }

  private _renderIndicator(): JSX.Element {
    const { activeIndex } = this.state;
    const { isMobile } = dataSource.systemModel;
    const customStyle = isMobile ? customMobileStyle : customBrowserStyle;

    return isMobile ? null : (
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={this._goToIndex}
        cssModule={customStyle}
      />
    );
  }

  private _renderSlides(): JSX.Element[] {
    const slides = items.map((item, index: number) => {
      const { isMobile } = dataSource.systemModel;
      const url = isMobile ? `mobile/${item.src}` : item.src;
      const height = isMobile ? 180 : 500;
      const scale = isMobile ? 375 / 1080 : 1;
      return (
        <CarouselItem
          onExiting={() => this.setState({ animating: true })}
          onExited={() => this.setState({ animating: false })}
          key={`slide-item-${index}`}
        >
          <div id="slider-item-container" style={{ height: `${height}px` }}>
            <ImageHandler src={url} scale={scale} />
          </div>
        </CarouselItem>
      );
    });
    return slides;
  }

  private _next(): void {
    const { activeIndex, animating } = this.state;
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  private _previous(): void {
    const { activeIndex, animating } = this.state;
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  private _goToIndex(nextIndex: number): void {
    const { animating } = this.state;
    if (animating) return;
    this.setState({ activeIndex: nextIndex });
  }
}

export { Slider };
