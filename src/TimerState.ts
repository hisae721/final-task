
export enum TimerState{
    // 初期状態
    Initial="Initial",
    // 時間が設定されてる状態
    Ready="Ready",
    // カウントダウン状態
    Running="Running",
    // 一時停止状態
    Paused="Paused",
    // 終了状態
    Finished="Finished",
}