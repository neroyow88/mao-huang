import React from "react";
// import { Carousel, CarouselIndicators, CarouselItem } from "reactstrap";

const iconType = {
  SERVICE: 1,
  BROWSER: 2,
};

export default function CustomerService() {
  return (
    <div id="customer-service-container">
      <div id="left-service-container">
        <div className="icons-container">
          {renderIcon("icon/icon_about.png", "关于猫皇", iconType.SERVICE)}
          {renderIcon("icon/icon_service.png", "服务条款", iconType.SERVICE)}
          {renderIcon("icon/icon_deposit.png", "游戏充值", iconType.SERVICE)}
        </div>
        <div className="icons-container">
          {renderIcon("icon/icon_withdraw.png", "快速提款", iconType.SERVICE)}
          {renderIcon("icon/icon_qa.png", "常见问题", iconType.SERVICE)}
          {renderIcon("icon/icon_privacy.png", "私隐保障", iconType.SERVICE)}
        </div>
        <div id="suggestion-label">建议使用的浏览器</div>
        <div className="icons-container">
          {renderIcon("browser/chrome.png", "谷歌", iconType.BROWSER)}
          {renderIcon("browser/firefox.png", "火狐", iconType.BROWSER)}
          {renderIcon("browser/zeus.png", "宙斯", iconType.BROWSER)}
          {renderIcon("browser/quark.png", "夸克", iconType.BROWSER)}
        </div>
      </div>
      <div id="right-service-container">
        <div className="profile-image-container">
          <img src="customer_service/profile.png"></img>
        </div>
        <div id="name-label">周文君</div>
        <div id="title-label">客服中心</div>
        <div id="description-label">
          <img src="customer_service/quation_left.png"></img>
          24小时的专业客服团队,提供及时贴心的服务
          <img src="customer_service/quation_right.png"></img>
        </div>
      </div>
    </div>
  );
}

function renderIcon(img: string, label: string, type: number): JSX.Element {
  let iconContainerStyle;
  let iconImageContainerStyle;

  switch (type) {
    case iconType.SERVICE:
      iconContainerStyle = {
        width: "33%",
      };
      iconImageContainerStyle = {
        width: "70px",
        height: "70px",
        marginRight: "20px",
      };
      break;
    case iconType.BROWSER:
      iconContainerStyle = {
        width: "25%",
      };
      iconImageContainerStyle = {
        width: "40px",
        height: "40px",
        marginRight: " 12px",
      };
      break;
  }

  return (
    <div className="icon-container" style={iconContainerStyle}>
      <div className="icon-image-container" style={iconImageContainerStyle}>
        <img src={img}></img>
      </div>
      <div className="label-container">{label}</div>
    </div>
  );
}

// const customerServiceItems = [
//   {
//     src: "mamber.png",
//   },
//   {
//     src: "mamber.png",
//   },
//   {
//     src: "mamber.png",
//   },
// ];

// function CustomerServiceSlider() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [animating, setAnimating] = useState(false);

//   const next = () => {
//     if (animating) return;
//     const nextIndex =
//       activeIndex === customerServiceItems.length - 1 ? 0 : activeIndex + 1;
//     setActiveIndex(nextIndex);
//   };

//   const previous = () => {
//     if (animating) return;
//     const nextIndex =
//       activeIndex === 0 ? customerServiceItems.length - 1 : activeIndex - 1;
//     setActiveIndex(nextIndex);
//   };

//   const goToIndex = (newIndex) => {
//     if (animating) return;
//     setActiveIndex(newIndex);
//   };

//   const slides = customerServiceItems.map((item, index: number) => {
//     return (
//       <CarouselItem
//         onExiting={() => setAnimating(true)}
//         onExited={() => setAnimating(false)}
//         key={`slide-item-${index}`}
//       >
//         <img src={item.src} />
//       </CarouselItem>
//     );
//   });

//   return (
//     <div id="slider-container">
//       <Carousel activeIndex={activeIndex} next={next} previous={previous}>
//         <CarouselIndicators
//           items={customerServiceItems}
//           activeIndex={activeIndex}
//           onClickHandler={goToIndex}
//         />
//         {slides}
//       </Carousel>
//     </div>
//   );
// }
