import React from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from "reactstrap";

import { ImageContainer } from "../share/ImageContainer";
import { popOutHandler } from "../../scripts/PopOutHandler";
import { PopOutType } from "../../scripts/WebConstant";
import { BannersModel } from "../../scripts/dataSource/BannersModel";

import customBrowserStyle from "../../styles/module/Carousel.module.scss";
import customMobileStyle from "../../styles/module/CarouselMobile.module.scss";

interface Props {
  isMobile: boolean;
  model: BannersModel;
}

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

    this._onBannerClicked = this._onBannerClicked.bind(this);
  }

  public render(): JSX.Element {
    const { isMobile } = this.props;
    const { activeIndex } = this.state;
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
    const { isMobile, model } = this.props;
    const { activeIndex } = this.state;
    const { banners } = model;
    const customStyle = isMobile ? customMobileStyle : customBrowserStyle;

    return isMobile ? null : (
      <CarouselIndicators
        items={banners}
        activeIndex={activeIndex}
        onClickHandler={this._goToIndex}
        cssModule={customStyle}
      />
    );
  }

  private _renderSlides(): JSX.Element[] {
    const { banners } = this.props.model;
    const slides = banners.map((item, index: number) => {
      const { isMobile } = this.props;
      const url = item.sliderUrl;
      const height = isMobile ? 180 : 500;
      const scale = isMobile ? 375 / 1080 : 1;
      return (
        <CarouselItem
          onExiting={() => this.setState({ animating: true })}
          onExited={() => this.setState({ animating: false })}
          key={`carousel-item-${index}`}
        >
          <div
            className="slider-item-container"
            key={`slide-item-container-${index}`}
            style={{ height: `${height}px` }}
            onClick={(): void => {
              this._onBannerClicked(index);
            }}
          >
            <ImageContainer src={url} scale={scale} />
          </div>
        </CarouselItem>
      );
    });
    return slides;
  }

  private _next(): void {
    const { banners } = this.props.model;
    const { activeIndex, animating } = this.state;
    if (animating) return;
    const nextIndex = activeIndex === banners.length - 1 ? 0 : activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  private _previous(): void {
    const { banners } = this.props.model;
    const { activeIndex, animating } = this.state;
    if (animating) return;
    const nextIndex = activeIndex === 0 ? banners.length - 1 : activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  private _goToIndex(nextIndex: number): void {
    const { animating } = this.state;
    if (animating) return;
    this.setState({ activeIndex: nextIndex });
  }

  private _onBannerClicked(index: number): void {
    const { banners } = this.props.model;
    popOutHandler.showPopOut(PopOutType.BANNER, {
      name: banners[index].name,
      src: banners[index].popOutUrl,
    });
  }
}

export { Slider };
