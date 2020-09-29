class LoadingManager {
  private _taskCount: number = 0;
  private _onAllTasksCompleteCallback: NoParamReturnNulFunction = undefined;

  public setOnAllTasksComplete(cb: NoParamReturnNulFunction): void {
    this._onAllTasksCompleteCallback = cb;
  }

  public addNewTask(): void {
    this._taskCount++;
    console.log("task added", this._taskCount);
  }

  public taskComplete(): void {
    this._taskCount--;
    console.log("tasks complete", this._taskCount);
    if (this._taskCount <= 0) {
      this._taskCount = 0;
      const callback = this._onAllTasksCompleteCallback;
      callback && callback();
      console.log("loading complete");
    }
  }
}

const loadingManager = new LoadingManager();
export { loadingManager };
