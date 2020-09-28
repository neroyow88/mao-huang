import React, { RefObject } from "react";

import { audioHandler } from "../model/AudioHandler";
import { AudioList } from "../model/WebConstant";

interface Props {}

interface State {}

class AudioComp extends React.Component<Props, State> {
  private _kissAudio: RefObject<HTMLAudioElement>;
  private _moneyAudio: RefObject<HTMLAudioElement>;

  constructor(props: Props) {
    super(props);

    this._kissAudio = React.createRef();
    this._moneyAudio = React.createRef();
  }

  public componentDidMount(): void {
    audioHandler.setAudio(AudioList.KISS, this._kissAudio.current);
    audioHandler.setAudio(AudioList.MONEY, this._moneyAudio.current);
  }

  public render(): JSX.Element {
    return (
      <div id="audio-container">
        <audio id="kiss-audio" ref={this._kissAudio}>
          <source src="audio/kiss.mp3" />
        </audio>
        <audio id="money-audio" ref={this._moneyAudio}>
          <source src="audio/money.mp3" />
        </audio>
      </div>
    );
  }
}

export { AudioComp };
