class AudioHandler {
  private _audioList: {
    [keys: string]: HTMLAudioElement;
  } = Object.create(null);

  public setAudio(key: string, audioElem: HTMLAudioElement): void {
    this._audioList[key] = audioElem;
  }

  public playAudio(key: string): void {
    this._audioList[key].play();
  }
}

const audioHandler = new AudioHandler();
export { audioHandler };
