type NoParamReturnNulFunction = () => void;
type OneParamReturnNulFunction = (any: any) => void;

interface Props {
  isMobile: boolean;
  scale: number;

  toggle: boolean;
  type: number;
  showPopOut: OneParamReturnNulFunction;
  hidePopOut: NoParamReturnNulFunction;

  username: string;
  password: string;
  updateUsername: OneParamReturnNulFunction;
  updatePassword: OneParamReturnNulFunction;

  activeIndex: number;
  updateActiveIndex: OneParamReturnNulFunction;
  animating: boolean;
  updateAnimating: OneParamReturnNulFunction;

  rewardState: number;
  rewardClaim: OneParamReturnNulFunction;
}
